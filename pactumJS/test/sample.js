import pactum from 'pactum';
import schema from '../schema/users.json' with { type: 'json' };

describe('Users Service APIs Testing', () => {
  
    it('responds with expected JSON structure', async() => {
      await pactum
      .spec()
      .get('https://reqres.in/api/users/')
      .expectStatus(200);        
    });

    it('response matched with expected schema', async() => {
      await pactum
      .spec()
      .get('https://reqres.in/api/users/')
      .expectJsonSchema(schema);
    });

    // it('response should contain expected user', function(done) {
    //   request('https://reqres.in').get('/api/users/').
    //   expect(function(res) {
    //     expect(res.body.data).to.be.an('array');
    //     expect(res.body.data[0].id).to.equal(1);
    //     expect(res.body.data[0].email).to.equal('george.bluth@reqres.in');
    //     expect(res.body.data[0].avatar).to.contain('1-image.jpg');
    //   }).end(done);
    // });    
  });