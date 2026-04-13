import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function listsRoutes(server: FastifyInstance) {
  server.post(
    "/lists",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const name = request.body;
      return { message: "lista" };
    },
  );

  server.get("/lists/:shareId", async (request, reply) => {
    // buscar lista
  });

  server.delete("/lists/:shareId", async (request, reply) => {
    return { message: "deletar lista" };
  });
}

export default listsRoutes;
