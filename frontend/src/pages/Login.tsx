import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../utils/Contexts";
import { loginHandler } from "../utils/helpers";

export const Login = () => {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUser } = useContext(DataContext);

  const onSubmitHandler = async () => {
    if (
      typeof usernameInput.current?.value === "string" &&
      typeof passwordInput.current?.value === "string"
    ) {
      const data = await loginHandler(
        usernameInput.current?.value,
        passwordInput.current?.value
      );
      setUser(data.username, data._id);
      navigate("/home");
    }
  };

  return (
    <div className=" self-center flex flex-col gap-2 bg-white dark:bg-secondaryBlack w-[80%] max-w-[400px] rounded-xl pb-10 pt-8 px-8">
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
            ref={usernameInput}
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
            type="passowrd"
            required={true}
            min={4}
            max={14}
            ref={passwordInput}
          />
        </div>
      </div>
      <button
        className="w-full mt-3 bg-moderateBlue dark:bg-indigo-300  text-white font-bold rounded-md py-2 hover:cursor-pointer"
        onClick={onSubmitHandler}
      >
        Submit
      </button>
      <p className="dark:text-white text-sm mt-4 text-center">
        Didn't have an account yet?{" "}
        <span
          className="text-center text-moderateBlue dark:text-indigo-300 font-bold hover:cursor-pointer"
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
          className="text-center text-moderateBlue dark:text-indigo-300 font-bold hover:cursor-pointer"
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
