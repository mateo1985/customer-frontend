import {EventEmitter, Injectable} from '@angular/core';
import {CustomerModel} from '../customer-model';

/**
 * Service for customer interactions with endpoint api
 */
@Injectable()
export class CustomerServiceMock {
  public customers: CustomerModel[] = [];
  public onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  public addEditModal(customer: CustomerModel): Promise<void> {
    return Promise.resolve();
  }

  public getFromEndpoint(): Promise<CustomerModel[]> {
    return Promise.resolve([]);
  }

  public delete(id: number): Promise<void> {
    return Promise.resolve();
  }

  public add(customer: CustomerModel): Promise<void> {
    return Promise.resolve();
  }

  public edit(customer: CustomerModel): Promise<void> {
    return Promise.resolve();
  }
}
