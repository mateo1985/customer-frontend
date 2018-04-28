import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {MaterialModule} from '../material/material.module';
import {CustomerApiService} from './services/customer-api.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { ActionsComponent } from './actions/actions.component';
import {CustomerService} from './services/customer.service';

@NgModule({
  imports: [
    CommonModule, MaterialModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule
  ],
  providers: [CustomerApiService, CustomerService],
  declarations: [CustomerListComponent, AddEditModalComponent, CustomerMainComponent, ActionsComponent],
  entryComponents: [AddEditModalComponent]
})
export class CustomerModule { }
