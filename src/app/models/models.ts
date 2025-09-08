export interface User {
  username: string;
  password: string;
}

export interface ProductInterface {
  ID?: number;
  name: string;
  price: number;
  quantity: number;
  tag: string;
}


export interface SaleInfo {
  productId: string;
  saleQuantity: string;
  salePrice: number;
}
