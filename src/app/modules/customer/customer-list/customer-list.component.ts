import { Component, OnInit } from '@angular/core';
import {CustomerModel} from '../customer-model';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {CustomerService} from '../services/customer.service';
import {AddEditModalComponent} from '../add-edit-modal/add-edit-modal.component';
import {ApplicationLogger} from '../../common/logger.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private static readonly UserModalWidth = '450px';
  displayedColumns = ['name', 'surname', 'telephoneNumber', 'address', 'remove', 'edit'];
  dataSource = null;

  constructor(public customerService: CustomerService,
              public dialog: MatDialog,
              private appLogger: ApplicationLogger) {
    this.refresh();
  }

  ngOnInit() {
  }

  remove(id: number) {
    this.customerService.deleteCustomers(id).then(() => {
      this.refreshDataSource();
    });
  }

  add() {
    this.createDialog(<CustomerModel>Object.assign({}, this.emptyUser()))
      .then(() => {
        this.appLogger.LogInfo(`Customer added`);
      });

  }

  edit(customer: CustomerModel) {
    this.createDialog(customer)
      .then(() => {
        this.appLogger.LogInfo(`Customer modified`);
      });
  }

  private refresh() {
    this.customerService.getCustomers().then(() => {
      this.refreshDataSource();
    });
  }

  private refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.customerService.customers);
  }

  private createDialog(customer: CustomerModel): Promise<void> {
    const dialogRef: MatDialogRef<AddEditModalComponent> = this.dialog.open(AddEditModalComponent, <any>{
      width: CustomerListComponent.UserModalWidth,
      data: <CustomerModel>Object.assign({}, customer)
    });
    return dialogRef.afterClosed()
      .toPromise()
      .then(() => {
        this.refreshDataSource();
      });
  }

  private emptyUser(): CustomerModel {
    return {
      id: undefined,
      name: '',
      surname: '',
      address: '',
      telephoneNumber: ''
    };
  }
}
