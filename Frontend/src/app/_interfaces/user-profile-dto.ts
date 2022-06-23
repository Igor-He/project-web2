import { UserStatus } from "../entities/enums/user-status.enum";

export interface UserProfileDto {
    id: string;
    username: string;
    email: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    address: string;
    type: string;
    status: string;
}
