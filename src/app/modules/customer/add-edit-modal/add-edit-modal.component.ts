import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationLogger} from '../../common/logger.service';
import {CustomerService} from '../services/customer.service';
import {CustomerApiService} from '../services/customer-api.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})
export class AddEditModalComponent {
  private static readonly PhoneRegexRule = `^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$`;
  private static readonly NameValidationRule = `[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*`;
  customerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEditModalComponent>,
              public customerService: CustomerApiService,
              private fb: FormBuilder,
              private appLogger: ApplicationLogger,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.customerForm = this.fb.group({
      name: [ data.name,
        [Validators.required, Validators.minLength(2), Validators.pattern(AddEditModalComponent.NameValidationRule)]],
      surname: [ data.surname,
        [Validators.required, Validators.minLength(2), Validators.pattern(AddEditModalComponent.NameValidationRule)]],
      address: [ data.address,
        [Validators.required, Validators.minLength(2)]],
      telephoneNumber: [ data.telephoneNumber,
        [Validators.required, Validators.minLength(2), Validators.pattern(AddEditModalComponent.PhoneRegexRule)]],
    });
  }

  onNoClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  saveUser() {
    this.customerForm.updateValueAndValidity({
      emitEvent: true
    });
    if (this.customerForm.valid) {
      const customer = {
        id: this.data.id,
        name: this.customerForm.get('name').value,
        surname: this.customerForm.get('surname').value,
        address: this.customerForm.get('address').value,
        telephoneNumber: this.customerForm.get('telephoneNumber').value
      };

      if (this.data.id) {
        this.customerService.edit(customer).then((r) => {
          this.appLogger.LogInfo(`Customer ${r.id} modified`);
          this.dialogRef.close(r);
        }).catch(err => {
          this.appLogger.LogError(err);
        });
      } else {
        this.customerService.add(customer).then((r) => {
          this.appLogger.LogInfo(`Customer ${r.id} added`);
          this.dialogRef.close(r);
        }).catch(err => {
          this.appLogger.LogError(err);
        });
      }


    }
  }

  submit(event) {
    // TODO: intentionally do nothing
  }

}
