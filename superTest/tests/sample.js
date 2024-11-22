const request = require('supertest');

describe('Users Service APIs Testing', function() {
    it('responds with expected JSON structure', function(done) {
      request('https://reqres.in')
        .get('/api/users/')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8').end(done);
    });
  });