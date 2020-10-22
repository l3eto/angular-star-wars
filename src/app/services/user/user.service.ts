import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      resolve(users);
    });
  }

  getById(id: number): Promise<User> {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      let user: User = users.find((user) => user.id == id);
      resolve(user ? user : null);
    });
  }

  getByUsername(username: string): Promise<User> {
    return new Promise((resolve) => {
      let users: User[] = this.getUsers();
      let user: User = users.find((user) => user.username == username);
      resolve(user ? user : null);
    });
  }

  create(user: User): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          this.getByUsername(user.username).then((userFound: User) => {
            if (userFound) {
              resolve(new ApiResponse(false, 'El usuario "' + user.username + '" ya existe.'));
            } else {
              let users: User[] = this.getUsers();
              user.id = (users.length > 0 && users[users.length-1] ? users[users.length-1].id : 0) + 1;
              users.push(user);
              this.setUsers(users);
              resolve(new ApiResponse(true, 'Usuario registrado correctamente.'));
            }
          });
        } else {
          resolve(new ApiResponse(false, 'Ha ocurrido un error en la creación.'));
        }
      }, 1000);
    });
  }
  
  update(user: User): Promise<ApiResponse> {
    return new Promise((resolve) => {
      let found: boolean = false;
      let users: User[] = this.getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          found = true;
          users[i] = user;
          break;
        }
      }
      this.setUsers(users);
      if (found) {
        resolve(new ApiResponse(true, 'Usuario actualizado correctamente.'));
      } else {
        resolve(new ApiResponse(false, 'El usuario no existe.'));
      }
    });
  }

  delete(user: User): Promise<ApiResponse> {
    return new Promise((resolve) => {
      let found: boolean = false;
      let users: User[] = this.getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          found = true;
          users.splice(i, 1);
          break;
        }
      }
      this.setUsers(users);
      if (found) {
        resolve(new ApiResponse(true, 'Usuario eliminado correctamente.'));
      } else {
        resolve(new ApiResponse(false, 'El usuario no existe.'));
      }
    });
  }

  getUsers(): [] {
    var json = localStorage.getItem('users');
    return json ? JSON.parse(json) : [];
  }

  setUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users ? users : []));
  }

}
