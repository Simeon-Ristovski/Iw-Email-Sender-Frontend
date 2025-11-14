import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ExceptionEntityService } from '../../services/exceptionEntityService/exception-entity';
import { ExceptionEntity } from '../../models/ExceptionEntity';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exception-component',
  imports: [RouterOutlet, NgForOf, CommonModule, FormsModule],
  templateUrl: './exception-component.html',
  styleUrl: './exception-component.css',
})
export class ExceptionComponent implements OnInit{
  public exceptions:ExceptionEntity[]=[];
  public deleteException:ExceptionEntity  = {} as ExceptionEntity;

  constructor(private exceptionEntityService:ExceptionEntityService){}
  ngOnInit(): void {
    this.getExceptions();
  }
  public getExceptions():void{
    this.exceptionEntityService.getExceptions().subscribe(
       (response: ExceptionEntity[]) => {
        this.exceptions = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public onDeleteException(uuid: string) {
      this.exceptionEntityService.deleteExceptionEntity(uuid).subscribe(
        () => {
          this.getExceptions();
          Swal.fire({
            icon: "success",
            title: "Successfully Deleted",
            html: `<b style="font-size: 20px;">Exception deleted successfully</b>`,
            confirmButtonText: 'OK'
          });
        }, (error: HttpErrorResponse) => {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            html: `<b style="font-size: 20px;">Exception can't be delleted!</b><br><i>${error.error}</i>`,
            confirmButtonText: 'OK'
          });
        }
      );
    }
 public searchException(key: string): void {
    const results: ExceptionEntity[] = [];
    for (const exception of this.exceptions) {
      if (exception.uuid.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || exception.message.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || exception.jobUUUID.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(exception);
      }
    }
    this.exceptions = results;
    if (!key) {
      this.getExceptions();
    }
  }
 public onOpenModalException(exception: ExceptionEntity, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
  
    if (mode === 'delete') {
      this.deleteException = exception;
      button.setAttribute('data-target', '#deleteExceptionModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
