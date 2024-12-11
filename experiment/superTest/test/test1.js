
import properties from '../resources/properties.json' with { type: 'json' };
import {v4 as uuidv4} from 'uuid';
let env = process.env.ENV;

describe('API', () => {
    env = 'qa';
    let property;
    let uuid;

    before('setup', () => {
        console.log("properties of " + env);
        property = eval('properties.' + env);
    });

    beforeEach('generate uuid', () => {
        uuid = uuidv4();
    })


    it('PUT', function(done) {
        
        const body = {
            "body": {
                "body": "body"
            }
        };
        request(property.baseurl)
            .put(property.putendpoint)
            .set('headerKey', 'headerValue')
            .set('requestId', uuid)
            .send(body)
            .expect(response.status).to.equal(200)
            .end(done);
      });

    it('GET API', function (done) {
        request(property.baseurl)
        .get( property.getendpoint)
            .set('id', uuid)
            .query('queryParamKey', 'queryParamValue')
            .expect(response.status).to.equal(200)
            .end(done);
    });

    it('DELETE API', function (done) {
        request(property.baseurl)
        .delete( property.deleteendpoint+'/pathparamvalue')
            .set('headerKey', 'headervalue')
            .query('queryParamKey', 'queryParamValue')
            .expect(response.status).to.equal(204)
            .end(done);
    });

});