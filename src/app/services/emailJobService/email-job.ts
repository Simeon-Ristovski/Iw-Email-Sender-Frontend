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
            return this.http.get<EmailJob[]>(`${this.apiServerUrl}`, {withCredentials: true});
      }
      public addEmailJob(id: string, emailjob: EmailJobDtoInsert): Observable<string> {
            return this.http.post(`${this.apiServerUrl}/account_id/${id}`, emailjob, { responseType: 'text', withCredentials: true });
      }
      public deleteEmailJob(id: string): Observable<void> {
            return this.http.delete<void>(`${this.apiServerUrl}/${id}`, {withCredentials: true});
      }
      public editEmailJob(id_acc: string, id_emailJob: string, emailjob: EmailJobDtoInsert): Observable<string> {
            return this.http.put(`${this.apiServerUrl}/acc/${id_acc}/emailid/${id_emailJob}`, emailjob, { responseType: 'text', withCredentials: true });
      }
      public setJobActiveOrDeactive(id: string, active: boolean): Observable<string> {
            return this.http.put(`${this.apiServerUrl}/${id}`, active, { responseType: 'text' , withCredentials: true });
      }
      public repeatEmailJob(id_acc: string, id: string, emailjob: EmailJobTimeToSendNextInsertDto): Observable<string> {
            return this.http.post(`${this.apiServerUrl}/${id_acc}/repeat/${id}`, emailjob, { responseType: 'text' , withCredentials: true});
      }
      public deleteEmailJobs(): Observable<void> {
            return this.http.delete<void>(`${this.apiServerUrl}/delete-all`, {withCredentials: true});
      }
      public getEmailJobsForAcc(id: string): Observable<EmailJob[]> {
            return this.http.get<EmailJob[]>(`${this.apiServerUrl}/acc/${id}`, {withCredentials: true});
      }
      public deleteAllForAcc(id: string): Observable<EmailJob[]> {
            return this.http.delete<EmailJob[]>(`${this.apiServerUrl}/acc/${id}`, {withCredentials: true});
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

