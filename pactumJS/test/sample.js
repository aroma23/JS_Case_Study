import pactum from 'pactum';
import { regex } from 'pactum-matchers';
import schema from '../schema/users.json' with { type: 'json' };

describe('Users Service APIs Testing', () => {
  
    it('response success', async() => {
      await pactum
      .spec()
      .get('https://reqres.in/api/users/')
      .expectStatus(200);
    });

    // it('responds with expected content-type', async() => {
    //   await pactum
    //   .spec()
    //   .get('https://reqres.in/api/users/')
    //   .expectStatus(200)
    //   .expectHeader('Content-Type', regex('application/json.*'));
    // });

    it('response matched with expected schema', async() => {
      await pactum
      .spec()
      .get('https://reqres.in/api/users/')
      .expectJsonSchema(schema);
    });

    it('response should contain expected user', async() => {
        await pactum
        .spec()
        .get('https://reqres.in/api/users/')
        .expectStatus(200)
        .expectJson('data[0].id', 1)
        .expectJson('data[0].email', 'george.bluth@reqres.in')
        .expectJsonMatch('data[0].avatar', regex('.*1-image.jpg'));        
    });    
  });