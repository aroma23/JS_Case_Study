import request from 'supertest';
import chaiJsonSchema from 'chai-json-schema';
import { expect, use } from 'chai';
use(chaiJsonSchema);
import schema from '../schema/users.json' with { type: 'json' };

describe('Users Service APIs Testing', function() {
  
    it('responds with expected JSON structure', function(done) {
      request('https://reqres.in')
        .get('/api/users/')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8').end(done);
    });

    it('response matched with expected schema', function(done) {
      request('https://reqres.in').get('/api/users/').
      expect(function(res) {
        expect(res.body).to.be.jsonSchema(schema);
      }).end(done);
    });

    it('response should contain expected user', function(done) {
      request('https://reqres.in').get('/api/users/').
      expect(function(res) {
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0].id).to.equal(1);
        expect(res.body.data[0].email).to.equal('george.bluth@reqres.in');
        expect(res.body.data[0].avatar).to.contain('1-image.jpg');
      }).end(done);
    });    
  });
