import { Model } from "sequelize";

export interface IUser extends Model<any, any> {
  email: string;
  password: string;
  name: string;
  id?: number;
}
