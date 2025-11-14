import { EmailJob } from "./EmailJob";

export interface Repetition{
    id:number;
    uuid:string;
    inHours:number;
    repetitionName:string;
    listOfEmailJobs:EmailJob[];
}