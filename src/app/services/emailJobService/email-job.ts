import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailJobDtoInsert } from '../../models/dto/EmailJobDtoInsert';
import { IsActiveInsert } from '../../models/dto/IsActiveInsert';
import { MaxNumOfTriesInsert } from '../../models/dto/MaxNumOfTriesInsert';
import { EmailJobTimeToSendNextInsertDto } from '../../models/dto/EmailJobTimeToSendNextInsertDto';
import { EmailJob } from '../../models/EmailJob';

@Injectable({
      providedIn: 'root',
})
export class EmailJobService {
      private apiServerUrl = "http://localhost:8080/api/v1/emailjobs";
      constructor(private http: HttpClient) { }

      public getEmailJobs(): Observable<EmailJob[]> {
            return this.http.get<EmailJob[]>(`${this.apiServerUrl}`);
      }
      public addEmailJob(id: string, emailjob: EmailJobDtoInsert): Observable<string> {
            return this.http.post(`${this.apiServerUrl}/account_id/${id}`, emailjob, { responseType: 'text' });
      }
      public deleteEmailJob(id: string): Observable<void> {
            return this.http.delete<void>(`${this.apiServerUrl}/${id}`);
      }
      public editEmailJob(id_acc: number, id_emailJob: string, emailjob: EmailJobDtoInsert): Observable<string> {
            return this.http.put(`${this.apiServerUrl}/acc/${id_acc}/emailid/${id_emailJob}`, emailjob, { responseType: 'text' });
      }
      public setJobActiveOrDeactive(id: string, active: boolean): Observable<string> {
            return this.http.put(`${this.apiServerUrl}/${id}`, active, { responseType: 'text' });
      }
      public repeatEmailJob(id_acc: number, id: string, emailjob: EmailJobTimeToSendNextInsertDto): Observable<string> {
            return this.http.post(`${this.apiServerUrl}/${id_acc}/repeat/${id}`, emailjob, { responseType: 'text' });
      }
      public deleteEmailJobs(): Observable<void> {
            return this.http.delete<void>(`${this.apiServerUrl}/delete-all`);
      }
      
      public getEmailJobsForAcc(id: string): Observable<EmailJob[]> {
            return this.http.get<EmailJob[]>(`${this.apiServerUrl}/acc/${id}`);
      }



      

      public getEmailJobWithId(id: number): Observable<EmailJob> {
            return this.http.get<EmailJob>(`${this.apiServerUrl}/${id}`);
      }
      public editMaxNumOfFailedTrys(id: string, num: number): Observable<string> {
            return this.http.put(`${this.apiServerUrl}/number-of-failed-trys/${id}`, num, { responseType: 'text' });
      }

      public startScheduler(): Observable<string> {
            return this.http.get(`${this.apiServerUrl}/start`, { responseType: 'text' });
      }

      public stopScheduler(): Observable<string> {
            return this.http.get(`${this.apiServerUrl}/stop`, { responseType: 'text' });
      }
}

