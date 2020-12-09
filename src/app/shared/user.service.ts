import { Injectable } from '@angular/core';
import { User } from './User';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createUser(user: User) {
    return this.userList.push({
      /*name: user.name,
      email: user.email,
      mobile: user.mobile,
      test: user.test*/
      bouche: user.bouche,
      degres: user. degres,
      marque: user. marque,
      name: user. name,
      origine: user. origine,
      ref: user.ref
      
    })
  }

  // Get single object
  getUser(id: string) {
    this.userRef = this.db.object('/Images/' + id);
    return this.userRef;
  }

  // Get List
  getUserList() {
    this.userList = this.db.list('/Images');
    return this.userList;
  }

  // Update
  updateUser(id, user: User) {
    return this.userRef.update({
    /*  name: user.name,
      email: user.email,
      mobile: user.mobile,
      test: user.test*/
      bouche: user.bouche,
      degres: user. degres,
      marque: user. marque,
      name: user. name,
      origine: user. origine,
      ref: user.ref
    })
  }

  // Delete
  deleteUser(id: string) {
    this.userRef = this.db.object('/user/' + id);
    this.userRef.remove();
  }
}
