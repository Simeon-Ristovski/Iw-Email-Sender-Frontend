import { Account } from "./Account";
import { Repetition } from "./Repetition";
import { Status } from "./Status";

export interface EmailJob{
    id:number;
    uuid:string;
    subject:string;
    message:string;
    emailFrom:string;
    emailTo:string;
    set_by:string;
    dateSend:Date;
    dateDue:Date;
    timeToSent: string;
    repetition:Repetition;
    status:Status;
    repetitive:string;
    state:string;
    maxNumOfTrys:number;
    active:boolean;
    emailsTo:string[];
}