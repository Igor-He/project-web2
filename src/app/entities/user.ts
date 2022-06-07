import { UserStatus } from "./user-status.enum";
import { UserType } from "./user-type.enum";

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    address: string;
    type: UserType;
    imagePath: string;
    status: UserStatus;

    
    constructor(username: string='', email: string='', password: string='', name: string='', surname: string='', dateOfBirth: Date=new Date(), address: string='', type: UserType=UserType.Potrosac, imagePath: string='', status: UserStatus=UserStatus.Processing){
        this.id=0;
        this.username=username;
        this.email=email;
        this.password=password;
        this.name=name;
        this.surname= surname;
        this.dateOfBirth=dateOfBirth;
        this.address=address;
        this.type=type;
        this.imagePath=imagePath;
        this.status=status;
    }
}
