import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
  export class LoginPage implements OnInit {
    credentials: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router,) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required, Validators.minLength(5)]],
    });
  }

  async login() {
    console.log(this.credentials.value);
    this.userService.login(this.credentials.value.username,this.credentials.value.password).subscribe(
      async (res) => {
        console.log('rest', res);
        this.router.navigateByUrl('/home', { replaceUrl: true });
        sessionStorage['login'] = true;
        /*await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });
        await alert.present();*/
      });
  }
}
