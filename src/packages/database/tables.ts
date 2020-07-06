import { getConnection } from "typeorm";
import { User } from "./models/user";

export const UsersTable = getConnection().getRepository(User)