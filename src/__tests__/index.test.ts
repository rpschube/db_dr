import Fastify from "fastify";
import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";

const fastify = Fastify();

fastify.get("/grabSchema", async (_request, _reply) => {
  return { message: "Schema data goes here" };
});

describe("GET /grabSchema", () => {
  it("should return schema data", async () => {
    const response = await supertest(fastify.server).get("/grabSchema");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Schema data goes here" });
  });
});
