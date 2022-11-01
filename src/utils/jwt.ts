import { verify, Secret } from "jsonwebtoken";
import { Decoded } from "../types";

const decodeToken = (token: string): Decoded | undefined => {
  try {
    const decoded = verify(token, process.env.SECRET as Secret);
    return decoded as Decoded;
  } catch (e) {
    console.log(e);
  }
};

export { decodeToken };
