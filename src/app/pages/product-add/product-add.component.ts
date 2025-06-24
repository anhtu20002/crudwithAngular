import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productService = inject(ProductService);
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    isShow: new FormControl(false),
  });

  handleSubmit() {
    this.productService.addProduct(this.addForm.value).subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }
}
