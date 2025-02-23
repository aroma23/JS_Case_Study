import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Users } from 'users-es6-pactum-package'
import pactum, { expect as pactumExpect, expectStatus } from "pactum";
import dotenv from "dotenv";

describe('API Test with vitest', () => {
  const users = new Users("https://reqres.in/api");
  beforeAll(() => {
    // Load environment variables from .env file for standalone tests
    dotenv.config();
    let baseURL = process.env.API_BASE_URL || "http://localhost:8000";
    pactum.request.setBaseUrl(baseURL);
  })

  it("read user successfully - pactum way3", async () => {
    const spec = pactum.spec();
    await users.readUser('2', spec);
    await spec.expectStatus(200);
  });

  it("read user successfully - pactum way", async () => {
    const handle = await users.readUser('2');
    pactumExpect(handle).to.have.status(200);
    expect(handle.statusCode).to.be.eql(200);
  });


  it("fetches user successfully - vitest way", async () => {
    await users.readUser('2').then((res) => {
      console.log("fetches user successfully - vitest way: " + res.body.data.email);
      expect(res.statusCode).to.be.eql(400);
    });
  });

  it("add users successfully - pactum way - 2", async () => {
    await pactum.spec()
      .post('https://reqres.in/api/users')
      .withBody({
        "name": "morpheus",
        "job": "leader",
        "id": "966",
        "createdAt": "2025-02-22T17:32:18.618Z"
      }).expectStatus(201).returns((ctx) => {
        console.log("add users successfully - pactum way - 2: " + ctx.res.body.name);
      });
  });

  it("add users successfully - pactum way", async () => {
    const spec = pactum.spec();
    await users.addUser({
      "name": "morpheus",
      "job": "leader",
      "id": "966",
      "createdAt": "2025-02-22T17:32:18.618Z"
    }, spec);
    await spec.expectStatus(400, 'created');
    console.log(await spec.returns('name'));
  });

  it("add users successfully - vitest way", async () => {
    await users.addUser({
      "name": "muthukumar",
      "job": "leader",
      "id": "966",
      "createdAt": "2025-02-22T17:32:18.618Z"
    }).then((res) => {
      expect(res.statusCode).to.be.eql(201);
      console.log("add users successfully - vitest way: " + res.body.name);
    });
  });

  afterAll(() => {
    // TODO - any teardown needed for this test suite
  });

});

