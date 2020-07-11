import { AuthguradService } from './authgurad.service';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';


const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'product',component:ProductsComponent},
  {path:'shoppig-cart',component:ShoppingCartComponent},
  {path:'login',component:LoginComponent},

  {path:'checkout',component:CheckOutComponent,canActivate:[AuthguradService]},
  {path:'my-order',component:MyOrderComponent,canActivate:[AuthguradService]},
  {path:'order-success/:id',component:OrderSuccessComponent,canActivate:[AuthguradService]},
 
 
  {
    path:'admin-products-new',
    component:ProductFormComponent,
    canActivate:[AuthguradService,AdminAuthGuardService]
  },
  {
    path:'admin-products/:id',
    component:ProductFormComponent,
    canActivate:[AuthguradService,AdminAuthGuardService]
  },
  {
    path:'admin-products',
    component:AdminProductsComponent,
    canActivate:[AuthguradService,AdminAuthGuardService]
  },  
  {
    path:'admin/orders',
    component:AdminOrdersComponent,
    canActivate:[AuthguradService,AdminAuthGuardService]
  },   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
