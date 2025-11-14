import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDtoInsert } from '../../models/dto/AccountDtoInsert';
import { AccountRoleDtoInsert } from '../../models/dto/AccountRoleDtoInsert';
import { RoleDtoInsert } from '../../models/dto/RoleDtoInsert';

import { Account } from '../../models/Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService{
  private apiServerUrl="http://localhost:8080/api/v1/accounts";
  constructor(private http:HttpClient){}
   
  public getAccounts():Observable<Account[]>{
        return this.http.get<Account[]>(`${this.apiServerUrl}`);
  }
  public getAccountWithId(id:number):Observable<Account>{
        return this.http.get<Account>(`${this.apiServerUrl}/${id}`);
  }
  public addAccount(account:AccountDtoInsert):Observable<string>{
        return this.http.post(`${this.apiServerUrl}`,account, { responseType: 'text' });
  }
  public addAccountWithRole(account:AccountRoleDtoInsert):Observable<string>{
        return this.http.post(`${this.apiServerUrl}/add-role`,account, { responseType: 'text' });
  }
  public addRoleToAccount(id:string,role:RoleDtoInsert):Observable<string>{
        return this.http.post(`${this.apiServerUrl}/${id}/roles`,role, { responseType: 'text' });
  }
  public removeRoleToAccount(id:string,role:RoleDtoInsert):Observable<string>{
        return this.http.post(`${this.apiServerUrl}/${id}/roles/remove`,role, { responseType: 'text' });
  }
  public editAccount(id:string,account:AccountDtoInsert):Observable<string>{
        return this.http.put(`${this.apiServerUrl}/${id}`,account, { responseType: 'text' });
  }
  public deleteAccount(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/${id}`);
  }
  public deleteAccounts():Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}`);
  }

}
