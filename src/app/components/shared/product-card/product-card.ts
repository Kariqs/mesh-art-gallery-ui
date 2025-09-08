import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: ProductInterface;
  @Output() updateProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<string>();

  onUpdate() {
    this.updateProduct.emit(this.product);
  }

  onDelete() {
    this.deleteProduct.emit(this.product.tag);
  }
  constructor() {}
}
