import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async (_request, _reply) => {
  return { message: "Hello, World!" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
