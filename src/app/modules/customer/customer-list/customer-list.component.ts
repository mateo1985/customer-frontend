import { Component } from '@angular/core';
import {CustomerModel} from '../customer-model';
import {MatTableDataSource} from '@angular/material';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  displayedColumns = ['name', 'surname', 'telephoneNumber', 'address', 'remove', 'edit'];
  dataSource = null;

  constructor(private customerService: CustomerService) {
    this.customerService.onChanged.subscribe(this.refreshDataSource.bind(this));
    this.refresh();
  }

  remove(id: number) {
    this.customerService.delete(id);
  }

  edit(customer: CustomerModel) {
    this.customerService.addEditModal(customer);
  }

  private refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.customerService.customers);
  }

  private refresh() {
    this.customerService.getFromEndpoint();
  }
}
