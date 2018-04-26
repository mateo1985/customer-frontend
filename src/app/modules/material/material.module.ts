import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }
