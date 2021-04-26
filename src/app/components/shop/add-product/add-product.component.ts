import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  errorMessage: string;
  imagePreview: string;
  loading: boolean;
  userId: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    private productService: ProductService,
    private router:Router) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      stock: [2, Validators.required],
      price: [0, Validators.required],
      image: [null, Validators.required],
    });
    this.userId = this.auth.userId;
  }

  onSubmit(): void{
    this.loading = true;
    const product = new Product();
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value*100;
    product.stock = this.productForm.get('stock').value;
    product.image = '';//On mettra rien car la recuperation est deja réalisée dans onImagePick
    product.userId = this.userId;

    //Save product
    this.productService.createNewProduct(product, this.productForm.get('image').value)
      .then(
        () => {//Si l'insertion est bien faite
          this.productForm.reset();//renitialise la variable productForm à zero
          this.loading = false;//change le drapeau pour arreter le chargement
          this.router.navigate(['/shop']);//redirige vers la page shop
        }
      )
      .catch(
        (err) => {
          this.loading = false;
          this.errorMessage = err;
        }
      )
   }

  //affiche l'image
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
