export interface Product {
  id: string;
  listId: string;
  name: string;
  quant: number;
  isPurchased: boolean;
}

export interface List {
  id: string;
  shareId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
