import {EventEmitter, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CustomerModel} from '../customer-model';
import {AddEditModalComponent} from '../add-edit-modal/add-edit-modal.component';
import {CustomerApiService} from './customer-api.service';

/**
 * Service for customer interactions with endpoint api
 */
@Injectable()
export class CustomerService {
  private static readonly ModalWidth = '450px';
  public customers: CustomerModel[] = [];
  public onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
              private customerApiService: CustomerApiService) {
  }

  /**
   * Shows the add/edit user modal window
   * @param customer
   * @returns {Promise<TResult>|Promise<TResult|undefined|R>|Promise<undefined|R>|Promise<TResult2|TResult1>}
   */
  public addEditModal(customer: CustomerModel): Promise<void> {
    const dialogRef: MatDialogRef<AddEditModalComponent> = this.dialog.open(AddEditModalComponent, <any>{
      width: CustomerService.ModalWidth,
      data: <CustomerModel>Object.assign({}, customer)
    });
    return dialogRef.afterClosed()
      .toPromise()
      .then((result: CustomerModel) => {
        if (!result) {
          return;
        }

        if (customer.id) {
          return this.editLocal(result);
        } else {
          return this.addLocal(result);
        }
      });
  }

  /**
   * Gets data from endpoint
   * @returns {Promise<CustomerModel[]>}
   */
  public getFromEndpoint(): Promise<CustomerModel[]> {
    return this.customerApiService.get()
      .then((customers: CustomerModel[]) => {
        this.customers = customers;
        this.refresh();
        return customers;
      });
  }

  /**
   * Deletes customer
   * @param id
   * @returns {Promise<any>}
   */
  public delete(id: number): Promise<void> {
    return this.customerApiService.delete(id)
      .then(() => {
        this.customers = this.customers.filter(x => x.id !== id);
        this.refresh();
      });
  }

  /**
   * Adds user
   * @param customer
   * @returns {Promise<any>}
   */
  public add(customer: CustomerModel): Promise<void> {
    return this.customerApiService.add(customer)
      .then(this.addLocal.bind(this));
  }

  /**
   * Edit user
   * @param customer
   * @returns {Promise<any>}
   */
  public edit(customer: CustomerModel): Promise<void> {
    return this.customerApiService.edit(customer)
      .then(this.editLocal.bind(this));
  }

  private addLocal(customer: CustomerModel) {
    this.customers.push(<CustomerModel>customer);
    this.refresh();
  }

  private editLocal(customer: CustomerModel) {
    const updatedUser: CustomerModel = this.customers.find(x => x.id === customer.id);
    if(updatedUser) {
      updatedUser.telephoneNumber = customer.telephoneNumber;
      updatedUser.address = customer.address;
      updatedUser.name = customer.name;
      updatedUser.surname = customer.surname;
      this.refresh();
    }
  }

  private refresh()  {
    this.onChanged.emit();
  }

}
