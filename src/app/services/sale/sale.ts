import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandler } from '../../utils/error-handler';
import { HttpClient } from '@angular/common/http';
import { SaleInfo } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class Sale {
  apiUrl = 'http://localhost:8080/api/product';
  constructor(
    private router: Router,
    private errorHandler: ErrorHandler,
    private http: HttpClient
  ) {}
  recordSale(saleInfo:SaleInfo) {
    this.http.post()
  }

}
