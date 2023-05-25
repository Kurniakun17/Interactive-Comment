import React, { useEffect, useState } from "react";
import { generateProfilePic } from "../utils/helpers";

export const useProfilePic = () => {
  const [profilePic, setProfilePic] = useState("");
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProfileAsync = async () => {
      try {
        setIsLoading(true);
        const res = await generateProfilePic();
        setProfilePic(res);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchProfileAsync();
  }, []);

  const randomizeProfilePic = async () => {
    setProfilePic(await generateProfilePic());
  };

  return { profilePic, loading, randomizeProfilePic};
};
