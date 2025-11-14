import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../../models/Status';
import { StatusDtoInsert } from '../../models/dto/StatusDtoInsert';


@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiServerUrl="http://localhost:8080/api/v1/statuses";
  constructor(private http:HttpClient){}

    public getStatuses(): Observable<Status[]> {
      return this.http.get<Status[]>(`${this.apiServerUrl}`);
    }
    public getStatusWithId(id: number): Observable<Status> {
      return this.http.get<Status>(`${this.apiServerUrl}/${id}`);
    }
    public addStatus(status: StatusDtoInsert): Observable<string> {
      return this.http.post(`${this.apiServerUrl}`, status, { responseType: 'text' });
    }
    public deleteStatus(uuid: string): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${uuid}`);
    }
}
