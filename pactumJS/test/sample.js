import pactum from 'pactum';
import { regex } from 'pactum-matchers';
import schema from '../schema/users.json' with { type: 'json' };
import properties from '../resources/properties.json' with { type: 'json' };
let env = process.env.ENV;

describe('Users Service APIs Testing', () => {
    let property;

    before('setup', () => {
        console.log("properties of " + env);
        property = eval('properties.'+ env);
        pactum.request.setBaseUrl(property.url);
    })

    it('response success', async() => {
      await pactum
      .spec()
      .get('/api/users/')
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
      .get('/api/users/')
      .expectJsonSchema(schema);
    });

    it('response should contain expected user', async() => {
        await pactum
        .spec()
        .get('/api/users/')
        .expectStatus(200)
        .expectJson('data[0].id', 1)
        .expectJson('data[0].email', property.email)
        .expectJsonMatch('data[0].avatar', regex('.*1-image.jpg'));        
    });    
  });