import { EmailJob } from "./EmailJob";
import { Role } from "./Role";

export interface Account{
    id:number;
    uuid:string;
    firstName:string;
    email:string;
    lastName:string;
    roles:String[];
}