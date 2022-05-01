import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { UserService } from '../api/user.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  modalDataResponse: any;
  employee=null;
  login_verify = false;
  constructor(
    private userService: UserService,
    private menu: MenuController,public toastController: ToastController,
    public alertController: AlertController,private router: Router, public modalCtrl: ModalController ){}
    ngOnInit() {
      console.log("tooo");
      console.log(this.login_verify);
      this.login_verify  = Boolean(sessionStorage.getItem('login'));
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
        async addEmployee() {
          this.router.navigateByUrl('/add-employee', { replaceUrl: true });
        }
        async presentAlertConfirm(emp) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirmation!',
            message: '<strong>Do you want to delete this Employee?</strong>!!!',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                id: 'cancel-button',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Okay',
                id: 'confirm-button',
                handler: () => {
                  console.log('Confirm Okay');
                  this.userService.deleteEmployees(emp.id).subscribe(
                    async (res) => {
                      this.notification();
                      this.userService.getEmployees()
                        .pipe(first())
                        .subscribe(employees => this.employee = employees);
                      });
                  }
              }
            ]
          });
         await alert.present();
        }

        async presentUpdateConfirm(emp) {

          this.router.navigateByUrl('/update-employee',{ state: { emp:emp}});


        }

        delete(emp){
          this.presentAlertConfirm(emp);
        }
        update(emp){
          this.router.navigateByUrl('/update-employee',{ state: { emp:emp},replaceUrl: true});


        }
        async notification() {
          const toast = await this.toastController.create({
            message: 'Your employee have been deleted.',
            duration: 4000,
            icon: 'information-circle',
            position: 'top',
            color: 'success'
          });
          toast.present();
        }
}
