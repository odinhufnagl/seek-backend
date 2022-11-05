import { Model } from "sequelize";

export interface IUser extends Partial<Model<any, any>> {
  email?: string;
  password?: string;
  name?: string;
  id?: number;
}
