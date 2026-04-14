import { FastifyInstance } from "fastify";
import { createList, getListShareId } from "../db/listsDb.js";

interface CreateListBody {
  name: string;
}

interface ListParams {
  shareId: string;
}

export async function listsRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateListBody }>("/lists", async (request, reply) => {
    const { name } = request.body;
    const { shareId } = await createList(name);
    return { shareId };
  });

  server.get<{ Params: ListParams }>(
    "/lists/:shareId",
    async (request, reply) => {
      const searchedList = request.params.shareId;
      const list = await getListShareId(searchedList);

      if (list === null) {
        reply.status(404);
        return { message: "Lista não encontrada!" };
      }

      return list;
    },
  );

  server.delete("/lists/:shareId", async (request, reply) => {
    return { message: "deletar lista" };
  });
}

export default listsRoutes;
