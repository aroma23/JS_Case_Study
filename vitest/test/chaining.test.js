import pactum from 'pactum';
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('API Chaining with PactumJS', () => {

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
    await pactum.spec()
      .get('https://jsonplaceholder.typicode.com/users/{userId}')  // Use the userId from the first request
      .withPathParams('userId', '$S{userId}')  // Replace {userId} with the value stored in 'userId'
      .expectStatus(200)  // Expect status code 200 OK
      .expectJsonMatch({
        name: 'John Doe',
        username: 'johndoe'
      });

    // Step 3: Update the user's name
    await pactum.spec()
      .put('https://jsonplaceholder.typicode.com/users/{userId}')
      .withPathParams('userId', '$S{userId}')  // Replace {userId} with the stored userId
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

    // Step 4: Delete the user
    await pactum.spec()
      .delete('https://jsonplaceholder.typicode.com/users/{userId}')
      .withPathParams('userId', '$S{userId}')  // Replace {userId} with the stored userId
      .expectStatus(200);  // Expect status code 200 OK
  });

});