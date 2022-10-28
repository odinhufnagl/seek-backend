import { Request, Response } from "express";
import { getUsers } from "../services";

const controllerGetUsers = async (req: Request, res: Response) => {
  const r = await getUsers();
  console.log(r);
  if (!r) {
    res.send("no users");
    return;
  }
  res.send(r);
};

export { controllerGetUsers };
