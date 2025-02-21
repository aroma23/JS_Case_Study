import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { readUsers, readUser } from "../api/Users";
import pactum from "pactum";
import dotenv from "dotenv";

const psc = require('pactum-swagger-coverage');
const reporter = pactum.reporter;

describe('API Test with vitest', () => {
  beforeAll(() => {
    // Load environment variables from .env file for standalone tests
    dotenv.config();
    let baseURL = process.env.API_BASE_URL || "http://localhost:8000";
    pactum.request.setBaseUrl(baseURL);

    psc.swaggerYamlPath = './swagger/users.yml';
    psc.reportFile = 'users-coverage.json';
    // psc.basePath = '/v1';
    reporter.add(psc);
  })

  it("fetches users successfully", async () => {
    const api = pactum.spec();
    const response = await readUsers(api);
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(response.body);
    // correct
    await api.expectStatus(200);
    //incorrect
    // await api.expectStatus(400);
    // correct
    // await api.expectJson('[0].email', 'john@gmail.com')
    //incorrect
    await api.expectJson('[0].email', 'morrison@gmail.com')
    // expect(response.statusCode).toBe(400);
  });

  it("fetch specfic user successfully", async () => {
    const api = pactum.spec();
    const response = await readUser(api, { user_id: 2 });
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(response.body);
    // correct
    await api.expectStatus(200);
    //incorrect
    // await api.expectStatus(400);
    // correct
    // await api.expectJson('email', 'john@gmail.com')
    //incorrect
    await api.expectJson('email', 'morrison@gmail.com')
    // expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    return reporter.end();
  })
})
