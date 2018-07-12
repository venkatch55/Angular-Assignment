import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../models/emp';
import { Http, Response } from '@angular/http'
import { AppConstants } from '../base/appconstants';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empForm: FormGroup;
  empList: Array<Employee> = new Array<Employee>();
  isEdit : boolean = false;
  submitValue: string = 'Submit';

  constructor(private fb: FormBuilder, private http: Http) { 
    this.createForm();
  }

  ngOnInit() {
    this.getAllEmps();
  }

  createForm() {
    this.empForm = this.fb.group({
      _id : [''],
      firstName : [''],
      lastName: [''],
      email: [''],
      age: [''],
      gender: [''],
      mobile: [''],
      company: [''],
      address: [''],
    })

  }

  onSubmit(empObj: Employee) {
    if(this.isEdit) {
      console.log("update obj....",JSON.stringify(empObj));
      let url = `${AppConstants.EMPLOYEES}${empObj._id}`;
      delete empObj._id;
      this.updateEmp(url,empObj);
    }
    else {
      console.log("empObj....",JSON.stringify(empObj));
      delete empObj._id;
      this.saveEmp(empObj);
      // this.empList.push(empObj);
      
    }
  }

  editEmp(index:number, empObj: Employee) {
    console.log("edit index....",index);
    console.log("edit emp obj...",JSON.stringify(empObj));
    this.isEdit = true;
    this.submitValue = "Update";
    this.empForm.patchValue(empObj);
  }

  deleteEmp(index:number, empObj: Employee) {
    console.log("delete index....",index);
    console.log("delete emp obj...",JSON.stringify(empObj));
    let url = `${AppConstants.EMPLOYEES}${empObj._id}`;
    this.delEmp(url);

  }

  resetFlag() {
    console.log("inside reset flag...");
    this.isEdit = false;
    this.submitValue = "Submit";
    this.empForm.reset();
  }

  getAllEmps() {
    this.http.get(AppConstants.EMPLOYEES).toPromise().then((respObj: Response) => {
      if(respObj.status === 200) {
        this.empList = respObj.json();
      }
        
    }).catch((err) => {
       // handle errors
    });
  }

  saveEmp(empObj) {
    this.http.post(AppConstants.EMPLOYEES,empObj).toPromise().then((respObj:Response) => {
       if(respObj.status === 200) {
        this.empForm.reset();
         this.getAllEmps();
         
       }
    }).catch((err) => {
      console.log("handle error....");
    });
  }

  updateEmp(url, empObj) {
    this.http.put(url,empObj).toPromise().then((respObj:Response) => {
      if(respObj.status === 200) {
        this.isEdit = false;
        this.submitValue = "Submit";
        this.empForm.reset();
        this.empForm.reset();
        this.getAllEmps();
        
      }
   }).catch((err) => {
     console.log("handle error....");
   });
  }

  delEmp(url) {
    this.http.delete(url).toPromise().then((respObj:Response) => {
      if(respObj.status === 200) {
       this.empForm.reset();
        this.getAllEmps();
        
      }
   }).catch((err) => {
     console.log("handle error....");
   });
  }

}
