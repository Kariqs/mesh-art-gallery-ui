import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../services/product/product';
import { ProductInterface } from '../../../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct implements OnInit {
  productForm!: FormGroup;
  isSubmitting: boolean = false;
  editMode: boolean = false;
  productTag: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: Product,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  fetchProduct(tag: string) {
    this.productService.getProductByTag(tag).subscribe({
      next: (response) => {
        this.populateForm(response.product);
      },
      error: (err) => {
        this.toaster.error(err.error.message);
      },
    });
  }

  populateForm(product: ProductInterface) {
    this.productForm.patchValue({
      name: product.name,
      tag: product.tag,
      price: product.price,
      quantity: product.quantity,
    });
  }

  checkEditMode() {
    this.route.params.subscribe((params) => {
      const tag = params['tag'];
      if (tag) {
        this.editMode = true;
        this.productTag = tag;
        this.fetchProduct(tag);
      }
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const productInfo: ProductInterface = this.productForm.value;

    this.productService.createProduct(productInfo).subscribe({
      next: (response) => {
        if (response) {
          this.isSubmitting = false;
          this.toaster.info(response.message.toUpperCase());
          this.router.navigate(['products']);
        } else {
          this.toaster.error('An unknown error occured'.toUpperCase());
        }
      },
      error: (err) => {
        this.isSubmitting = false;

        let errorMessage = 'An unknown error occured';
        if (err.message) {
          errorMessage = err.error.message;
        }
        this.toaster.error(errorMessage.toUpperCase());
      },
    });
  }
}
