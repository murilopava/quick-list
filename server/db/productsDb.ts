import prisma from "../lib/prisma.js";
import { getListByShareId } from "./listsDb.js";

export async function addProduct(listId: string, name: string) {
  const product = await prisma.product.create({
    data: {
      listId: listId,
      name: name,
      quant: 1,
    },
  });

  return product;
}
