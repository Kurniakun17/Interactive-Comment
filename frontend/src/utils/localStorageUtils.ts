export const getThemeLS = () => {
  if(localStorage.getItem('theme')){
    return localStorage.getItem('theme') as string;
  }
  return 'light'
}