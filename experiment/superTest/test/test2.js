import request from 'supertest';
import chaiJsonSchema from 'chai-json-schema';
import { expect, use } from 'chai';
import properties from '../resources/properties.json' with { type: 'json' };
let env = process.env.ENV || 'dev';

describe('API', () => {
    let property = properties[env];
    let token; // Variable to store the token

    it('generate token', function (done) {

        var details = {
            "client_id": property.client_id,
            "client_secret": property.client_secret,
            "grant_type": property.grant_type,
            "scope": property.scope
        };

        var formBody = [];
        for (var prop in details) {
            var encodedKey = encodeURIComponent(prop);
            var encodedValue = encodeURIComponent(details[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response = request(property.authurl)
            .post('/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(formBody)
            .end(done);

        expect(response.status).to.equal(200); // Assert status code
        token = response.body.access_token; // Store the token for later use
        expect(token).toBeDefined(); // Ensure the token is not undefined or null
    });


    it('GET ', function (done) {
        let value = 'test';
        request(property.baseurl)
            .get(property.getendpoint)
            .set('Authorization', 'Bearer ' + token)
            .query('name', value)
            .expect(response.status).to.equal(200)
            .end(done);
    });

    it('POST', function (done) {
        let field = 'test';

        let body = {
            "version": 1
        }

        request(property.baseurl)
            .post(property.postendpoint)
            .set('headerKey', 'headerValue')
            .set('Authorization', 'Bearer ' + token)
            .send(body)
            .expect(response.status).to.equal(201)
            .end(done);
    });

    it('DELETE', function (done) {
        const response = request(property.baseurl)
            .delete(property.deleteendpoint + "/id")
            .set('headerKey', 'headerValue')
            .set('Authorization', 'Bearer ' + token)
            .expect(response.status).to.equal(200)
            .end(done);
    });

    it('PATCH', function (done) {
        const id = '';
        const body = {}
        const response = request(property.baseurl)
            .patch(property.patchendpoint + '/id')
            .set('headerKey', 'headerValue')
            .set('Authorization', 'Bearer ' + token)
            .send(body)
            .expect(response.status).to.equal(200)
            .end(done);
    });
});