import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 

  constructor(private db:AngularFireDatabase,private cartService:ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result; 
  }
  getOrder(){
    return this.db.list('/orders').valueChanges();
  }
  getOrdersyUser(userId:string){
    return this.db.list('/orders',ref => 
    ref.orderByChild('userId').equalTo(userId));

  }

}
