import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
  export class LoginPage implements OnInit {
    credentials: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required, Validators.minLength(5)]],
    });
  }

  async login() {
    console.log(this.credentials.value)
    this.userService.login(this.credentials.value.username,this.credentials.value.password).subscribe(
     
      async (res) => {
        console.log("res", res)
        
        sessionStorage.setItem('login', "true"); 
        
        //this.router.navigateByUrl('/home', { replaceUrl: true });
       
        console.log("login2",localStorage['login'])

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/listing';
          this.router.navigateByUrl(returnUrl).then(() => {
           // navigator.location.reload();
            this.router.navigate([returnUrl]);
          });
      })

  }

}
