import { Product } from 'src/app/models/product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    items:ShoppingCartItem[]=[];
    sum;

  itemsMap:{
    [productId:string]:ShoppingCartItem
  };

  constructor(data?: Partial<ShoppingCart>) {
    Object.assign(this, data);
    for(let productId in this.itemsMap)
      this.items.push(this.itemsMap[productId]);
  }

  getQuantity(product:Product) {
    let item = this.items[product.key];
    return item ? item.quantity : 0;
  }
  
    get productId(){
        return Object.keys(this.items);
    }

    get totalItemCount(){
      let  count =0;
      for(let productId in this.items)
          count +=this.items[productId].quantity;
      return count;
  }

  get totalePrice(){
    this.sum =0;
      for(let productId in this.items)
          this.sum +=this.items[productId].product.price * this.items[productId].quantity;
      return this.sum;
  }
    
}