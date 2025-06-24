import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  productService = inject(ProductService);
  //ActivatedRoute: cung cấp thông tin của route: param, queryParam...
  route = inject(ActivatedRoute);
  router = inject(Router);
  productId!: string;

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    isShow: new FormControl(false),
  });

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getDetail(param['id']).subscribe({
        next: (data) => {
          this.addForm.patchValue(data);
        },

        error: (e) => {
          console.log(e);
        },
      });
    });
  }

  handleSubmit() {
    this.productService
      .editProduct(this.productId, this.addForm.value)
      .subscribe({
        next: (data) => {
          setTimeout(() => {
            window.alert("Cập nhật thành công");
          }, 1000);
          this.router.navigate(['/product/list']);

        },
        error: (e) => {
          console.log(e);
        }
      });
  }
}
