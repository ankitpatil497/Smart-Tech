import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  //products:{title:string;}[];
  product:any[];
  id;
  filterProduct:any[];
  

  subscription:Subscription;
  constructor(
    private productService:ProductService,
    private route: ActivatedRoute,
    private router: Router) 
  {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription= this.productService.getAll().subscribe
      (product=>this.filterProduct= this.product=product);

  }

  filter(query:string){
    console.log(query);
    this.filterProduct=(query) ?
      this.product.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
      this.product;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  dtTrigger:Subject<any>=new Subject();
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  delete(key){
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(key);
    this.router.navigate(['/admin-products']);
  }
}
