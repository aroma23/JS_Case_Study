import pactum from 'pactum';
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('API Chaining with vitest error handling', () => {

    it('should create, retrieve, update, and delete a user', async () => {
        let userId;

        // Step 1: Create a new user
        await pactum.spec()
            .post('https://jsonplaceholder.typicode.com/users')
            .withJson({
                name: 'John Doe',
                username: 'johndoe',
                email: 'johndoe@example.com'
            })
            .expectStatus(201)  // Status code: 201 Created
            .stores('userId', 'id'); // Store the 'id' from the response to be used later

        // Step 2: Get the user by ID

        try {
            await pactum.spec()
                .get('https://jsonplaceholder.typicode.com/users/{userId}')  // Use the userId from the first request
                .withPathParams('userId', '$S{userId}')  // Replace {userId} with the value stored in 'userId'
                .expectStatus(200)  // Expect status code 200 OK
                .expectJsonMatch({
                    name: 'John Doe',
                    username: 'johndoe'
                }
                );
        } catch (error) {
            console.log('Caught error:', error.message);
            // expect(error.message).contains('HTTP status 404 !== 200');  // Manually assert the error message
            expect(error.message).toBe('HTTP status 404 !== 200\n\n404 !== 200\n');  // Manually assert the error message
        }
    });
});