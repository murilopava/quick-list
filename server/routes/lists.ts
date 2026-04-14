import { FastifyInstance, FastifyRequest } from "fastify";
import { createList } from "../db/listsDb.js";

interface CreateListBody {
  name: string;
}

export async function listsRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateListBody }>("/lists", async (request, reply) => {
    const { name } = request.body;
    const { shareId } = await createList(name);
    return { shareId };
  });

  server.get("/lists/:shareId", async (request, reply) => {
    // buscar lista
  });

  server.delete("/lists/:shareId", async (request, reply) => {
    return { message: "deletar lista" };
  });
}

export default listsRoutes;
