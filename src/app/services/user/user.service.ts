import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAll() {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      resolve(users);
    });
  }

  getById(id: number) {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      resolve(users.find((user) => user.id == id));
    });
  }

  getByUsername(username: string) {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      resolve(users.find((user) => user.username == username));
    });
  }

  create(user: User) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.getByUsername(user.username).then((userFound: User) => {
          if (userFound) {
            resolve(new ApiResponse(false, 'EL usuario "' + user.username + '" ya existe.'));
          } else {
            let users: User[] = this.getUsers();
            user.id = (users.length > 0 && users[users.length-1] ? users[users.length-1].id : 0) + 1;
            users.push(user);
            this.setUsers(users);
            resolve(new ApiResponse(true, 'Usuario registrado correctamente.'));
          }
        });
      }, 1000);
    });
  }
  
  update(user: User) {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          users[i] = user;
          break;
        }
      }
      this.setUsers(users);
      resolve();
    });
  }

  delete(user: User) {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          users.splice(i, 1);
          break;
        }
      }
      this.setUsers(users);
      resolve();
    });
  }

  getUsers() {
    var json = localStorage.getItem('users');
    return json ? JSON.parse(json) : [];
  }

  setUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users ? users : []));
  }

}
