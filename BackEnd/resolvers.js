import { SecondPair } from "./Models/Register.js";
import axios from "axios";
import * as path from "path";
import * as fs from "fs";
import bcrypt from "bcryptjs";

import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function hash(password) {
  return bcrypt.hashSync(password, 10);
}
const fileRenamer = (filename) => {
  const queHoraEs = Date.now();
  const regex = /[\s_-]/gi;
  const fileTemp = filename.replace(regex, ".");
  let arrTemp = [fileTemp.split(".")];
  return `${arrTemp[0]
    .slice(0, arrTemp[0].length - 1)
    .join("_")}${queHoraEs}.${arrTemp[0].pop()}`;
};
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    Login: async (_, values) => {
      const findUser = await SecondPair.findOne({
        email: values.input.email,
      });
      const passwordIsValid = await bcrypt.compareSync(
        values.input.password,
        findUser.password
      );
      console.log(passwordIsValid, "passwordisValid");
      return passwordIsValid ? findUser : null;
    },
    Products: async (_, values) => {
      try {
        const products = await axios.get("https://fakestoreapi.com/products");
        return products.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    Register: async (_, values) => {
      const newcoinprice = await SecondPair.create({
        email: values.input.email,
        first_name: values.input.first_name,
        second_name: values.input.second_name,
        user_name: values.input.user_name,
        password: hash(values.input.password),
      });
      return newcoinprice;
    },
    fileUpload: async (parent, { file }) => {
      let url = [];
      for (let i = 0; i < file.length; i++) {
        const { createReadStream, filename, mimetype } = await file[i];
        const stream = createReadStream();
        const assetUniqName = fileRenamer(filename);
        const pathName = path.join(__dirname, `./upload/${assetUniqName}`);
        await stream.pipe(fs.createWriteStream(pathName));
        const urlForArray = `http://localhost:4000/${assetUniqName}`;
        url.push({ url: urlForArray });
      }
      return url;
    },
  },
};

export default resolvers;
