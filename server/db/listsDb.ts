import prisma from "../lib/prisma.js";

export async function createList(name: string) {
  const list = await prisma.list.create({
    data: {
      name: name,
    },
  });

  console.log("created list: ", list);

  return list;
}

export async function getListByShareId(shareId: string) {
  const list = await prisma.list.findUnique({
    where: {
      shareId,
    },
    include: {
      products: true,
    },
  });

  return list;
}

export async function deleteList(listId: string) {
  const deletedList = await prisma.list.delete({
    where: {
      id: listId,
    },
  });

  return deletedList;
}
