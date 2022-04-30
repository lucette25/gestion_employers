import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  api ='http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) {}

  getEmployees(){
    return this.http.get<Employee[]>(`${this.api}/employees`);
  }
  deleteEmployees(id: string) {
    return this.http.delete(`${this.api}/employees/${id}`);
  }
  updateEmployees(id, params) {
    return this.http.put(`${this.api}/employees/${id}`, params);
  }
  getById(id: string) {
    return this.http.get<Employee>(`${this.api}/employees/${id}`);
  }
  createEmployee(employee: Employee) {
    return this.http.post(`${this.api}/employees`, employee);
  }
  login(username, password): Observable<any>{
    return this.http.post<any>(`${this.api}/users`, { username, password },httpOptions);
  }
  isLoggedIn(): boolean {
    return false;
  }
}
