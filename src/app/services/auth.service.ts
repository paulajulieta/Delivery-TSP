import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private auth:AngularFireAuth, private afs: AngularFirestore,
    private router: Router) { 
      
  }

  //registro con datos
  register(email:string, pass:string){
    return new Promise((resolve, reject)=>{
      this.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData=>{
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(error=>console.log(reject(error)))
    });
  }

  //login con correo y contraseña
  login(email:string, pass:string){
    return new Promise((resolve, reject)=>{
      this.auth.signInWithEmailAndPassword(email, pass)
    .then((usuario)=>
      resolve(usuario),
      error=>reject(error));
    })
  }
  //login con google
  loginGoogle() {
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(credencial=>{
      this.updateUserData(credencial.user);
      console.log(credencial);
    });
  }

  //recupera el usuario logeado
  isAuth(){
    return this.auth.authState.pipe(map(auth=>auth));
  }

  //recupera los datos de usuario logueado
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data:any = { 
      uid: user.uid, 
      email: user.email
    } 

    return userRef.set(data, { merge: true })
    

  }
  logout() {
    this.auth.signOut();
  }
}

