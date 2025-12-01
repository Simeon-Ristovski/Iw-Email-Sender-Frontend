import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repetition } from '../../models/Repetition';
import { RepetitionDtoInsert } from '../../models/dto/RepetitionDtoInsert';

@Injectable({
  providedIn: 'root',
})
export class RepetitionService {
  private apiServerUrl="http://localhost:8080/api/v1/repetitions";
  constructor(private http:HttpClient){}

  public getRepetition():Observable<Repetition[]>{
        return this.http.get<Repetition[]>(`${this.apiServerUrl}`, {withCredentials: true});
  }
  public getRepetitionWithId(id:number):Observable<Repetition>{
        return this.http.get<Repetition>(`${this.apiServerUrl}/${id}`, {withCredentials: true});
  }
  public addRepetition(repetition:RepetitionDtoInsert):Observable<string>{
          return this.http.post(`${this.apiServerUrl}`,repetition, { responseType: 'text', withCredentials: true});
  }
  public deleteRepetition(uuid:string):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/${uuid}`, {withCredentials: true});
  }
}
