import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../services/product/product';
import { Router } from '@angular/router';
import { ProductInterface } from '../../../models/models';
import { AppModal } from '../../shared/app-modal/app-modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModal } from '../../shared/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, AppModal, ConfirmationModal],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts implements OnInit {
  products!: ProductInterface[];
  constructor(
    private productService: Product,
    private router: Router,
    private toaster: ToastrService
  ) {}
  status: 'loading' | 'success' | 'error' = 'loading';
  showConfirmModal = false;
  selectedProductTag: string | null = null;

  openConfirm(tag: string) {
    this.selectedProductTag = tag;
    this.showConfirmModal = true;
  }

  handleConfirm(tag: string) {
    this.showConfirmModal = false;
    this.deleteProduct(tag);
  }

  handleCancel() {
    this.showConfirmModal = false;
    console.log('Cancelled.');
  }

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

  onUpdateProduct(tag: string) {
    this.router.navigate(['products', 'update', tag]);
  }

  deleteProduct(tag: string) {
    this.productService.deleteProduct(tag).subscribe({
      next: (response) => {
        this.toaster.info(response.message.toUpperCase());
        window.location.reload();
      },
      error: (err) => {
        this.toaster.error(err.error.message);
      },
    });
  }
}
