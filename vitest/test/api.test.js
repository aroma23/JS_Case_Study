import { describe, it, expect, beforeAll } from 'vitest'
import schema from '../schema/users.json' with { type: 'json' };
import pactum from 'pactum'
import property from '../resources/config.json'  with { type: 'json' };
let env = process.env.ENV;


describe('API Test with vitest', () => {    
    let config;
    beforeAll( () => {
        console.log("config of " + env);        
        config = property[env]
        pactum.request.setBaseUrl(config.url);
    })

    it('responds with expected content-type', async() => {
      await pactum
      .spec()
      .get('/api/users/')
      .expectStatus(200, 'OK')
      .expectJsonSchema(schema);
    });  
})
