import { Injectable } from '@angular/core';
import {CustomerModel} from '../customer-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class CustomerApiService {

  private static readonly CustomerApi = environment.customerApi;

  constructor(private httpClient: HttpClient) {
  }

  public get(): Promise<CustomerModel[]> {
    return (this.httpClient.get<CustomerModel[]>(CustomerApiService.CustomerApi).toPromise() as Promise<CustomerModel[]>);
  }

  public delete(id: number): Promise<any> {
    return this.httpClient.delete(`${CustomerApiService.CustomerApi}/${id}`, {}).toPromise();
  }

  public add(customer: CustomerModel): Promise<any> {
    return this.httpClient.post(`${CustomerApiService.CustomerApi}`, customer).toPromise();
  }

  public edit(customer: CustomerModel): Promise<any> {
      return this.httpClient.put(`${CustomerApiService.CustomerApi}/${customer.id}`, customer).toPromise();
  }
}
