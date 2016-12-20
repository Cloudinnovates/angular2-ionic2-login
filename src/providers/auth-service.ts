import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class User {
  name : string;
  email :string;

  constructor(name : string,email :string){
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser:User;
  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  public login (credentials) {
    if (credentials.email == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let access = (credentials.password === "pass" && credentials.email === "email")
         this.currentUser = new User('Simon', 'saimon@devdactic.com');
          observer.next(access);
          observer.complete();
      })
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
