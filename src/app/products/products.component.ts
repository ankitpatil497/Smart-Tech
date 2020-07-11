import { Product } from 'src/app/models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { CategoryService } from './../category.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products:any[];
  filteredProducts:Product[]=[];
  categories$;
  category:string;
  sub:Subscription;
  product:Product;
  cart;
  

  constructor( 
    route:ActivatedRoute,
    private cartService:ShoppingCartService,
    private productService:ProductService,categoryService:CategoryService) 
    { 
   
      productService
      .getAll().pipe(switchMap(products=>{
      this.products=products;
      return route.queryParamMap;
    }))

      .subscribe(param=>{
        this.category=param.get('category');
  
        this.filteredProducts=(this.category) ?
          this.products.filter(p=>p.category===this.category) :
          this.products;
      });
    
    this.categories$=categoryService.getCategories();
  }

   ngOnInit(){
    this.sub= this.cartService.getCart()
      .subscribe(cart=>this.cart=cart);
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
