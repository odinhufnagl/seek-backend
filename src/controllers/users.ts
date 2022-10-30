import { Request, Response } from "express";
import { findUsers } from "../services";

const getUsers = async (req: Request, res: Response) => {
  const r = await findUsers();
  console.log(r);
  if (!r) {
    res.send("no users");
    return;
  }
  res.send(r);
};

export default { getUsers };
