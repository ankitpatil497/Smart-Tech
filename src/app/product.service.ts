import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product){
    return this.db.list('/products').push(product);
  }

  // getAll(){
  //   return this.db.list('/products').valueChanges();
  // }

  getAll() { 
    return this.db.list('/products/') .snapshotChanges() 
    .pipe( map(actions => actions.map(a => ({ key: a.payload.key, ...(a.payload.val() as {}) })) ) ); 
  }

  get(productId){
    return this.db.object('/products/'+ productId).valueChanges();
  }
  delete(productId){
    return this.db.object('products/'+productId).remove();
  }
}
