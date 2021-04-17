import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ShopComponent } from './components/shop/shop.component';
import { AddProductComponent } from './components/shop/add-product/add-product.component';
import { SingleProductComponent } from './components/shop/single-product/single-product.component';
import { EditProductComponent } from './components/shop/edit-product/edit-product.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'shop',component:ShopComponent},
  {path:'add-product',component:AddProductComponent},
  {path:'single-product/:id',component:SingleProductComponent},
  {path:'edit-product/:id',component:EditProductComponent},
  {path:'cart',component:CartComponent},
  {path:'**',component:NotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
