import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPageGuard implements CanActivate {

  private status: boolean ;

  constructor(private authService: AngularFireAuth , private router: Router, private auth:AuthService) {
   }
  canActivate(): boolean {
    console.log(this.auth.isAuth)
     if (this.auth.isAuth !=null) {
       console.log('Authorizado , Logeado')
       return true;
       } else {
       console.log('No estas Autorizado ,Debes logear')
       $("#modalIngreso").modal('show');
       return false;
     }
  }
  
}
