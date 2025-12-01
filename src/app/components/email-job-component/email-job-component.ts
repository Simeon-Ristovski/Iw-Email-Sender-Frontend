import { Component, OnInit } from '@angular/core';
import { EmailJob } from '../../models/EmailJob';
import { EmailJobService } from '../../services/emailJobService/email-job';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { Repetition } from '../../models/Repetition';
import { RepetitionService } from '../../services/repetitionService/repetition';
import { AuthService } from '../../services/authService/auth-service';

@Component({
  selector: 'app-email-job-component',
  imports: [RouterOutlet, NgForOf, CommonModule, FormsModule],
  templateUrl: './email-job-component.html',
  styleUrl: './email-job-component.css',
})
export class EmailJobComponent implements OnInit {
  [x: string]: any;
  public emailJobs: EmailJob[];
  public repetitions: Repetition[];
  public repetitives: String[];
  public deletedEmailJob: EmailJob = {} as EmailJob;
  public editEmailJob: EmailJob = {} as EmailJob;
  public emailJobFound: boolean = true;

  constructor(private emailJobService: EmailJobService, private repetititonService: RepetitionService, private authService: AuthService) {
    this.emailJobs = [];
    this.repetitions = [];
    this.repetitives = ["ONETIME", "REPETITIVE"]
  }
  ngOnInit() {
    this.getEmailJobs();
    this.getRepetition();
  }
  public getEmailJobs(): void {
    const loggedUser = this.authService.getLoggedInUser();
    if (!loggedUser) {
        console.error('No logged in user found');
        return;
    }
      const userUuid = loggedUser.uuid; 
    this.emailJobService.getEmailJobsForAcc(userUuid).subscribe(

      (response: EmailJob[]) => {
        response.forEach(emailjob => emailjob.emailsTo = emailjob.emailTo.split(',').map(email => email.trim()))
        this.emailJobs = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  public getRepetition(): void {
    this.repetititonService.getRepetition().subscribe(
      (response: Repetition[]) => {
        this.repetitions = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  public onAddEmailJob(addForm: NgForm): void {
    document.getElementById('add-emailJob-form')?.click();

    const formValue = addForm.value;
    const startDate = new Date(formValue.dateSend);
    startDate.setUTCHours(0, 1, 0, 0);

    const dueDate = new Date(formValue.dateDue);
    dueDate.setUTCHours(23, 59, 0, 0);

    const emailJob = {
      subject: formValue.subject,
      message: formValue.message,
      emailTo: formValue.emailTo,
      dateSend: startDate,
      dateDue: dueDate,
      timeToSent: formValue.timeToSent,
      repetition: formValue.repetitionObject,
      repetitive: formValue.repetitionString
    };
    const loggedUser = this.authService.getLoggedInUser();
    if (!loggedUser) {
        console.error('No logged in user found');
        return;
    }
      const userUuid = loggedUser.uuid; 
      this.emailJobService.addEmailJob(userUuid, emailJob).subscribe( 
        (response: string) => {
          console.log(response);
          this.getEmailJobs();
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
            html: `<b style="font-size: 20px;">Email job can't be added!</b><br> <i>${error.error}</i>`,
            confirmButtonText: 'OK'
          });
        }
      );
  }
  public onDeleteEmail(id: string): void {
    this.emailJobService.deleteEmailJob(id).subscribe(
      () => {
        this.getEmailJobs();
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted",
          html: `<b style="font-size: 20px;">Email job deleted successfully</b>`,
          confirmButtonText: 'OK'
        });
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Email job can't be delleted!</b><br><i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onEditEmailJob(editForm: NgForm, id: string): void {
    document.getElementById('edit-email-form')?.click();

    const formValue = editForm.value;
    const startDate = new Date(formValue.dateSend);
    startDate.setUTCHours(0, 1, 0, 0);

    const dueDate = new Date(formValue.dateDue);
    dueDate.setUTCHours(23, 59, 0, 0);

    const emailJob = {
      subject: formValue.subject,
      message: formValue.message,
      emailTo: formValue.emailTo,
      dateSend: startDate,
      dateDue: dueDate,
      timeToSent: formValue.timeToSent,
      repetition: formValue.repetitionObject,
      repetitive: formValue.repetitionString
    };
    const loggedUser = this.authService.getLoggedInUser();
    if (!loggedUser) {
        console.error('No logged in user found');
        return;
    }
      const userUuid = loggedUser.uuid; 

    this.emailJobService.editEmailJob(userUuid, id, emailJob).subscribe( 
      () => {
        this.getEmailJobs();
        Swal.fire({
          icon: "success",
          title: "Succesfully Edited",
          html: '<b style="font-size: 20px;">You have successfully eddited this email job!</b>',
          confirmButtonText: 'OK'
        })
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
  public searchEmailJob(key: string): void {
    const results: EmailJob[] = [];
    for (const emailJob of this.emailJobs) {
      if (emailJob.subject.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || emailJob.message.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || emailJob.emailTo.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || emailJob.uuid.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(emailJob);
        this.emailJobFound = true;
      }
    }
    this.emailJobs = results;
    if (!key) {
      this.getEmailJobs();
    }
    if (results.length === 0 || !key) {
      this.emailJobFound = false;
    }
  }
  public onActiveDeactive(setForm: NgForm): void {
    document.getElementById('set-active-deactive-emailJob-form')?.click();
    this.emailJobService.setJobActiveOrDeactive(this.editEmailJob.uuid, setForm.value).subscribe(
      () => {
        this.getEmailJobs();
        Swal.fire({
          icon: "success",
          title: "Succesfully Edited",
          html: '<b style="font-size: 20px;">You have successfully eddited this email job!</b>',
          confirmButtonText: 'OK'
        })
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
  public onRepeatEmailJob(addForm: NgForm): void {
    document.getElementById('repear-emailJob-form')?.click();

    const formValue = addForm.value;
    const startDate = new Date(formValue.dateSend);
    startDate.setUTCHours(0, 1, 0, 0);

    const dueDate = new Date(formValue.dateDue);
    dueDate.setUTCHours(23, 59, 0, 0);

    const emailJob = {
      dateSend: startDate,
      dateDue: dueDate,
      timeToSent: formValue.timeToSent
    };
    const loggedUser = this.authService.getLoggedInUser();
    if (!loggedUser) {
        console.error('No logged in user found');
        return;
    }
      const userUuid = loggedUser.uuid; 
    this.emailJobService.repeatEmailJob(userUuid, this.editEmailJob.uuid, emailJob).subscribe( 
      (response: string) => {
        console.log(response);
        this.getEmailJobs();
        addForm.reset();
        Swal.fire({
          icon: "success",
          title: "Succesfully repeated",
          html: `<b style="font-size: 20px;">${response}</b>`,
          confirmButtonText: 'OK'
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Email job can't be repeated!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onDeleteAllEmailJobs() {
    const loggedUser = this.authService.getLoggedInUser();
    if (!loggedUser) {
        console.error('No logged in user found');
        return;
    }
      const userUuid = loggedUser.uuid; 
    this.emailJobService.deleteAllForAcc(userUuid).subscribe(
      () => {
        this.getEmailJobs();
        Swal.fire({
          icon: "success",
          title: "Succesfully repeated",
          html: `<b style="font-size: 20px;">Successfully deleted all email jobs!</b>`,
          confirmButtonText: 'OK'
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Email job can't be repeated!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onOpenModal(emailJob: EmailJob, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmailJobModal');
    }

    if (mode === 'delete') {
      this.deletedEmailJob = emailJob;
      button.setAttribute('data-target', '#deleteEmailModal');
    }

    if (mode === 'deleteAll') {
      button.setAttribute('data-target', '#deleteAllEmailModal');
    }

    if (mode === 'edit') {
      this.editEmailJob = emailJob;
      button.setAttribute('data-target', '#updateEmailJobModal');
    }

    if (mode === 'setActive') {
      this.editEmailJob = emailJob;
      button.setAttribute('data-target', '#editActiveEmailJobModal');
    }

    if (mode === 'repeat') {
      this.editEmailJob = emailJob;
      button.setAttribute('data-target', '#repeatEmailJobModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
