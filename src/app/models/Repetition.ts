import { EmailJob } from "./EmailJob";

export interface Repetition{
    id:number;
    uuid:string;
    repetitionName:string;
    listOfEmailJobs:EmailJob[];
}