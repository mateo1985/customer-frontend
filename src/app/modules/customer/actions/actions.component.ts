import { Component, OnInit } from '@angular/core';
import {CustomerModel} from '../customer-model';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {

  constructor(private actionsService: CustomerService) { }

  add() {
    this.actionsService.addEditModal(<CustomerModel>Object.assign({}, this.emptyUser()));
  }

  refresh() {
    this.actionsService.getFromEndpoint();
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
