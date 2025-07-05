import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Sales } from './components/sales/sales';
import { Login } from './components/auth/login/login';
import { AllProducts } from './components/products/all-products/all-products';
import { CreateProduct } from './components/products/create-product/create-product';

export const routes: Routes = [
  { path: '', component: Dashboard, title: 'Dashboard' },
  { path: 'auth', component: Login, title: 'Authenticate' },
  {
    path: 'products',
    component: Products,
    title: 'Products Manager',
    children: [
      { path: '', component: AllProducts },
      { path: 'new', component: CreateProduct },
      { path: 'update/:tag', component: CreateProduct },
    ],
  },
  { path: 'sales', component: Sales, title: 'Sales Manager' },
];
