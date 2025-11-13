import { Repetition } from "../Repetition";

export interface EmailJobDtoInsert{
    subject:string;
    message:string;
    emailTo:string;
    dateSend:Date;
    dateDue:Date;
    timeToSent:string;
    repetition:Repetition;
    repetitive:string;
}