import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Users } from 'users-es6-pactum-package'
import pactum, { expect as pactumExpect, expectStatus } from "pactum";
import dotenv from "dotenv";

describe('API Test with vitest', () => {
  beforeAll(() => {
    // Load environment variables from .env file for standalone tests
    dotenv.config();
    let baseURL = process.env.API_BASE_URL || "http://localhost:8000";
    pactum.request.setBaseUrl(baseURL);
  })


  it("read user successfully - pactum way2", async () => {
    const users = new Users("https://reqres.in/api");
    const handle = await users.readUser('2');
    pactumExpect(handle).to.have.status(200);
    expect(handle.statusCode).to.be.eql(200);
    });
  

  it("fetches user successfully - vitest way", async () => {
    await new Users("https://reqres.in/api").readUser('2').then((res) => {
      console.log("Muthukumar: " + res.body.data.email);
      expect(res.statusCode).to.be.eql(200);
    });
  });

  afterAll(() => {
    // TODO - any teardown needed for this test suite
  });

});
  
