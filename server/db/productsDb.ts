import prisma from "../lib/prisma.js";

interface CreateUpadateItem {
  quant?: number;
  isPurchased: boolean;
}

export async function addItem(listId: string, name: string) {
  const product = await prisma.item.create({
    data: {
      listId: listId,
      name: name,
      quant: 1,
    },
  });

  return product;
}

export async function findItemById(productId: string) {
  const product = await prisma.item.findUnique({
    where: {
      id: productId,
    },
  });

  return product;
}

export async function updateItem(productId: string, update: CreateUpadateItem) {
  const updatedItem = await prisma.item.update({
    data: update,
    where: {
      id: productId,
    },
  });

  return updatedItem;
}

export async function deleteItem(productId: string) {
  const deletedItem = await prisma.item.delete({
    where: {
      id: productId,
    },
  });

  return deletedItem;
}
