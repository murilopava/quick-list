
export async function productsRoutes(server) {
  server.get("/products", async (request, reply) => {
    reply.status(200);
    return { message: "Lista de produtos" };
  });
}

export default productsRoutes;