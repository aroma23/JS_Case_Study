import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import pactum from 'pactum';
const { mock } = require('pactum');

describe('API Test pactumjs mock', () => {
    beforeAll(() => {
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/api/hello'
            },
            response: {
                status: 200,
                body: 'Hello, 👋'
            }
        });
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/api/users',
                queryParams: {
                    id: 1
                }
            },
            response: {
                status: 200,
                body: 'user 1'
            }
        });
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/api/users',
                queryParams: {
                    id: 2
                }
            },
            response: {
                status: 200,
                body: 'user 2'
            }
        });
        mock.start(3000);
        pactum.request.setBaseUrl('http://localhost:3000');
    })

    it('mock api responds with 200 ok', async () => {
        await pactum
            .spec()
            .get('/api/hello')
            .expectStatus(200, 'OK')
            .expectBody('Hello, 👋');
    });

    it('mock user api for query id 1 responds with correct user', async () => {
        await pactum
            .spec()
            .get('/api/users?id=1')
            .expectStatus(200, 'OK')
            .expectBody('user 1');
    });

    it('mock user api for query id 2 responds with correct user', async () => {
        await pactum
            .spec()
            .get('/api/users?id=2')
            .expectStatus(200, 'OK')
            .expectBody('user 2');
    });

    afterAll(() => {
        // TODO - any teardown needed for this test suite
        mock.stop();
    })
})
