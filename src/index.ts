import Fastify from "fastify";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const fastify = Fastify({ logger: true });

// hello world route
fastify.get("/", async (_request, _reply) => {
  return { message: "Hello, World!" };
});

// call the db-service "/info-schema" route
fastify.get("/grabSchema", async (_request, reply) => {
  try {
    const apiUrl = process.env.FASTIFY_API_URL + "/info-schema";

    console.log(`Fetching from URL: ${apiUrl}`); // Log the API URL

    const response = await fetch(apiUrl);

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Fetched data: ${JSON.stringify(data)}`);

    reply.send({
      success: true,
      data,
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error(`Error: ${errorMessage}`); // Log error
    reply.status(500).send({
      success: false,
      message: errorMessage,
    });
  }
});

// Export the app so we can use it in tests
export default fastify;

// Start the server
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
