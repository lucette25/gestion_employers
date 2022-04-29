import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  credentials: FormGroup;
  employee=null;
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) { 
    
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],

    });

    this.userService.getEmployees()
    .pipe(first())
    .subscribe(employees => this.employee = employees);

    
    
  }
 

  
 
  async create() {
    console.log(this.credentials.value)
    this.userService.createEmployee(this.credentials.value).subscribe(
     
      async (res) => {
        console.log("res", res)
        
      }) 
    }
}
