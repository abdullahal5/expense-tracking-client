import { jwtDecode } from "jwt-decode";

export const verifyToken = async (token: string) => {
  const decoded = jwtDecode(token);

  return decoded;
};
