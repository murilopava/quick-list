import prisma from "../lib/prisma.js";

interface CreateUpadateProduct {
  quant?: number;
  isPurchased: boolean;
}

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

export async function updateProduct(
  productId: string,
  update: CreateUpadateProduct,
) {
  const updatedProduct = await prisma.product.update({
    data: update,
    where: {
      id: productId,
    },
  });

  return updatedProduct;
}

export async function deleteProduct(productId: string) {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  console.log("produto deletado: ", deletedProduct);

  return deletedProduct;
}
