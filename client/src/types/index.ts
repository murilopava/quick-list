export interface Item {
  id: string;
  listId: string;
  name: string;
  quant: number;
  isPurchased: boolean;
}

export interface List {
  shareId: string;
  name: string;
  items: Item[];
  createdAt: Date;
  updatedAt: Date;
}
