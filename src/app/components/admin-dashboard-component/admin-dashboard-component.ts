import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Status } from '../../models/Status';
import { Role } from '../../models/Role';
import { Repetition } from '../../models/Repetition';
import { StatusService } from '../../services/statusService/status';
import { RoleService } from '../../services/roleService/role';
import { RepetitionService } from '../../services/repetitionService/repetition';
import { HttpErrorResponse } from '@angular/common/http';
import { __makeTemplateObject } from 'tslib';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard-component',
  imports: [RouterOutlet, NgForOf, CommonModule, FormsModule],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.css',
})
export class AdminDashboardComponent implements OnInit {

  public statuses: Status[] = [];
  public repetitions: Repetition[] = [];
  public roles: Role[] = [];
  public roleFound:boolean=true;
  public statusFound:boolean=true;
  public repetitionFound:boolean=true;
  public deletedRole: Role = {} as Role;
  public deletedStatus: Status = {} as Status;
  public deletedRepetition: Repetition = {} as Repetition;

  constructor(private statusService: StatusService, private repetititonService: RepetitionService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.getRepetition();
    this.getRoles();
    this.getStatuses();
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
  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  public getStatuses(): void {
    this.statusService.getStatuses().subscribe(
      (response: Status[]) => {
        this.statuses = response;
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  public searchEverything(key: string): void {
    const resultsRoles: Role[] = [];
    for (const role of this.roles) {
      if (role.roleName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        resultsRoles.push(role);
        this.roleFound = true;
      }
    }
    this.roles = resultsRoles;
    if (!key) {
      this.getRoles();
    }
    if (resultsRoles.length === 0 || !key) {
      this.roleFound = false;
    }
    const resultsStatuses: Status[] = [];
    for (const status of this.statuses) {
      if (status.statusName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        resultsStatuses.push(status);
        this.statusFound = true;
      }
    }
    this.statuses = resultsStatuses;
    if (!key) {
      this.getStatuses();
    }
    if (resultsStatuses.length === 0 || !key) {
      this.roleFound = false;
    }
    const resultsRepetition: Repetition[] = [];
    for (const repetition of this.repetitions) {
      if (repetition.repetitionName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        resultsRepetition.push(repetition);
        this.repetitionFound = true;
      }
    }
    this.repetitions = resultsRepetition;
    if (!key) {
      this.getRepetition();
    }
    if (resultsRepetition.length === 0 || !key) {
      this.roleFound = false;
    }
  }
//Role
  public onAddRole(addForm: NgForm) {
    document.getElementById('add-role-form')?.click();
    this.roleService.addRole(addForm.value).subscribe(
      (response: string) => {
        console.log(response);
        this.getRoles();
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
          html: `<b style="font-size: 20px;">Role can't be added!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onDeleteRole(uuid: string) {
    this.roleService.deleteRole(uuid).subscribe(
      () => {
        this.getRoles();
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted",
          html: `<b style="font-size: 20px;">Role deleted successfully</b>`,
          confirmButtonText: 'OK'
        });
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Role can't be delleted!</b><br><i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onOpenModalRole(role: Role, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addRoleModal');
    }

    if (mode === 'delete') {
      this.deletedRole = role;
      button.setAttribute('data-target', '#deleteRoleModal');
    }
    container?.appendChild(button);
    button.click();
  }
//Status
  public onAddStatus(addForm: NgForm) {
    document.getElementById('add-status-form')?.click();
    this.statusService.addStatus(addForm.value).subscribe(
      (response: string) => {
        console.log(response);
        this.getStatuses();
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
          html: `<b style="font-size: 20px;">Status can't be added!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onDeleteStatus(uuid: string) {
    console.log(uuid);
    this.statusService.deleteStatus(uuid).subscribe(
      () => {
        this.getStatuses();
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted",
          html: `<b style="font-size: 20px;">Status deleted successfully</b>`,
          confirmButtonText: 'OK'
        });
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Status can't be delleted!</b><br><i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onOpenModalStatus(status: Status, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addStatusModal');
    }
    if (mode === 'delete') {
      this.deletedStatus = status;
      button.setAttribute('data-target', '#deleteStatusModal');
    }
    container?.appendChild(button);
    button.click();
  }
//Repetition
  public onAddRepetition(addFormRepetition: NgForm) {
    document.getElementById('add-repetition-form')?.click();
    this.repetititonService.addRepetition(addFormRepetition.value).subscribe(
      (response: string) => {
        console.log(response);
        this.getRepetition();
        addFormRepetition.reset();
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
          html: `<b style="font-size: 20px;">Repetition can't be added!</b><br> <i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onDeleteRepetition(uuid: string) {
    console.log(uuid);
    this.repetititonService.deleteRepetition(uuid).subscribe(
      () => {
        this.getRepetition();
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted",
          html: `<b style="font-size: 20px;">Repetition deleted successfully</b>`,
          confirmButtonText: 'OK'
        });
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          html: `<b style="font-size: 20px;">Repetition can't be delleted!</b><br><i>${error.error}</i>`,
          confirmButtonText: 'OK'
        });
      }
    );
  }
  public onOpenModalRepetition(repetition: Repetition, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRepetitionModal');
    }
    if (mode === 'delete') {
      this.deletedRepetition = repetition;
      button.setAttribute('data-target', '#deleteRepetitionModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
