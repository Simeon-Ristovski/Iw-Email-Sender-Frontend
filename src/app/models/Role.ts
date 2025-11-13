import { Account } from "./Account";

export interface Role{
    id:number;
    uuid:string;
    roleName:string;
    listOfAccounts: Account[];
}