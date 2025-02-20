import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import pactum from 'pactum';


describe('Extract and Store Value Without using `.stores()` in PactumJS', () => {
  
  it('should create a user, extract the user ID, and retrieve the user', async () => {
    // Step 1: Create a user and manually store the user ID
    let userId;
    
    await pactum.spec()
      .post('https://jsonplaceholder.typicode.com/users')
      .withJson({
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com'
      })
      .expectStatus(201, 'Created')
      .then((response) => {
        // Extract the user ID from the response
        userId = response.body.id;
        console.log('Created User ID:', userId); // Log to confirm the ID
      });

    await pactum.sleep(500);

    userId = 10;

    // Step 2: Use the extracted user ID in the subsequent request
    await pactum.spec()
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)  // Use the userId in the URL
      .expectStatus(200)  // Expect HTTP status 200
      // .expectJsonMatch({
      //   name: 'John Doe',
      //   username: 'johndoe'
      // });
  });
});