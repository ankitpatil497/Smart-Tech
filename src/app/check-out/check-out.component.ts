import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  
  cart:ShoppingCart;
  sub:Subscription;
  auth:Subscription;
  userId: string;
  
  constructor(private cartService:ShoppingCartService,
    private router:Router,
    private orderSerive:OrderService,
    private authSerive:AuthService){}

  ngOnInit(){
    let cart$=this.cartService.getCart();
    this.sub=cart$.subscribe(cart=>this.cart=cart);
    this.auth=this.authSerive.user$.subscribe(user=>this.userId=user.uid)
  }

  async placeOrder(data) {
    console.log(data);
    let order={
      userId:this.userId,
      dataPlaced:new Date().getTime(),
      shipping:data,
      items: this.cart.items,
      quntity:this.cart.totalItemCount,
      totlePrice:this.cart.totalePrice
    };
    let result=await this.orderSerive.placeOrder(order);
    // this.cartService.clearCart();
    this.router.navigate(['/order-success',result.key]);
  }
  
  ngOnDestroy(){
    this.sub.unsubscribe()
    this.auth.unsubscribe();
  }


 

}
