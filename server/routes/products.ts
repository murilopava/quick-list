import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  addProduct,
  deleteProduct,
  findProductById,
  updateProduct,
} from "../db/productsDb.js";
import { getListByShareId } from "../db/listsDb.js";

interface CreateProductBody {
  name: string;
}

interface ShareListParams {
  shareId: string;
}

interface ProductParams {
  shareId: string;
  id: string;
}

interface CreateUpdateBody {
  quant: number;
  isPurchased: boolean;
}

export async function productsRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateProductBody; Params: ShareListParams }>(
    "/lists/:shareId/products",
    async (request, reply) => {
      const { name } = request.body;
      const shareId = request.params.shareId;

      const list = await getListByShareId(shareId);

      if (list === null) {
        reply.status(404);
        return;
      }

      const product = await addProduct(list.id, name);

      reply.status(201);
      return product;
    },
  );

  server.patch<{ Params: ProductParams; Body: CreateUpdateBody }>(
    "/lists/:shareId/products/:id",
    async (request, reply) => {
      const shareId = request.params.shareId;
      const productId = request.params.id;
      const updatedProduct = request.body;
      const list = await getListByShareId(shareId);

      if (list === null) {
        reply.status(404);
        return;
      }

      const newProduct = await updateProduct(productId, updatedProduct);

      console.log("Produto atualizado: ", newProduct);

      return newProduct;
    },
  );

  server.delete<{ Params: ProductParams }>(
    "/lists/:shareId/products/:id",
    async (request, reply) => {
      const shareId = request.params.shareId;

      const list = await getListByShareId(shareId);

      if (list == null) {
        reply.status(404);
        return;
      }

      const productId = request.params.id;

      const product = await findProductById(productId);

      if (product == null) {
        reply.status(404);
        return;
      }

      const deletedProduct = await deleteProduct(productId);

      console.log("produto deletado: ", deletedProduct);

      return deletedProduct;
    },
  );
}

export default productsRoutes;
