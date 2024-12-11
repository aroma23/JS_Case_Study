// useAuthToken.js
import pactum from 'pactum';

const useAuthToken = async () => {
  const tokenResponse = await pactum.spec()
    .get('https://example.com/api/auth/token')
    .expectStatus(200);
  const token = tokenResponse.json.token;
  return token;
};

export default useAuthToken;