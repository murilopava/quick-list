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
