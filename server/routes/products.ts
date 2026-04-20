import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addProduct, updateProduct } from "../db/productsDb.js";
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

  server.delete("/lists/:shareId/products/:id", (request, reply) => {
    return { message: "deletar produto" };
  });
}

export default productsRoutes;
