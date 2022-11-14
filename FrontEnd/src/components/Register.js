import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Register() {
  const history = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();

  const loggedInn = JSON.parse(localStorage?.getItem("email"));
  useEffect(() => {
    window.scrollTo(0, 0);
    if (loggedInn) {
      history("/");
    } else {
    }
  }, []);
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
              <div className="col-md-6 col-lg-6">
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
                        <h3>Registration</h3>
                        <p>Please Enter Your Details To Register</p>
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
                              placeholder="User Name"
                            />
                            <span className="d-flex mt-1 ml-2">
                              {" "}
                              {errors.user_name &&
                                errors.user_name.type === "required" && (
                                  <p style={{ color: "red" }}>
                                    Username is Required{" "}
                                  </p>
                                )}
                            </span>
                            <span className="d-flex mt-1 ml-2">
                              {" "}
                              {errors.user_name &&
                                errors.user_name.type === "maxLength" && (
                                  <p style={{ color: "red" }}>
                                    Enter Valid Username{" "}
                                  </p>
                                )}
                            </span>
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
                                  placeholder="First Name"
                                />
                                <span className="d-flex mt-1 ml-2">
                                  {" "}
                                  {errors.first_name &&
                                    errors.first_name.type === "required" && (
                                      <p style={{ color: "red" }}>
                                        First Name is Required{" "}
                                      </p>
                                    )}
                                </span>
                                <span className="d-flex mt-1 ml-2">
                                  {" "}
                                  {errors.first_name &&
                                    errors.first_name.type === "maxLength" && (
                                      <p style={{ color: "red" }}>
                                        Enter Valid First Name{" "}
                                      </p>
                                    )}
                                </span>
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
                                  placeholder="Last Name"
                                />
                                <span className="d-flex mt-1 ml-2">
                                  {" "}
                                  {errors.last_name &&
                                    errors.last_name.type === "required" && (
                                      <p style={{ color: "red" }}>
                                        Last Name is Required{" "}
                                      </p>
                                    )}
                                </span>
                                <span className="d-flex mt-1 ml-2">
                                  {" "}
                                  {errors.last_name &&
                                    errors.last_name.type === "maxLength" && (
                                      <p style={{ color: "red" }}>
                                        Enter Valid Last Name{" "}
                                      </p>
                                    )}
                                </span>
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
                            <span className="d-flex mt-1 ml-2">
                              {" "}
                              {errors.email_address &&
                                errors.email_address.type === "required" && (
                                  <p style={{ color: "red" }}>
                                    Email is Required{" "}
                                  </p>
                                )}
                            </span>
                            <span className="d-flex mt-1 ml-2">
                              {" "}
                              {errors.email_address &&
                                errors.email_address.type === "pattern" && (
                                  <p style={{ color: "red" }}>
                                    That is not a valid email{" "}
                                  </p>
                                )}
                            </span>
                          </div>
                          <div
                            className="mb-3"
                            {...register("password", {
                              required: true,
                              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            })}
                          >
                            <input
                              type="password"
                              className="form-control"
                              onChange={inputsHandler}
                              name="password"
                              value={inputField.password}
                              placeholder="Password"
                            />
                            <span className="d-flex mt-1 ml-2">
                              {" "}
                              {errors.password &&
                                errors.password.type === "required" && (
                                  <p style={{ color: "red" }}>
                                    Password is Required{" "}
                                  </p>
                                )}
                            </span>
                            <span className="d-flex mt-1 ml-2">
                              {" "}
                              {errors.password &&
                                errors.password.type === "pattern" && (
                                  <p style={{ color: "red" }}>
                                    That is not a valid password{" "}
                                  </p>
                                )}
                            </span>
                          </div>

                          <div
                            className="mb-3 row"
                            {...register("country", { required: true })}
                          ></div>

                          <div className="row">
                            <button
                              type="submit"
                              className="btn btn-violet btn-contained text-uppercase w-100"
                            >
                              Sign Up
                            </button>
                          </div>
                          <p className="acc-area">
                            {" "}
                            Already Have An Account?{" "}
                            <span>
                              <Link to="/login">Sign In</Link>
                            </span>
                          </p>
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

export default Register;
