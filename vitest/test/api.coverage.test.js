import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import pactum from 'pactum';
const psc = require('pactum-swagger-coverage');
const reporter = pactum.reporter;
const { mock } = require('pactum');

describe('API Test with vitest', () => {
    beforeAll(() => {
        psc.swaggerYamlPath = './swagger/users.yml';
        psc.reportFile = 'users-coverage.json';
        psc.basePath = '/v1';
        reporter.add(psc);
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/v1/users'
            },
            response: {
                status: 200
            }
        });        
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/v1/user',
                queryParams: {
                    id: 1
                }
            },
            response: {
                status: 200,
                body: 'user 1'
            }
        });        
        mock.start(3000);
        pactum.request.setBaseUrl('http://localhost:3000');
    })

    it('responds with expected schema', async () => {
        await pactum
            .spec()
            .get('/v1/users')
            .expectStatus(200, 'OK');
    });

    afterAll(() => {
        mock.stop();
        return reporter.end();
    })
})
