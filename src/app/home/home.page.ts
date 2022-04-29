import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../api/user.service';
import { first } from 'rxjs/operators';

export interface Data {
  employee: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  employee=null;
  login=false



  constructor(
    private userService: UserService  ){}
    ngOnInit() {
      this.userService.getEmployees()
          .pipe(first())
          .subscribe(employees => this.employee = employees);
          //this.login =Boolean(localStorage.getItem("login"));
          const user = this.userService.userValue;
          console.log("user",user);
          console.log("login",this.login)

  }
  async logout() {
    this.login=false
    sessionStorage.removeItem('login');
    }

    
}