import React, { useState } from "react";
import { userProps } from "../utils/interfaces";

export const useAuth = () => {
  const [userData, setUserData] = useState<userProps>({
    profilePicture: "",
    username: "",
    _id: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const setLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  const setUser = (newUserData?: userProps) => {
    const defaultData = {
      profilePicture: "",
      username: "",
      _id: "",
    };

    setUserData(newUserData || defaultData);
  };

  return { userData, setUser, isLoading, setLoading };
};
