import { sign, Secret } from "jsonwebtoken";

const generateToken = (data: any): string => {
  var token = sign(data, process.env.SECRET as Secret, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  return token;
};

export { generateToken };
