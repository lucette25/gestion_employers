import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
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
public employee: Observable<Employee>;
public user: Observable<User>;
private userSubject: BehaviorSubject<User>;
 url='http://localhost:3000'
 
  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user= this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
}

  getEmployees(){
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }
  deleteEmployees(id: string) {
    return this.http.delete(`${this.url}/employees/${id}`)
        .pipe(map(x => {
            
            return x;
        }));
}

  updateEmployees(id, params) {
    return this.http.put(`${this.url}/employees/${id}`, params)
  }
  getById(id: string) {
    return this.http.get<Employee>(`${this.url}/employees/${id}`);
}
  createEmployee(employee:Employee) {
    return this.http.post(`${this.url}/employees`, employee);
}

login(username, password) :Observable<any>{
  console.log("username",username)
  return this.http.post<any>(`${this.url}/users`, { username, password },httpOptions).pipe(map(user => {
    this.userSubject.next(user);
    return user;
}));
      
}


}
