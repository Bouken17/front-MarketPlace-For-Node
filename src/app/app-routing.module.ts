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
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'shop',component:ShopComponent},
  {path:'add-product',component:AddProductComponent, canActivate:[AuthGuard]},
  {path:'single-product/:id',component:SingleProductComponent},
  {path:'edit-product/:id',component:EditProductComponent, canActivate:[AuthGuard]},
  {path:'cart',component:CartComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',component:NotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
