import { beforeAll, describe, expect, it } from "vitest";
import app from "../app";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";

describe("auth tests", () => {
  let request: TestAgent;
  beforeAll(() => {
    request = supertest(app);
  });

  it("should redirect to auth url when visiting /auth/login", async () => {
    // Placeholder test
    const response = await request.get("/auth/login").expect(302);
    expect(response.headers.location).toBeDefined();
    expect(response.headers.location).toContain("https://");
  });
});