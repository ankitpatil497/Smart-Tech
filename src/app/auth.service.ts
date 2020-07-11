import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebse from 'firebase';
import { Observable,of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:Observable<firebase.User>;
  constructor(
    private userService:UserService,
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute
  ) {
    this.user$=afAuth.authState;
   }
   
  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebse.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }
  // async register(email: string, password: string) {
  //   var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //   this.sendEmailVerification();
// }
  get appUser$():Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {

        if(user) return this.userService.get(user.uid).valueChanges();
      
        return of(null);
      }));
    }
}
