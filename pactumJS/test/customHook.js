// example.test.js
import pactum from 'pactum';
import useUser from '../resources/useUser.js';
import useAuthToken from '../resources/useAuthToken.js';

describe('Example API Custom hook', () => {
  it('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const userId = await useUser(userData);
    await pactum.spec()
      .get(`https://example.com/api/users/${userId}`)
      .expectStatus(200);
  });

  it('should return user data', async () => {
    const token = await useAuthToken();
    await spec()
      .get('https://example.com/api/user')
      .withHeaders('Authorization', `Bearer ${token}`)
      .expectStatus(200);
  });

});
