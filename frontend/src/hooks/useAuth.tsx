import React, { useState } from "react";
import { userProps } from "../utils/interfaces";
import data from "../utils/data.json";

export const useAuth = () => {
  const [userData, setUserData] = useState<userProps>({
    image: {
      png: "",
      webp: "",
    },
    username: "",
    _id: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const setLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  const setUser = (newUserData?: userProps) => {
    const defaultData = {
      image: {
        png: "",
        webp: "",
      },
      username: "",
      _id: "",
    };

    setUserData(newUserData || defaultData);
  };

  return { userData, setUser, isLoading, setLoading };
};
