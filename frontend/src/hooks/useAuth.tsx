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

  const setUser = (username: string, id: string) => {
    setUserData((prev: userProps) => ({ ...prev, username, _id: id }));
  };

  return { userData, setUser, isLoading, setLoading };
};
