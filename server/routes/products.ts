import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function productsRoutes(server: FastifyInstance) {
  server.post(
    "/lists/:shareId/products",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const product = request.body;

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
