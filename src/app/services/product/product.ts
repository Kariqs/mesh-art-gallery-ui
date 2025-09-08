import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ProductInterface } from '../../models/models';
import { ErrorHandler } from '../../utils/error-handler';
import { Router } from '@angular/router';

interface CreateProductResponse {
  message: string;
  product: ProductInterface;
}

@Injectable({
  providedIn: 'root',
})
export class Product {
  apiUrl = 'http://localhost:8080/api/product';
  constructor(private http: HttpClient, private router: Router) {}

  createProduct(
    productInfo: ProductInterface
  ): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(`${this.apiUrl}`, productInfo);
  }

  getProducts(): Observable<{ products: ProductInterface[] }> {
    return this.http
      .get<{ products: ProductInterface[] }>(`${this.apiUrl}`)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  getProductByTag(tag: string): Observable<{ product: ProductInterface }> {
    return this.http
      .get<{ product: ProductInterface }>(`${this.apiUrl}/${tag}`)
      .pipe(
        catchError((error) => ErrorHandler.errorHandler(error, this.router))
      );
  }

  updateProduct(
    tag: string,
    productInfo: ProductInterface
  ): Observable<CreateProductResponse> {
    return this.http.put<CreateProductResponse>(
      `${this.apiUrl}/${tag}`,
      productInfo
    );
  }

  deleteProduct(tag: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${tag}`);
  }
}
