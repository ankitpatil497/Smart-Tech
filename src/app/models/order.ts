import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCart } from './shopping-cart';


export class Order{
    datePlaced:number;

    shoppingCart:ShoppingCartItem
    constructor(public userId:string,
        public shipping:any,public item:any){
        this.datePlaced=new Date().getTime();
        item=this.shoppingCart.product;
    }
}