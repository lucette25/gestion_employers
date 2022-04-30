import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../api/user.service';
import { first } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  check = false;
  login_verify = false;
  constructor(private userService: UserService, private menu: MenuController,private router: Router ){}
  ngOnInit() {
    if(sessionStorage.getItem('login') === 'true'){
      this.login_verify = true;
    }
    this.userService.getEmployees()
      .pipe(first())
      .subscribe(employees => this.employee = employees);
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  public login(){
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  public logout(){
    sessionStorage.removeItem('login');
    sessionStorage.setItem('login', 'false');
    this.login_verify = false;
    this.menu.close();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
  public manage(){
    this.router.navigateByUrl('/manage', { replaceUrl: true });
  }
}
