import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
