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

export interface Sale {
  productTag: string;
  saleQuantity: string;
  salePrice: number;
}
