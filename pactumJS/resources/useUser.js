// useUser.js
import pactum from 'pactum';

const useUser = async (userData) => {
  const userResponse = await pactum.spec()
    .post('https://example.com/api/users')
    .withJson(userData)
    .expectStatus(201);
  const userId = userResponse.json.id;
  return userId;
};

export default useUser;