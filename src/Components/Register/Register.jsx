import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import style from "./Register.module.scss";

export default function Register() {
  let navigate = useNavigate();
  let [load, setload] = useState(false);
  let [errormsg, seterrormsg] = useState("");
  const [userValidation, SetUserValidation] = useState({
    first_name: {
      error: false,
      errorMessage: "must be string & at least 4 characters",
    },
    last_name: {
      error: false,
      errorMessage: "must be string & at least 4 characters",
    },
    email: {
      error: false,
      errorMessage: "must provide valid mail",
    },
    age: {
      error: false,
      errorMessage: "age min is 20",
    },
    password: {
      error: false,
      errorMessage: "password must contain symbols, letters & numbers ",
    },
  });
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });
  //gotologin
  let goToLogin = () => {
    navigate("/login");
  };

  //joi validation
  let validationForm = () => {
    let schema = Joi.object({
      first_name: Joi.string().required().alphanum().min(4).max(10),
      last_name: Joi.string().required().alphanum().min(4).max(10),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      age: Joi.number().required().min(20).max(70),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
        ),
    });
    return schema.validate(user, { abortEarly: false });
  };
  //on submit
  let sendData = async (e) => {
    e.preventDefault();
    SetUserValidation({
      first_name: {
        error: false,
        errorMessage: "must be string & at least 4 characters",
      },
      last_name: {
        error: false,
        errorMessage: "must be string & at least 4 characters",
      },
      email: {
        error: false,
        errorMessage: "must provide valid mail",
      },
      age: {
        error: false,
        errorMessage: "age min is 20",
      },
      password: {
        error: false,
        errorMessage: "password must contain symbols, letters & numbers ",
      },
    });
    let validateFormDate = validationForm();

    if (validateFormDate.error) {
      validateFormDate.error.details.forEach((error) => {
        SetUserValidation((userValidation) => {
          return {
            ...userValidation,
            [error.path[0]]: { ...userValidation[error.path[0]], error: true },
          };
        });
      });
    } else {
      let { data } = await axios.post(
        "https://movies-front-kappa.vercel.app/user/signUp",
        user
      );
      if (data.message === "success") {
        // setload(true)
        goToLogin();
      } else {
        seterrormsg(data.message);
      }
    }
  };
  //onchang
  let inputData = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  return (
    <>
      <div className={`${style.regesiter} py-5 m-auto w-75`}>
        <h3>Register Form</h3>
        {errormsg ? (
          <div className="alert alert-danger p-2">{errormsg}</div>
        ) : (
          ""
        )}
        <form onSubmit={sendData}>
          <div className="inputData} my-2">
            <label htmlFor="first_name">First Name</label>
            <input
              onChange={inputData}
              type="text"
              name="first_name"
              className="form-control my-3"
            />
            {userValidation.first_name.error ? (
              <div className={`${style.errorMsg} alert p-1 text-start`}>
                {userValidation.first_name.errorMessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="inputData} my-2">
            <label htmlFor="last_name">Last Name</label>
            <input
              onChange={inputData}
              type="text"
              name="last_name"
              className="form-control my-3"
            />
            {userValidation.last_name.error ? (
              <div className={`${style.errorMsg} alert p-1 text-start`}>
                {userValidation.last_name.errorMessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="inputData} my-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={inputData}
              type="email"
              name="email"
              className="form-control my-3"
            />
            {userValidation.email.error ? (
              <div className={`${style.errorMsg} alert p-1 text-start`}>
                {userValidation.email.errorMessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="inputData} my-2">
            <label htmlFor="age">Age</label>
            <input
              onChange={inputData}
              type="number"
              name="age"
              className="form-control my-3"
            />
            {userValidation.age.error ? (
              <div className={`${style.errorMsg} alert p-1 text-start`}>
                {userValidation.age.errorMessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="inputData} my-2">
            <label htmlFor="password">Password</label>
            <input
              onChange={inputData}
              type="password"
              name="password"
              className="form-control my-3"
            />
            {userValidation.password.error ? (
              <div className={`${style.errorMsg} alert p-1 text-start`}>
                {userValidation.password.errorMessage}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* <button loading={state.loading}>Press me!</button> */}

          <div className="clear-fix"></div>
          {load ? (
            <button className="myBtn btn btn-danger my-3 float-end spinner-border spinner-border-sm ">
              Register
            </button>
          ) : (
            <button className="myBtn btn btn-danger my-3 float-end ">
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
