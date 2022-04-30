import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEmployeePageRoutingModule } from './update-employee-routing.module';

import { UpdateEmployeePage } from './update-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateEmployeePageRoutingModule,
    ],
  declarations: [UpdateEmployeePage]
})
export class UpdateEmployeePageModule {}
