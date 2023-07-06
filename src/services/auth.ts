import { Secret, sign } from "jsonwebtoken";
import { UserRole } from "../constants";

const generateToken = (data: any): string => {
  var token = sign(data, process.env.SECRET as Secret, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  return token;
};
const generateUserToken = (id: number, userRole: UserRole): string => {
  const token = generateToken({ id, userRole });
  return token;
};

export { generateToken, generateUserToken };
