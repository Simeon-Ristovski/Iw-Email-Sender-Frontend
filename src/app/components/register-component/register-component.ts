import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';
import { Account } from '../../models/Account';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  imports: [RouterOutlet, NgForOf, RouterLink, CommonModule, FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router:Router) { }

  onRegister(addForm: NgForm) {
    this.authService.addAccount(addForm.value).subscribe(
      (response:Account)=>{
        this.router.navigate(['/']);
        Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    html: '<b style="font-size: 20px;">Account successfully added! </b>',
                    confirmButtonText: 'OK'
                  })
      },(error: HttpErrorResponse) => {
              Swal.fire({
                icon: "error",
                title: "ERROR",
                html: `<b style="font-size: 20px;">Account can't be added!</b><br> <i>${error.error}</i>`,
                confirmButtonText: 'OK'
              });
            }
          );
  }


}
