export interface Item {
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

export interface ListLS {
  shareId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
