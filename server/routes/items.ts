import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  addItem as addItem,
  deleteItem,
  findItemById,
  updateItem,
} from "../db/itemsDb.js";
import { getListByShareId } from "../db/listsDb.js";

interface CreateItemBody {
  name: string;
}

interface ShareListParams {
  shareId: string;
}

interface ItemParams {
  shareId: string;
  id: string;
}

interface CreateUpdateBody {
  quant: number;
  isPurchased: boolean;
}

export async function itemsRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateItemBody; Params: ShareListParams }>(
    "/lists/:shareId/items",
    async (request, reply) => {
      const { name } = request.body;
      const shareId = request.params.shareId;

      const list = await getListByShareId(shareId);

      if (list === null) {
        reply.status(404);
        return;
      }

      const item = await addItem(list.id, name);

      reply.status(201);
      return item;
    },
  );

  server.patch<{ Params: ItemParams; Body: CreateUpdateBody }>(
    "/lists/:shareId/items/:id",
    async (request, reply) => {
      const shareId = request.params.shareId;
      const itemId = request.params.id;
      const updatedProduct = request.body;
      const list = await getListByShareId(shareId);

      if (list === null) {
        reply.status(404);
        return;
      }

      const newProduct = await updateItem(itemId, updatedProduct);

      console.log("Produto atualizado: ", newProduct);

      return newProduct;
    },
  );

  server.delete<{ Params: ItemParams }>(
    "/lists/:shareId/items/:id",
    async (request, reply) => {
      const shareId = request.params.shareId;

      const list = await getListByShareId(shareId);

      if (list === null) {
        reply.status(404);
        return;
      }

      const productId = request.params.id;

      const product = await findItemById(productId);

      if (product === null) {
        reply.status(404);
        return;
      }

      const deletedProduct = await deleteItem(productId);

      console.log("produto deletado: ", deletedProduct);

      return deletedProduct;
    },
  );
}

export default itemsRoutes;
