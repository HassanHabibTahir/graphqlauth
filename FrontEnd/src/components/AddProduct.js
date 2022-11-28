import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function AddProduct() {
  const history = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();

  const loggedInn = JSON.parse(localStorage?.getItem("email"));

  const [inputField, setInputField] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
  });
  const registerData = gql`
    mutation Mutation($input: CreateCoin) {
      Register(input: $input) {
        email
      }
    }
  `;

  const [registerData2, { data, error, loading }] = useMutation(registerData);
  if (data) {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Registered",
      showConfirmButton: false,
      timer: 1500,
    });
    history("/login");
  }

  const inputsHandler = (e) => {
    const { name, value } = e.target;

    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <main>
        <section className="login-reg-bg">
          <div className="container-fluid px-lg-5">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="left-section">
                  <div className="log-image-wrapper">
                    <img
                      src="assets/images/nft-bg.png"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="right-section">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (
                        !inputField.email_address ||
                        !inputField.first_name ||
                        !inputField.password ||
                        !inputField.last_name ||
                        !inputField.user_name
                      ) {
                        Swal.fire({
                          position: "top-center",
                          icon: "error",
                          title: "Fill All Fields",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      } else {
                        registerData2({
                          variables: {
                            input: {
                              email: inputField.email_address,
                              first_name: inputField.first_name,
                              password: inputField.password,
                              second_name: inputField.last_name,
                              user_name: inputField.user_name,
                            },
                          },
                        }).catch((error) => {
                          Swal.fire({
                            position: "top-center",
                            icon: "error",
                            title: error?.message,
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        });
                      }
                    }}
                  >
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
