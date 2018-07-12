import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';

const appRoutes: Routes = [
  {path:'',redirectTo:'/emp',pathMatch:'full'},
  {path:'emp', component: EmployeeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
