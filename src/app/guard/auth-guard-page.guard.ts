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
     if (this.authService.currentUser) {
       console.log('Authorizado , Logeado')
       return true;
       } else {
       console.log('No estas Autorizado ,Debes logear')
       this.router.navigate(['home'])
       $("#modalIngreso").modal('show');
       return false;
     }
  }
  
}
