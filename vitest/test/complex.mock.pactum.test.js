import pactum from 'pactum';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mock, settings } from 'pactum';
import { like } from 'pactum-matchers';

describe('Demonstrating that Pactum API mocking can', () => {

    beforeAll(async () => {
        settings.setLogLevel('ERROR');
        await mock.start(9876);
    });

    it('match requests based on query parameter values', async () => {

        addQueryParameterRequestMatchingResponses();

        await pactum.spec()
            .get('http://localhost:9876/api/zip?zipcode=90210')
            .expectStatus(200)
            .expectJsonMatch('city', 'Beverly Hills')

        await pactum.spec()
            .get('http://localhost:9876/api/zip?zipcode=12345')
            .expectStatus(200)
            .expectJsonMatch('city', 'Schenectady')

        await pactum.spec()
            .get('http://localhost:9876/api/zip?zipcode=55555')
            .expectStatus(404)
    });

    it('return a REST response with a delay', async () => {

        addDelayedResponse();

        await pactum.spec()
            .get('http://localhost:9876/api/delay')
            .expectStatus(200)
            .expectResponseTime(10005)
    });

    it.each(
        [[1], [2], [3]]
    )('use response templating to return the expected message for user %i', async (userId) => {

        addReusePathParameterValueResponse();

        await pactum.spec()
            .get('http://localhost:9876/api/user/{user}')
            .withPathParams('user', userId)
            .expectStatus(200)
            .expectJsonMatch('message', `Returning data for user ${userId}`)
    });

    afterAll(async () => {

        await mock.stop()
    });
});

function addQueryParameterRequestMatchingResponses() {

    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/zip',
            queryParams: {
                zipcode: 90210
            }
        },
        response: {
            status: 200,
            body: {
                zipcode: 90210,
                city: 'Beverly Hills'
            }
        }
    });

    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/zip',
            queryParams: {
                zipcode: 12345
            }
        },
        response: {
            status: 200,
            body: {
                zipcode: 12345,
                city: 'Schenectady'
            }
        }
    });
}

function addDelayedResponse() {

    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/delay'
        },
        response: {
            status: 200,
            fixedDelay: 1000
        }
    })
}

function addReusePathParameterValueResponse() {

    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/user/{id}',
            pathParams: {
                id: like('random-id')
            }
        },
        stores: {
            userId: 'req.pathParams.id'
        },
        response: {
            status: 200,
            body: {
                message: `Returning data for user $S{userId}`
            }
        }
    });
}

// TODO - Fix needed here
// Conditional mocking using intercept

// describe('Mocking Multiple API Calls with Chained Responses', () => {

//     pactum.request.intercept({
//       request: (ctx) => {
//         if (ctx.req.url.includes('https://api.example.com/users')) {
//           ctx.res.body = { userId: 1, name: 'Alice' };
//           ctx.res.statusCode = 200;
//         } else if (ctx.req.url.includes('https://api.example.com/orders')) {
//           const userId = ctx.req.query.userId;
//           if (userId === '1') {
//             ctx.res.body = [{ orderId: 101, product: 'Laptop' }];
//           } else {
//             ctx.res.body = [];
//           }
//           ctx.res.statusCode = 200;
//         }
//         return ctx;
//       }
//     });
  
//     it('should get user and orders', async () => {
//       const userResponse = await pactum.spec().get('https://api.example.com/users').withQuery('userId', '1');
//       const ordersResponse = await pactum.spec().get('https://api.example.com/orders').withQuery('userId', '1');
  
//       expect(userResponse.status).toBe(200);
//       expect(userResponse.body.name).toBe('Alice');
//       expect(ordersResponse.status).toBe(200);
//       expect(ordersResponse.body[0].product).toBe('Laptop');
//     });
  
//   });