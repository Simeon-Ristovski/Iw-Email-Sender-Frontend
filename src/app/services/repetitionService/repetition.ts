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
        return this.http.get<Repetition[]>(`${this.apiServerUrl}`);
  }
  public getRepetitionWithId(id:number):Observable<Repetition>{
        return this.http.get<Repetition>(`${this.apiServerUrl}/${id}`);
  }
  public addRepetition(repetition:RepetitionDtoInsert):Observable<string>{
          return this.http.post(`${this.apiServerUrl}`,repetition, { responseType: 'text' });
  }
  public deleteRepetition(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/${id}`);
  }



}
