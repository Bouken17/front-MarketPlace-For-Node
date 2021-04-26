import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm: FormGroup;
  errorMessage: string;
  imagePreview: string;
  loading: boolean;
  userId: string;
  product: Product;

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.auth.userId;
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.productService.getProductById(params.id)
          .then(
            (product: Product) => {
              this.product = product;
              if (this.product.userId !== this.userId) {
                console.log('Vous ne pouvez pas modifier ce produit');
                return this.router.navigate(['/not-found']);
              }

              this.productForm = this.formBuilder.group({
                name: [product.name, Validators.required],
                description: [product.description, Validators.required],
                price: [product.price / 100, Validators.required],
                stock: [product.stock, Validators.required],
                image: [product.image, Validators.required]
              });
              this.imagePreview = product.image;//url de l'image
              this.loading = false;
            }
          )
          .catch(
            (err) => {
              console.log(err);
              this.router.navigate(['/shop']);
            }
          )
      }
    )
  }

  onSubmit() {
    this.loading = true;
    const product = new Product();

    if (this.product.userId !== this.userId) {
      console.log('Vous ne pouvez pas envoyez ce produit');
      return this.router.navigate(['/not-found']);
    }

    product._id = this.product._id;
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value * 100;
    product.stock = this.productForm.get('stock').value;
    product.image = '';
    product.userId = this.product.userId;

    //save updated product
    this.productService.updateProduct(product._id, product, this.productForm.get('image').value)
      .then(
        () => {
          this.productForm.reset();
          this.loading = false;
          this.router.navigate(['/shop']);
        }
      )
      .catch(
        (err) => {
          this.loading = false;
          this.errorMessage=err.message
        }
      )
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];///recupere la 1ere image retrouver par la selection
    this.productForm.get('image').patchValue(file);//modifier la valeur de l'attribut image qui est declaré en haut
    this.productForm.get('image').updateValueAndValidity();//rendre le champs valide car on a declaré en haut qu'il soit innvalis par defaut

    const reader = new FileReader();

    reader.onload = () => {
      if (this.productForm.get('image').valid) {//Si le champs qui requipère l'image est valide
        this.imagePreview = reader.result as string;
      } else {
        this.productForm = null;
      }
    }
    reader.readAsDataURL(file);
  }

}
