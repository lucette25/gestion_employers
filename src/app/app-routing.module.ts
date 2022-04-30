import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then( m => m.ManagePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'update-employee',
    loadChildren: () => import('./update-employee/update-employee.module').then( m => m.UpdateEmployeePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
