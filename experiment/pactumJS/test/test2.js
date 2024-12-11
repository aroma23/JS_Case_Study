import pactum from 'pactum';
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

    it('PUT API ', async () => {
        const body = {
            "body":"body"
        };
        const response = await pactum
            .spec()
            .put(property.baseurl + property.putendpoint)
            .withHeaders('HeaderKey', 'HeaderValue')
            .withHeaders('requestId', uuid)
            .withBody(body)
            .expectStatus(200);
    });

    it('GET API', async () => {
        await pactum
            .spec()
            .get(property.baseurl + property.getendpoint)
            .withHeaders('requestId', uuid)
            .withQueryParams('queryParamKey', 'queryParamValue')
            .expectStatus(200)
            .expectJsonMatch('field', 'value');
    });

    it('DELETE API', async () => {
        await pactum
            .spec()
            .delete(property.baseurl + property.deleteendpoint)
            .withHeaders('requestId', uuid)
            .withPathParams('pathParamKey', 'pathParamValue')
            .withQueryParams('queryParamKey', 'queryParamValue')
            .expectStatus(204);
    });

});