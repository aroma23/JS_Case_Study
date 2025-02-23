import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Users } from "users-es6-pactum-package";
import pactum from "pactum";
import dotenv from "dotenv";

const psc = require('pactum-swagger-coverage');
const reporter = pactum.reporter;

describe('Frictionless API Test with vitest', () => {
  const users = new Users('https://reqres.in/api');
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

  //AC_FL_TC001 ==> account center friction less testcase 1
  it("AC_FL_TC001 - fetches users successfully pactum", async () => {
    const spec = pactum.spec();
    const response = await users.readUser('3', spec);
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(response.body);
    // correct
    await spec.expectStatus(200);
    //incorrect
    // await spec.expectStatus(400);
    // correct
    // await spec.expectJson('[0].email', 'john@gmail.com')
    //incorrect
    await spec.expectJson('data.email', 'emma.wong@reqres.in')
    // expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    return reporter.end();
  })
})
