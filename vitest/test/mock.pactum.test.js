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

        mock.start(3000);
        pactum.request.setBaseUrl('http://localhost:3000');
    })

    it('responds with expected schema', async () => {
        await pactum
            .spec()
            .get('/api/hello')
            .expectStatus(200, 'OK')
            .expectBody('Hello, 👋');
    });

    afterAll(() => {
        // TODO - any teardown needed for this test suite
        mock.stop();
    })
})
