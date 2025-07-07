import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product/product';
import { ProductInterface } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  productsCount!: number;
  constructor(private productService: Product, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productsCount = response.products.length;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  onViewAllProducts() {
    this.router.navigate(['products']);
  }
  onAddProduct() {
    this.router.navigate(['products', 'new']);
  }
}
