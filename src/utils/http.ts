import { Response } from "express";
import { HttpResponseData } from "../types";

const sendServerErrorMessage = (res: Response, e: any): void => {
  res.status(500).send({ message: e });
};

const sendErrorMessage = (res: Response, data: HttpResponseData): void => {
  res.status(data.status || 404).send(data.body);
};

export { sendServerErrorMessage, sendErrorMessage };
