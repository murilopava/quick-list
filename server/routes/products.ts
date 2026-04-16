import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface CreateProductBody {
  name: string;
}

export async function productsRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateProductBody }>(
    "/lists/:shareId/products",
    async (request, reply: FastifyReply) => {
      const { name } = request.body;

      reply.status(200);
      return { message: "adicionar um produto" };
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
