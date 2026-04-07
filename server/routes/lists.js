export async function listsRoutes(server) {
  server.get("/lists", async (request, reply) => {
    reply.sendfile("public/lists.html");
  });
}

export default listsRoutes;
