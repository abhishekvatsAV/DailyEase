export type Product = {
  _id: string;
  id?: number;
  title: string;
  price: number;
  salePrice?: number;
  imgSrc: string;
  sale: boolean;
  quantity: number;
};