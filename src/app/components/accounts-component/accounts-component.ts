import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/accountService/account';
import { Account } from '../../models/Account';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RoleService } from '../../services/roleService/role';
import { Role } from '../../models/Role';

@Component({
  selector: 'app-accounts-component',
  imports: [RouterOutlet, NgForOf, CommonModule, FormsModule],
  templateUrl: './accounts-component.html',
  styleUrl: './accounts-component.css',
})
export class AccountsComponent implements OnInit {

  public accounts: Account[] = [];
  public rolesComp: Role[] = [];
  public editAcc: Account = {} as Account;
  public selectedRole: string = "";

  constructor(private accountService: AccountService, private roleService: RoleService,private router: Router) {

  }
  ngOnInit(): void {
    this.getAccounts();
    this.getRoles();
  }

  public getAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.rolesComp = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  public onAddAccount(addForm: NgForm): void {
    document.getElementById('add-account-form')?.click();
    this.accountService.addAccount(addForm.value).subscribe(
      (response: string) => {
        this.getAccounts();
        addForm.reset();
        Swal.fire({
          icon: "success",
          title: "Succesfully Added",
          html: `<b style="font-size: 20px;">${response}</b>`,
          confirmButtonText: 'OK'
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Account can't be added!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onEditAccount(uuid:string,addRoleForm: NgForm): void {
    document.getElementById('add-account-role-form')?.click();
    const dto = { roleName: this.selectedRole };
    this.accountService.addRoleToAccount(uuid,dto).subscribe(
      (response: string) => {
        this.getAccounts();
        addRoleForm.reset();
        Swal.fire({
          icon: "success",
          title: "Succesfully Added",
          html: `<b style="font-size: 20px;">${response}</b>`,
          confirmButtonText: 'OK'
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Role can't be added!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onRemoveRoleAccount(uuid:string,addRoleForm: NgForm): void {
    document.getElementById('remove-account-role-form')?.click();
    const dto = { roleName: this.selectedRole };
    this.accountService.removeRoleToAccount(uuid,dto).subscribe(
      (response: string) => {
        this.getAccounts();
        addRoleForm.reset();
        Swal.fire({
          icon: "success",
          title: "Succesfully Added",
          html: `<b style="font-size: 20px;">${response}</b>`,
          confirmButtonText: 'OK'
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Role can't be added!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public searcAcc(key: string): void {
    const results: Account[] = [];
    for (const account of this.accounts) {
      if (account.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || account.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || account.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(account);
      }
    }
    this.accounts = results;
    if (!key) {
      this.getAccounts();
    }
  }
  public onOpenModalUser(account: Account, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addAccountModal');
    }
    if (mode === 'edit') {
      this.editAcc=account;
      button.setAttribute('data-target', '#addRoleToAccountModal');
    }
    if (mode === 'removeRole') {
      this.editAcc=account;
      button.setAttribute('data-target', '#removeRoleToAccountModal');
    }
    if (mode === 'editAcc') {
          this.editAcc= account;
          button.setAttribute('data-target', '#updateAccountModal');
        }
    container?.appendChild(button);
    button.click();
  }



  public onEditEmailJob(editForm: NgForm, id: string): void {
      document.getElementById('edit-acc-full-form')?.click();
      const userUuid = this.editAcc.uuid; 
      this.accountService.editAccount(userUuid,editForm.value).subscribe( 
        () => {
          Swal.fire({
            icon: "success",
            title: "Succesfully Edited",
            html: '<b style="font-size: 20px;">You have successfully edited this account!<br>You will be logged out automatically.</b>',
            confirmButtonText: 'OK'
          })
          this.router.navigate(['/login']);
        }, (error: HttpErrorResponse) => {
          Swal.fire(
            {
              icon: "error",
              title: "ERROR",
              html: `<b style="font-size: 20px;">Email job can\'t be edited! </b><br><i>${error.error}</i>`,
              confirmButtonText: 'OK'
            }
          )
        }
      );
    }

}
