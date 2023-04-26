import jwt_decode from "jwt-decode";

interface JwtPayload {
  Id: number;
  Name: string;
  Role: string;
  isAdmin: string;
  IsCompanyOwner: string;
  CompanyId: number;
}

export function jwtdecoder(token: string): JwtPayload | null {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt_decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// import { jwtdecoder } from "./jwtdecoder";

// const storedToken = localStorage.getItem("token");
// if (storedToken != null) {
//   const decodedToken = jwtdecoder(storedToken);
//   console.log(decodedToken.Id, decodedToken.Name);
// }
