import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.page.html',
  styleUrls: ['./update-employee.page.scss'],
})
export class UpdateEmployeePage implements OnInit {
  credentials: FormGroup;
  empId=null
  constructor(private fb: FormBuilder,public toastController: ToastController, private userService: UserService,private router: Router,) {}

  ngOnInit() {
    this.empId=history.state.emp.id

    
    this.credentials = this.fb.group({
      first_name: [history.state.emp.first_name, [Validators.required]],
      last_name: [history.state.emp.last_name, Validators.required],
      email: [history.state.emp.email, [Validators.required , Validators.email]],
    });
  }

  onSubmit() {
    console.log(this.credentials.value);
    if (!this.credentials.valid) {
      this.warning();
      return false;
    }
    this.userService.updateEmployees(this.empId,this.credentials.value).subscribe(
      async (res) => {
        console.log('rest2', res);

       // this.router.navigateByUrl('/manage', { replaceUrl: true });
        this.router.navigateByUrl('/manage', {skipLocationChange: true}).then(() => {
          this.router.navigate(["/manage"]);
          });
        this.notification();
      }
    );

  }
  async notification() {
    const toast = await this.toastController.create({
      message: 'Your employee have been update.',
      duration: 4000,
      icon: 'information-circle',
      position: 'top',
      color: 'success'
    });
    toast.present();
  }
  async warning() {
    const toast = await this.toastController.create({
      message: 'All fields are required.',
      duration: 4000,
      icon: 'information-circle',
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
