const { SecondPair } = require("./Models/Register");
const bcrypt = require("bcryptjs");
function hash(password) {
  return bcrypt.hashSync(password, 10);
}
const resolvers = {
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
  },
};

module.exports = { resolvers };
