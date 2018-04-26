import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';
import {MaterialModule} from '../material/material.module';
import {CustomerService} from './services/customer.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, MaterialModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule
  ],
  providers: [CustomerService],
  declarations: [CustomerListComponent, CustomerComponent, AddEditModalComponent],
  entryComponents: [AddEditModalComponent]
})
export class CustomerModule { }
