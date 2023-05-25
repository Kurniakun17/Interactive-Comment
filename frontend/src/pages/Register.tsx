import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext, ThemeContext } from "../utils/Contexts";
import { checkUsername, registerHandler } from "../utils/helpers";
import { ProfileSetup } from "../components/ProfileSetup";
import { Theme, ToastContainer, toast } from "react-toastify";
import { useForm } from "../hooks/useForm";

export const Register = () => {
  const {
    usernameInput,
    passwordInput,
    onUsernameInputChange,
    onPasswordInputChange,
  } = useForm();
  const [modalIndex, setModalIndex] = useState(0);

  const navigate = useNavigate();
  const { setUser } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const onNextButtonHandler = async () => {
    const isUsernameUsed = await checkUsername(usernameInput);

    if (!isUsernameUsed) {
      const hasUppercase = /[A-Z]/.test(passwordInput as string);
      const hasLowercase = /[a-z]/.test(passwordInput as string);
      const hasNumber = /\d/.test(passwordInput as string);
      if (!(hasUppercase && hasLowercase && hasNumber)) {
        return toast.error(
          "Password must contain Uppercase, Lowercase, and Number!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: (theme as Theme) || undefined,
          }
        );
      }
      setModalIndex((prev: number) => prev + 1);
    } else {
      toast.error("Username has already been used!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: (theme as Theme) || undefined,
      });
    }
  };

  const onSubmitHandler = async (profilePic: string) => {
    if (
      typeof usernameInput === "string" &&
      typeof passwordInput === "string"
    ) {
      const data = await registerHandler(
        usernameInput,
        passwordInput,
        profilePic
      );
      setUser(data);
      navigate("/home");
    }
  };

  return (
    <div className=" self-center flex flex-col gap-2 bg-white dark:bg-secondaryBlack w-[80%] max-w-[400px] rounded-xl pb-10 pt-8 px-8">
      {modalIndex === 0 ? (
        <>
          <h1 className="font-bold text-moderateBlue dark:text-white text-2xl text-center">
            Register
          </h1>
          <div className="flex flex-col gap-2">
            <div>
              <label className="dark:text-slate-300" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                aria-label="username register input"
                className="border-2 dark:text-white rounded px-4 py-2 w-full resize-none desktop:w-full hover:cursor-pointer dark:bg-gray-600 hover:border-lightGrayish focus:outline-moderateBlue focus:cursor-text"
                placeholder="sukma"
                type="text"
                required={true}
                min={4}
                max={14}
                onChange={(e) => {
                  onUsernameInputChange(e);
                }}
              />
            </div>
            <div>
              <label className="dark:text-slate-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                aria-label="password register input"
                className="border-2 dark:text-white rounded px-4 py-2 w-full resize-none desktop:w-full hover:cursor-pointer dark:bg-gray-600 hover:border-lightGrayish focus:outline-moderateBlue focus:cursor-text"
                placeholder="sukma123"
                type="password"
                required={true}
                min={4}
                max={14}
                onChange={(e) => {
                  onPasswordInputChange(e);
                }}
              />
            </div>
          </div>
          <button
            className="w-full mt-3 bg-moderateBlue dark:bg-indigo-400  text-white font-bold rounded-md py-2 hover:cursor-pointer"
            onClick={onNextButtonHandler}
          >
            Next
          </button>
          <p className="dark:text-white text-sm mt-4 text-center">
            Already have an account?{" "}
            <span
              className="text-center text-moderateBlue dark:text-indigo-300 font-bold hover:cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </>
      ) : (
        <ProfileSetup onSubmitHandler={onSubmitHandler} />
      )}
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={(theme as Theme) || undefined}
      />
    </div>
  );
};
