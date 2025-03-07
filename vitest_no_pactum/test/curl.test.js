import { describe, it, beforeEach, expect } from 'vitest';
import pactum from "pactum";
const { pactumEvents, EVENT_TYPES } = require('pactum').events;

pactumEvents.on(EVENT_TYPES.BEFORE_REQUEST, (cxt) => {
    // console.log(cxt);
    // console.log(cxt.request.headers);

    const headers = cxt.request.headers;
    const body = JSON.stringify(cxt.request.body);

    let curlCommand = `curl -X ${cxt.request.method} '${cxt.request.url}' `;

    for (const header in headers) {
        curlCommand += `-H '${header}: ${headers[header]}' `;
    }

    if (body && body !== "undefined") {
        curlCommand += `-d '${body}'`;
    }

    console.log(curlCommand);

});
// pactumEvents.on(EVENT_TYPES.AFTER_RESPONSE, (cxt) => {
//   console.log(cxt.response.body);
// });


describe.concurrent('curl testing', () => {

    beforeEach(() => {
        console.log('Running Test:', expect.getState().currentTestName);
    });

    it('should post make a request', async () => {
        await pactum.spec()
            .post('https://reqres.in/api/users')
            .withHeaders('Content-Type', 'application/json')
            .withBody({
                "name": "morpheus",
                "job": "leader",
                "id": "966",
                "createdAt": "2025-02-22T17:32:18.618Z"
            }).expectStatus(201);
    });

    it('should get make a request', async () => {
        await pactum.spec()
            .get('https://reqres.in/api/users/3')
            .withHeaders('Content-Type', 'application/json')
            .expectStatus(200);
    });

    it('should get with query params make a request', async () => {
        const handle = await pactum.spec()
            .get('https://reqres.in/api/users')
            .withQueryParams('id', '4')
            .withHeaders('Content-Type', 'application/json')
            .expectStatus(200);
    });

    it('should put with query params make a request', async () => {
        await pactum.spec()
            .put('https://jsonplaceholder.typicode.com/users/{userId}')
            .withPathParams('userId', '3')  // Replace {userId} with the stored userId
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                name: 'Jane Doe',  // Update the user's name
                username: 'johndoe',
                email: 'johndoe@example.com'
            })
            .expectStatus(200)  // Expect status code 200 OK
            .expectJsonMatch({
                name: 'Jane Doe',
                username: 'johndoe'
            });
    });

});