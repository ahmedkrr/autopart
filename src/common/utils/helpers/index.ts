import { jwtdecoder } from "../../../Jwtdecode";

export function isUserAdmin() {
  const storedToken = localStorage.getItem("token");

  if (storedToken !== null) {
    const decodedToken = jwtdecoder(storedToken);
    if (decodedToken != null) {
      return decodedToken.isAdmin.toLowerCase?.() === "true";
    }
  }

  return false;
}
