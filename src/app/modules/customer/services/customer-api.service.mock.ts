import { Injectable } from '@angular/core';
import {CustomerModel} from '../customer-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class CustomerApiServiceMock {

  private static readonly CustomerApi = environment.customerApi;

  constructor() {
  }

  public get(): Promise<CustomerModel[]> {
    return Promise.resolve([]);
  }

  public delete(id: number): Promise<void> {
    return Promise.resolve();
  }

  public add(customer: CustomerModel): Promise<any> {
    return Promise.resolve();
  }

  public edit(customer: CustomerModel): Promise<any> {
    return Promise.resolve();
  }
}
