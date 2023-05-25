import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../utils/Contexts";
import { loginHandler } from "../utils/helpers";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const {
    usernameInput,
    passwordInput,
    onUsernameInputChange,
    onPasswordInputChange,
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useContext(DataContext);

  const onSubmitHandler = async () => {
    if (
      typeof usernameInput === "string" &&
      typeof passwordInput === "string" &&
      usernameInput !== "" &&
      passwordInput !== ""
    ) {
      const data = await loginHandler(usernameInput, passwordInput);
      setUser(data);
      navigate("/home");
    }
  };

  return (
    <div className="self-center flex flex-col gap-2 bg-white dark:bg-secondaryBlack w-[80%] max-w-[400px] rounded-xl pb-10 pt-8 px-8">
      <h1 className="font-bold text-moderateBlue dark:text-white text-2xl text-center">
        Login
      </h1>
      <div className="flex flex-col gap-2">
        <div>
          <label className="dark:text-slate-300" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="border-2 dark:text-white rounded px-4 py-2 w-full resize-none desktop:w-full hover:cursor-pointer dark:bg-gray-600 hover:border-lightGrayish focus:outline-moderateBlue focus:cursor-text"
            placeholder="sukma"
            type="text"
            required={true}
            min={4}
            max={14}
            onChange={onUsernameInputChange}
          />
        </div>
        <div>
          <label className="dark:text-slate-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            aria-label="username login input"
            className="border-2 dark:text-white rounded px-4 py-2 w-full resize-none desktop:w-full hover:cursor-pointer dark:bg-gray-600 hover:border-lightGrayish focus:outline-moderateBlue focus:cursor-text"
            placeholder="sukma123"
            type="password"
            required={true}
            min={4}
            max={14}
            onChange={onPasswordInputChange}
          />
        </div>
      </div>
      <button
        className="w-full mt-3 bg-moderateBlue dark:bg-indigo-400  text-white font-bold rounded-md py-2 hover:cursor-pointer"
        onClick={onSubmitHandler}
      >
        Submit
      </button>
      <p className="dark:text-white text-sm mt-4 text-center">
        Didn't have an account yet?{" "}
        <span
          className="text-center text-moderateBlue dark:text-indigo-400 font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </span>
      </p>
      <p className="text-sm dark:text-white text-center">
        Login as a{" "}
        <span
          className="text-center text-moderateBlue dark:text-indigo-400 font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          Guest
        </span>
      </p>
    </div>
  );
};
