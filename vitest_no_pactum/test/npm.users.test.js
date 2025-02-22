import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Users } from 'users-es6-package';
import pactum from "pactum";
import dotenv from "dotenv";

describe('API Test with vitest', () => {
  beforeAll(() => {
    // Load environment variables from .env file for standalone tests
    dotenv.config();
    let baseURL = process.env.API_BASE_URL || "http://localhost:8000";
    pactum.request.setBaseUrl(baseURL);
  })


  it("fetches users successfully", async () => {
    await new Users("https://reqres.in/api").readUsers().then((res) => {
      console.log("Muthukumar: " + res.data.data.email);
      expect(res.status).to.be.eql(400);
    });
    // const response = await readUsers(api);
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(response.body);
    // correct
    //incorrect
    // await api.expectStatus(400);
    // correct
    // await api.expectJson('[0].email', 'john@gmail.com')
    //incorrect
    // await api.expectJson('[0].email', 'morrison@gmail.com')
    // expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    // TODO - any teardown needed for this test suite
  })
})
