import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerService} from '../services/customer.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationLogger} from '../../common/logger.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})
export class AddEditModalComponent {
  customerForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<AddEditModalComponent>,
              public customerService: CustomerService,
              private fb: FormBuilder,
              private appLogger: ApplicationLogger,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.customerForm = this.fb.group({
      name: [ data.name, [Validators.required, Validators.minLength(2)]],
      surname: [ data.surname, [Validators.required, Validators.minLength(2)]],
      address: [ data.address, [Validators.required, Validators.minLength(2)]],
      telephoneNumber: [ data.telephoneNumber, [Validators.required, Validators.minLength(2)]],

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.customerForm.updateValueAndValidity({
      emitEvent: true
    });
    if (this.customerForm.valid) {
      const customerResult = {
        id: this.data.id,
        name: this.customerForm.get('name').value,
        surname: this.customerForm.get('surname').value,
        address: this.customerForm.get('address').value,
        telephoneNumber: this.customerForm.get('telephoneNumber').value
      };

      if (this.data.id) {
        this.customerService.editCustomer(customerResult).then(() => {

          this.dialogRef.close(customerResult);
        }).catch(err => {
          this.appLogger.LogError(err);
        });
      } else {
        this.customerService.addCustomer(customerResult).then(() => {
          this.dialogRef.close(customerResult);
        }).catch(err => {
          this.appLogger.LogError(err);
        });
      }


    }
  }

  submit() {


  }

}
