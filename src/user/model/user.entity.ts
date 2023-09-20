import { Role } from "../enums/role.enum";

export interface User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
}