import { createContext } from "react";
import { userProps } from "./interfaces";

export const DataContext = createContext({
  user: {} as userProps,
  loading: true,
  setLoading: (boolean: boolean) => {},
  setUser: (username: string, _id: string) => {}
});

export const ThemeContext = createContext({
  theme: '',
  toggleTheme: ()=>{}
})