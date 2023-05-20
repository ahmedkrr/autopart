import axios from "axios";
import { API_ENDPOINT } from "../../../API";
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
export function companyowner() {
  const storedToken = localStorage.getItem("token");

  if (storedToken !== null) {
    const decodedToken = jwtdecoder(storedToken);
    if (decodedToken != null) {
      return decodedToken.CompanyId;
    }
  }

  return 0;
}
