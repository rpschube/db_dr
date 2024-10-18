import supertest from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import dotenv from "dotenv";
import fastifyApp from "../index"; // Import the actual Fastify app

dotenv.config();

// Initialize Fastify with the real app instance
const fastify = fastifyApp;

describe("GET /grabSchema", () => {
  // Start Fastify before running tests
  beforeAll(async () => {
    await fastify.listen({ port: 0 }); // Use port 0 to auto-assign an available port

    // Add a small delay to ensure services are up
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
  });

  // Stop Fastify after running tests
  afterAll(async () => {
    await fastify.close();
  });

  it("should return schema data", async () => {
    // Call the real /grabSchema route
    const response = await supertest(fastify.server).get("/grabSchema");

    // Expect a 200 OK response
    expect(response.status).toBe(200);
    // Expect success to be true
    expect(response.body.success).toBe(true);
    // Check that the data exists in the response
    expect(response.body.data).toBeDefined();
  });
});
