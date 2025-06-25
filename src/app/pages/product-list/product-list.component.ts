import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../types/Product';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productService = inject(ProductService);
  route = inject(Router)

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

  handleLogout() {
    localStorage.removeItem('token');
    setTimeout(() => {
      window.alert("logout thành công");
    }, 1000);
    this.route.navigate(['/login']);
  }

}
