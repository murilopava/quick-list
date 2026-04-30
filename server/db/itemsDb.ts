import prisma from "../lib/prisma.js";

interface CreateUpadateItem {
  quant?: number;
  isPurchased: boolean;
}

export async function addItem(listId: string, name: string) {
  const item = await prisma.item.create({
    data: {
      listId: listId,
      name: name,
      quant: 1,
    },
  });

  return item;
}

export async function findItemById(itemId: string) {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });

  return item;
}

export async function updateItem(itemId: string, update: CreateUpadateItem) {
  const updatedItem = await prisma.item.update({
    data: update,
    where: {
      id: itemId,
    },
  });

  return updatedItem;
}

export async function deleteItem(itemId: string) {
  const deletedItem = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  return deletedItem;
}
