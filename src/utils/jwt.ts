import { Secret, verify } from "jsonwebtoken";

const decodeToken = (token: string): any => {
  try {
    const decoded = verify(token, process.env.SECRET as Secret);
    return decoded;
  } catch (e) {
    console.log(e);
  }
};

export { decodeToken };
