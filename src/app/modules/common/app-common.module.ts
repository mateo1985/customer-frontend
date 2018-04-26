import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicationLogger} from './logger.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ApplicationLogger
  ],
  declarations: []
})
export class AppCommonModule { }
