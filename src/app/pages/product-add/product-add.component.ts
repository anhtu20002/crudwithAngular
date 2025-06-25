import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productService = inject(ProductService);
  route = inject(Router);
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    isShow: new FormControl(false),
  });

  handleSubmit() {
    this.productService.addProduct(this.addForm.value).subscribe({
      next: (data) => {
        setTimeout(() => {
          window.alert('Thêm thành công.');
        }, 1000);

        this.route.navigate(['/product/list']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
