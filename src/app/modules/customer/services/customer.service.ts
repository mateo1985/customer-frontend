import { Injectable } from '@angular/core';
import {CustomerModel} from '../customer-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class CustomerService {
  public customers: CustomerModel[] = [];
  private static readonly CustomerApi = environment.customerApi;

  constructor(private httpClient: HttpClient) {
  }

  public getCustomers(): Promise<CustomerModel[]> {
    return (this.httpClient.get<CustomerModel[]>(CustomerService.CustomerApi).toPromise() as Promise<CustomerModel[]>)
      .then((customers: CustomerModel[]) => {
        this.customers = customers;
        return customers;
      });
  }

  public deleteCustomers(id: number): Promise<any> {
    return this.httpClient.delete(`${CustomerService.CustomerApi}/${id}`, {}).toPromise()
      .then(() =>{
        this.customers = this.customers.filter(x => x.id !== id);
      });
  }

  public addCustomer(customer: CustomerModel): Promise<any> {
    return this.httpClient.post(`${CustomerService.CustomerApi}`, customer).toPromise().then((resultCutomer) => {
      this.customers.push(<CustomerModel>resultCutomer);
    });
  }

  public editCustomer(customer: CustomerModel): Promise<any> {
      return this.httpClient.put(`${CustomerService.CustomerApi}/${customer.id}`, customer).toPromise()
        .then(() => {
          const updatedUser: CustomerModel = this.customers.find(x => x.id === customer.id);
          if(updatedUser) {
            updatedUser.telephoneNumber = customer.telephoneNumber;
            updatedUser.address = customer.address;
            updatedUser.name = customer.name;
            updatedUser.surname = customer.surname;
          }
        });
  }
}
