import React, { useContext } from "react";
import { DataContext, ThemeContext } from "../utils/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, setUser } = useContext(DataContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    setUser("", "");
  };

  return (
    <div className=" bg-white dark:bg-[#232529] flex justify-between w-full p-4 desktop:p-6 rounded-b-xl shadow-md">
      <h1 className="font-bold text-darkBlue  pt-2 dark:text-white">
        Hai, {user.username ? user.username : "guest"}
      </h1>
      <div className="flex gap-2">
        <button
          className="rounded-full px-3.5 py-2 hover:bg-slate-200 dark:hover:bg-[#333841]"
          aria-label="toggle theme button"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <FontAwesomeIcon size="lg" className="text-slate-700" icon={faMoon}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon size="lg" icon={faSun} inverse></FontAwesomeIcon>
          )}
        </button>
        {user.username ? (
          <button
            className="bg-softRed text-white px-2 py-1 rounded-md font-bold"
            onClick={onLogoutHandler}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-moderateBlue text-white px-2 py-1 rounded-md font-bold"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
