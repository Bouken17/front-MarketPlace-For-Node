import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../models/data';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = environment.api;
  products: Product[];
  products$ = new Subject<Product[]>();

  constructor(private http: HttpClient) { }

  emitData(): void{
    this.products$.next(this.products)
  }

  getProduct() {
    this.http.get(this.api + '/products').subscribe(
      (data:Data) => {
        if (data.status === 200) {
          this.products = data.result;
          this.emitData();
        } else {
          console.log(data);

        }
      },
      (err) => {
        console.log(err);

      }
    )
  }

  getProductById(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.api + '/products/' + id).subscribe(
          (data: Data) => {
            if (data.status === 200) {
              resolve(data.result);
            } else {
              reject(data.message);
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    )
  }

  createNewProduct(product: Product, image: File) {
    return new Promise(
      (resolve, reject) => {
        let productData: FormData = new FormData();
        productData.append('product', JSON.stringify(product));
        productData.append('image', image);

        this.http.post(this.api + '/products', productData).subscribe(
          (data: Data) => {
            if (data.status === 201) {
              this.getProduct();
              resolve(data);
            } else {
              reject(data.message);
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    )
  }

  updateProduct(id: string, product: Product, image: File | string) {//imae type string au cas où on veut garder l'ancienne
    return new Promise(
      (resolve, reject) => {
        let productData: FormData = new FormData();
        if (typeof image == 'string') {//On verifie si l'image recu est un string ca v dire qu'on veut pas modifier notre image
          product.image = image;//donc on met juste l'ancien nom
        } else {//si c'est un fichier c'est que l'image a été modifier
          productData.append('image', image);//on le met dans notre boite de donnée pour img
        }
        productData.append('product', JSON.stringify(product));
        this.http.put(this.api + '/products/' + id, productData).subscribe(
          (data: Data) => {
            if (data.status === 200) {
              resolve(data);
            } else {
              reject(data)
            }
          },
          (err) => {
            reject(err);
          }
        )
      }
    )
  }

  deleteProduct(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete(this.api + '/products/' + id).subscribe(
          () => {
            this.getProduct();
            resolve(true);//car cette fois la methode ne return rien
          },
          (err) => {
            reject(err);
          }
        )
      }
    )
  }
}
