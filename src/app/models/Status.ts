import { EmailJob } from "./EmailJob";

export interface Status{
    id:number;
    uuid: string;
    statusName: string;
    listOfEmailJobs:EmailJob[];
}