import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExceptionEntity } from '../../models/ExceptionEntity';


@Injectable({
  providedIn: 'root',
})
export class ExceptionEntityService {
  private apiServerUrl="http://localhost:8080/api/v1/exceptions";
  constructor(private http:HttpClient){}

  public getExceptions():Observable<ExceptionEntity[]>{
          return this.http.get<ExceptionEntity[]>(`${this.apiServerUrl}`);
    }
  public getExceptionEntityWithId(uuid:string):Observable<ExceptionEntity>{
          return this.http.get<ExceptionEntity>(`${this.apiServerUrl}/${uuid}`);
  }
  public deleteExceptionEntity(uuid:string):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/${uuid}`);
  }
  public deleteExceptionEntitys():Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}`);
  }

}
