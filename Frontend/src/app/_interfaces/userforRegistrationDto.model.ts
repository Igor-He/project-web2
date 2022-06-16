import { UserStatus } from "../entities/enums/user-status.enum";
import { UserType } from "../entities/enums/user-type.enum";

export interface UserForRegistrationDto {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    address: string;
    type: UserType;
    status: UserStatus;
    confirmPassword: string;
}