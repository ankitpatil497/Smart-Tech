import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser:AppUser;
  carts$:Observable<ShoppingCart>;
  
   constructor(private auth:AuthService,private cartService:ShoppingCartService) {
     auth.appUser$.subscribe(appUser=>this.appUser=appUser);
      
    }
  logout(){
    this.auth.logout();
  }

  ngOnInit(){
    this.carts$=this.cartService.getCart()
  }
}
