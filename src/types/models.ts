import { Model } from "sequelize";

interface IUser extends Model<any, any> {
  email: string;
  password: string;
  name: string;
  id?: number;
}

export { IUser };
