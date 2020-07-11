import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  carts$;
  @Input('product') product:Product;
  @Input('shopping-cart')shoppingCart:ShoppingCart;
  sum: number;
  constructor(private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.carts$=this.cartService.getCart();
  }
  clearCart(){
      this.cartService.clearCart();
  }    

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
