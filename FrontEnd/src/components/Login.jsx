import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();

  const loggedInn = JSON.parse(localStorage?.getItem("email"));
  useEffect(() => {
    window.scrollTo(0, 0);
    if (loggedInn) {
      navigate("/");
    } else {
    }
  }, []);

  const [inputField, setInputField] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    country: "",
  });
  const registerData = gql`
    query Login($input: Login!) {
      Login(input: $input) {
        email
      }
    }
  `;
  //dfgdfgdf?bfgb

  const [loginData, { data, error }] = useLazyQuery(registerData);
  if (data?.Login) {
    localStorage.setItem("email", JSON.stringify(data?.Login?.email));
    console.log(data);
  }

  const Login = (e) => {
    e.preventDefault();

    loginData({
      variables: {
        input: {
          email: inputField.email_address,
          password: inputField.password,
        },
      },
    })
      .then((data) => {
        if (data?.data?.Login?.email) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Registered",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Credentials Wrong !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: error?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    if (name === "walletAddress") {
    } else {
      setInputField((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
                  <form onSubmit={Login}>
                    <div className="form-container">
                      <div className="form-head-content text-center mt-5">
                        <h3>Login</h3>
                        <p>Please Enter Your Details To Register</p>
                      </div>
                      <div className="form-body-content">
                        <div className="form">
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
                              Login
                            </button>
                          </div>
                          <p className="acc-area">
                            {" "}
                            Have No Account ?{" "}
                            <span>
                              <Link to="/register">Register</Link>
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

export default Login;
