import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../services/product/product';
import { Router } from '@angular/router';
import { ProductInterface } from '../../../models/models';
import { AppModal } from '../../shared/app-modal/app-modal';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, AppModal],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts implements OnInit {
  products!: ProductInterface[];
  constructor(private productService: Product, private router: Router) {}
  status: 'loading' | 'success' | 'error' = 'loading';

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.status = 'loading';
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.status = 'success';
        this.products = response.products;
      },
      error: (err) => {
        this.status = 'error';
        console.log(err.error);
      },
    });
  }

  onCreateProduct() {
    this.router.navigate(['products', 'new']);
  }
}
