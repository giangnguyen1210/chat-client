export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

export const getToken = () => {
  return localStorage.getItem('token');
}
  
  export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  