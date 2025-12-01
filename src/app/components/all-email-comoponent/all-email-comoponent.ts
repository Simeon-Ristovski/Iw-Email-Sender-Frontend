import { Component } from '@angular/core';
import { EmailJob } from '../../models/EmailJob';
import { EmailJobService } from '../../services/emailJobService/email-job';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-email-comoponent',
  imports: [RouterOutlet, NgForOf, CommonModule, FormsModule],
  templateUrl: './all-email-comoponent.html',
  styleUrl: './all-email-comoponent.css',
})
export class AllEmailComoponent {
 [x: string]: any;
  public emailJobs: EmailJob[];
  constructor(private emailJobService: EmailJobService) {
    this.emailJobs = [];
  }
  ngOnInit() {
    this.getEmailJobs();
  }
  public getEmailJobs(): void {
    this.emailJobService.getEmailJobs().subscribe(

      (response: EmailJob[]) => {
        response.forEach(emailjob => emailjob.emailsTo = emailjob.emailTo.split(',').map(email => email.trim()))
        this.emailJobs = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
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
      }
    }
    this.emailJobs = results;
    if (!key) {
      this.getEmailJobs();
    }
  }
}
