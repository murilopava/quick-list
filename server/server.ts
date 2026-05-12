import fastify from "fastify";
import cors from "@fastify/cors";
import listsRoutes from "./routes/lists.js";
import itemsRoutes from "./routes/items.js";

const server = fastify();

server.register(cors, {
  origin: "*",
  methods: ["POST", "GET", "PATCH", "DELETE"],
});

server.register(listsRoutes);
server.register(itemsRoutes);

server.get("/", (request, reply) => {
  reply.redirect("/lists");
});

server.listen({ port: 3333, host: "localhost" }, (err, address) => {
  if (err) {
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}/lists e ${address}/products`);
});
