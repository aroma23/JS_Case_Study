import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
// import {StringUtils} from 'users-es6-pactum-package';
const { StringUtils } = require('users-es6-pactum-package/utils');
import {Users, Salesforce} from 'users-es6-pactum-package/clients';
// const {Users, Salesforce} = require ('users-es6-pactum-package/clients');
import pactum, { expect as pactumExpect, expectStatus } from "pactum";

describe('API Test with vitest', () => {
  beforeAll(() => {
    // const baseUrl = process.env.VITE_USERS_API_BASE_URL || '"VITE_USERS_API_BASE_URL" is not set in .env file';
    // console.info("Tests are targetted for config : " + process.env.VITE_ENV_LABEL);
    // console.info("VITE_SECRET_KEY : " + process.env.VITE_SECRET_KEY);
    // console.info("BASE URL : " + baseUrl);
    // pactum.request.setBaseUrl(baseUrl);
  })

  it("read user successfully - pactum way3", async () => {
    const handle = pactum.spec();
    await Users.readUser('2', handle);
    await handle.expectStatus(200);
    Salesforce.readSalesforce();
    Salesforce.writeSalesforce();
    console.log(Salesforce.Methods.readSalesforce);
    console.log(StringUtils.capitalize("hello"));
    console.log("process.env: " + process.env);
    console.log("process.env: " + process.env);
    console.log("process.env: " + process.env['VITE_USERS_API_BASE_URL']);
  });

  it("read user successfully - pactum way", async () => {
    const handle = await Users.readUser('2');
    pactumExpect(handle).to.have.status(200);
    expect(handle.statusCode).to.be.eql(200);
  });


  it("fetches user successfully - vitest way", async () => {
    await Users.readUser('2').then((res) => {
      console.log("fetches user successfully - vitest way: " + res.body.data.email);
      expect(res.statusCode).to.be.eql(200);
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
    await Users.addUser({
      "name": "morpheus",
      "job": "leader",
      "id": "966",
      "createdAt": "2025-02-22T17:32:18.618Z"
    }, spec);
    await spec.expectStatus(201, 'created');
    console.log(await spec.returns('name'));
  });

  it("add users successfully - vitest way", async () => {
    await Users.addUser({
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

