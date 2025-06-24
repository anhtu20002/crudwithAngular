import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../types/Product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productService = inject(ProductService);

  products: Product[] = [];
  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },

      error: (e) => {
        console.log(e);
      },
    });
  }

  handleDelete(id: string) {
    if (window.confirm('Xoa')) {
      this.productService.deleteProduct(id).subscribe({
        next: (data) => {
          console.log(data);
          this.products = this.products.filter(product => product.id !== id);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }


}
