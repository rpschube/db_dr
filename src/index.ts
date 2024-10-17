import Fastify from "fastify";

const fastify = Fastify({ logger: true });

// hello world
fastify.get("/", async (_request, _reply) => {
  return { message: "Hello, World!" };
});

// Add a new route to call the db_service "/info-schema" route
fastify.get("/grabSchema", async (request, reply) => {
  try {
    const fetch = (await import("node-fetch")).default;

    const apiUrl = process.env.FASTIFY_API_URL + "/info-schema";

    // Fetch data from db_service's "/info-schema" route
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Render the JSON data on the screen
    reply.send({
      success: true,
      data,
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    reply.status(500).send({
      success: false,
      message: errorMessage,
    });
  }
});

// Start the server and listen on port 3000
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server listening at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
