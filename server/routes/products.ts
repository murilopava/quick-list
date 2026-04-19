import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addProduct } from "../db/productsDb.js";
import { getListByShareId } from "../db/listsDb.js";

interface CreateProductBody {
  name: string;
}

interface ShareListParams {
  shareId: string;
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

  server.patch("/lists/:shareId/products/:id", async (request, reply) => {
    return { message: "atualizar produto" };
  });

  server.delete("/lists/:shareId/products/:id", (request, reply) => {
    return { message: "deletar produto" };
  });
}

export default productsRoutes;
