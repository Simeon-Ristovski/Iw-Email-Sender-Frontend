import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../models/Role';
import { RoleDtoInsert } from '../../models/dto/RoleDtoInsert';


@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiServerUrl = "http://localhost:8080/api/v1/roles";
  constructor(private http: HttpClient) { }
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}`, {withCredentials: true});
  }
  public getRoleWithId(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/${id}`, {withCredentials: true});
  }
  public addRole(role: RoleDtoInsert): Observable<string> {
    return this.http.post(`${this.apiServerUrl}`, role, { responseType: 'text', withCredentials: true});
  }
  public deleteRole(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${uuid}`, {withCredentials: true});
  }
}
