import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  products: Product[];
  userId;
  productSub: Subscription;
  loading: boolean;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productSub = this.productService.products$.subscribe(
      (products: Product[]) => {
        this.loading = true;
        this.products = products;
      },
      (err) => {
        this.loading = false;
        console.log(err);

      }
    );
    this.productService.getProduct();
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
