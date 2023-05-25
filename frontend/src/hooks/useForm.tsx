import React, {useState} from 'react'

export const useForm = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const onUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsernameInput(e.target.value);
    };

    const onPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(e.target.value);
    };
  return {usernameInput, passwordInput, onUsernameInputChange, onPasswordInputChange}
}
