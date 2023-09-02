import jwtDecode from 'jwt-decode';

export const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    if (decodedToken.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const getName = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.name;
  } catch (error) {
    return;
  }
}