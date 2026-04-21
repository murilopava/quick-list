import { FastifyInstance } from "fastify";
import { createList, deleteList, getListByShareId } from "../db/listsDb.js";

interface CreateListBody {
  name: string;
}

interface ShareListParams {
  shareId: string;
}

export async function listsRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateListBody }>("/lists", async (request, reply) => {
    const { name } = request.body;
    const { shareId } = await createList(name);
    return { shareId };
  });

  server.get<{ Params: ShareListParams }>(
    "/lists/:shareId",
    async (request, reply) => {
      const shareId = request.params.shareId;
      const list = await getListByShareId(shareId);

      if (list === null) {
        reply.status(404);
        return { message: "Lista não encontrada!" };
      }

      console.log("List: ", list);

      return list;
    },
  );

  server.delete<{ Params: ShareListParams }>(
    "/lists/:shareId",
    async (request, reply) => {
      const listId = request.params.shareId;

      if (listId == null) {
        reply.status(404);
        return;
      }

      const deletedList = deleteList(listId);

      console.log("lista deletada: ", deletedList);

      return deletedList;
    },
  );
}

export default listsRoutes;
