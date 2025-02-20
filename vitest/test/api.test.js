import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import schema from '../schema/users.json' with { type: 'json' };
import pactum from 'pactum';
import property from '../resources/config.json'  with { type: 'json' };
import { regex } from 'pactum-matchers';
let env = process.env.ENV || "uat"


describe('API Test with vitest', () => {
    let config;
    beforeAll(() => {
        console.log("config of " + env);
        config = property[env]
        pactum.request.setBaseUrl(config.url);
        // TODO - any setup needed for this test suite
    })

    it('responds with expected schema', async () => {
        await pactum
            .spec()
            .get('/api/users')
            .expectStatus(200, 'OK')
            .expectJsonSchema(schema);
    });

    it('responds with expected json', async () => {
        await pactum
            .spec()
            .get('/api/users/1')
            .expectStatus(200, 'OK')
            .expectJson({
                "data": {
                    "id": 1,
                    "email": "george.bluth@reqres.in",
                    "first_name": "George",
                    "last_name": "Bluth",
                    "avatar": "https://reqres.in/img/faces/1-image.jpg"
                },
                "support": {
                    "url": "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
                    "text": "Tired of writing endless social media content? Let Content Caddy generate it for you."
                }
            })
            .expectJsonLike({
                "data": {
                    "id": 1,
                    "email": "george.bluth@reqres.in",
                    "first_name": "George",
                    "last_name": "Bluth",
                    "avatar": "https://reqres.in/img/faces/1-image.jpg"
                }
            }).expectResponseTime(100); //less than 100
    });

    it('Complex assertions with data and schema', async () => {
        await pactum.spec()
            .get('https://jsonplaceholder.typicode.com/users/10')
            .expectStatus(200)
            .expectJsonMatch({
                name: 'Clementina DuBuque',
                username: 'Moriah.Stanton'
            })
            .expectJson('email', 'Rey.Padberg@karina.biz')
            .expectJsonMatch('address.street', regex('.*Turnpike'))
            .expectHeader('server', 'cloudflare')
            .expectHeaderContains('content-type', 'application/json');
    });

    afterAll(() => {
        // TODO - any teardown needed for this test suite
    })
})
