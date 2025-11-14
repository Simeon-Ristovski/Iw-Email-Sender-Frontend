import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth-service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/accountService/account';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-info-component',
  imports: [RouterOutlet, NgForOf, CommonModule, FormsModule],
  templateUrl: './account-info-component.html',
  styleUrl: './account-info-component.css',
})
export class AccountInfoComponent implements OnInit{
  
  loggedUser:any; 
  public editAccount :Account ={}as Account;

  constructor(private  authService:AuthService,private accountSerivce:AccountService,private router: Router){}

  ngOnInit(): void {
     this.loggedUser = this.authService.getLoggedInUser();
  }
  
  public onEditEmailJob(editForm: NgForm, id: string): void {
    document.getElementById('edit-info-acc-form')?.click();
    const userUuid = this.loggedUser.uuid; 
    this.accountSerivce.editAccount(userUuid,editForm.value).subscribe( 
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

  public onOpenModal(account: Account, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');

      if (mode === 'edit') {
        this.editAccount= account;
        button.setAttribute('data-target', '#editAccountModal');
      }
      container?.appendChild(button);
      button.click();
    }
 
}
