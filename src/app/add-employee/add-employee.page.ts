import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  credentials: FormGroup;
  constructor(private fb: FormBuilder,public toastController: ToastController, private userService: UserService,private router: Router,) {}
  ngOnInit() {
    this.credentials = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]],
    });
  }
  onSubmit() {
    console.log(this.credentials.value);
    if (!this.credentials.valid) {
      this.warning();
      return false;
    }
    this.userService.createEmployee(this.credentials.value).subscribe(
      async (res) => {
        console.log('rest', res);
        this.router.navigateByUrl('/manage', { replaceUrl: true });
        this.notification();
      }
    );
  }
  async notification() {
    const toast = await this.toastController.create({
      message: 'Your employee have been saved.',
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
