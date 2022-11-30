import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Countdown from "react-countdown";

function AddProduct() {
  const [sunday, setSunday] = useState();
  const history = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();
  const getDate = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay();
    const last = first + 7;

    const Nextsunday = new Date(today.setDate(last));
    Nextsunday.setHours(24, 0, 0, 0);
    setSunday(Nextsunday);
    console.log(Nextsunday, new Date(), "-->");
  };
  useEffect(() => {
    getDate();
  }, []);
  const loggedInn = JSON.parse(localStorage?.getItem("email"));

  const [inputField, setInputField] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
  });
  const UPLOAD_FILE = gql`
    mutation fileUpload($file: [Upload]!) {
      fileUpload(file: $file) {
        url
      }
    }
  `;

  const [fileUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });
  const handleFileChange = (e) => {
    const file = e.target.files;
    if (!file) return;
    fileUpload({ variables: { file } });
  };

  const inputsHandler = (e) => {
    const { name, value } = e.target;

    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // const onChange = ({
  //   target: {
  //     validity,
  //     files: [file],
  //   },
  // }) => {
  //   console.log(file, validity);
  //   validity.valid && mutate({ variables: { file: file.toString() } });
  // };
  return (
    <>
      <main>
        <section className="login-reg-bg">
          <div className="container-fluid px-lg-5">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="right-section">
                  <form>
                    <div className="form-container">
                      <div className="form-head-content text-center mt-5">
                        <h3>Add Product</h3>
                        <p>Please Enter Product Details</p>
                      </div>
                      <div className="form-body-content">
                        <div className="form">
                          <div
                            className="mb-3"
                            {...register("user_name", {
                              required: true,
                              minLength: 2,
                              maxLength: 10,
                            })}
                          >
                            <input
                              type="text"
                              className="form-control"
                              onChange={inputsHandler}
                              name="user_name"
                              value={inputField.user_name}
                              placeholder="Product Title"
                            />
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div
                                className="mb-3"
                                {...register("first_name", {
                                  required: true,
                                  minLength: 2,
                                  maxLength: 10,
                                })}
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={inputsHandler}
                                  name="first_name"
                                  value={inputField.first_name}
                                  placeholder="Price"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div
                                className="mb-3"
                                {...register("last_name", {
                                  required: true,
                                  minLength: 2,
                                  maxLength: 10,
                                })}
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={inputsHandler}
                                  name="last_name"
                                  value={inputField.last_name}
                                  placeholder="Category"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="mb-3"
                            {...register("email_address", {
                              required: true,
                              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            })}
                          >
                            <input
                              type="email_address"
                              className="form-control"
                              onChange={inputsHandler}
                              name="email_address"
                              value={inputField.email_address}
                              placeholder="Email Address"
                            />
                          </div>
                          <div
                            className="mb-3"
                            {...register("email_address", {
                              required: true,
                              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            })}
                          >
                            <input
                              type="email_address"
                              className="form-control"
                              onChange={inputsHandler}
                              name="email_address"
                              value={inputField.email_address}
                              placeholder="Email Address"
                            />
                          </div>
                          <input
                            type="file"
                            name="GraphQLUploadForMedium"
                            onChange={handleFileChange}
                          />
                          {sunday && <Countdown date={sunday} />}
                          <div className="row">
                            <button
                              type="submit"
                              className="btn btn-violet btn-contained text-uppercase w-100"
                            >
                              Add Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddProduct;
