import { createContext } from "react";
import { userProps } from "./interfaces";

export const DataContext = createContext({
  user: {username: '', _id:'', profilePicture: ''} as userProps,
  loading: true,
  setLoading: (boolean: boolean) => {},
  setUser: (user?: userProps) => {}
});

export const ThemeContext = createContext({
  theme: 'dark' || 'light',
  toggleTheme: ()=>{}
})