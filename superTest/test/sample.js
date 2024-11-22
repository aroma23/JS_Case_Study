import request from 'supertest';
import chaiJsonSchema from 'chai-json-schema';
import { expect, use } from 'chai';
use(chaiJsonSchema);
// import schema from './schema/users.json' with { type: 'json' };


describe('Users Service APIs Testing', function() {
  const schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "page": {
        "type": "integer"
      },
      "per_page": {
        "type": "integer"
      },
      "total": {
        "type": "integer"
      },
      "total_pages": {
        "type": "integer"
      },
      "data": {
        "type": "array",
        "items": [
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "email",
              "first_name",
              "last_name",
              "avatar"
            ]
          },
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "email",
              "first_name",
              "last_name",
              "avatar"
            ]
          },
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "email",
              "first_name",
              "last_name",
              "avatar"
            ]
          },
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "email",
              "first_name",
              "last_name",
              "avatar"
            ]
          },
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "email",
              "first_name",
              "last_name",
              "avatar"
            ]
          },
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "email",
              "first_name",
              "last_name",
              "avatar"
            ]
          }
        ]
      },
      "support": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string"
          },
          "text": {
            "type": "string"
          }
        },
        "required": [
          "url",
          "text"
        ]
      }
    },
    "required": [
      "page",
      "per_page",
      "total",
      "total_pages",
      "data",
      "support"
    ]
  };

    it('responds with expected JSON structure', function(done) {
      request('https://reqres.in')
        .get('/api/users/')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8').end(done);
    });

    it('response match with right schema', function(done) {
      request('https://reqres.in').get('/api/users/').
      expect(function(res) {
        expect(res.body).to.be.jsonSchema(schema);
      }).end(done);
    });
  });