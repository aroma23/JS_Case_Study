import pactum from 'pactum';
import { regex } from 'pactum-matchers';
import properties from '../resources/properties.json' with { type: 'json' };
let env = process.env.ENV;


describe('API', () => {
    env = 'dev';
    let property;
    // let token;

    before('setup', () => {
        console.log("properties of " + env);
        property = eval('properties.' + env);
    })

    it('generate token', async () => {

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

        const response = await pactum.spec()
            .post(property.authurl)
            .withHeaders('content-type', 'application/x-www-form-urlencoded')
            .withBody(formBody)
            .expectStatus(200)
            .stores('token', 'access_token');

    });

    it('GET API', async () => {
        const response = await pactum
            .spec()
            .get(property.baseurl + property.getendpoint)
            .withBearerToken('$S{token}')
            .withQueryParams('queryParamKey', 'queryParamValue')
            .expectStatus(200)
            .expectJsonMatch('[0].field', 'value');
    });

    it('POST API', async () => {
        let test = 'test';

        let body = {
            "version": 1
        };

        const response = await pactum
            .spec()
            .post(property.baseurl + property.postendpoint)
            .withHeaders('headerKey', 'headerValue')
            .withBearerToken('$S{token}')
            .withBody(body)
            .expectStatus(201)
            .stores('id', 'id')
            .expectJsonMatch('[0].test', test)
            .inspect();
    });

    it('DELETE API', async () => {
        const response = await pactum
            .spec()
            .delete(property.baseurl + property.deleteendpoint)
            .withHeaders('headerKey', 'headerValue')
            .withBearerToken('$S{token}')
            .withPathParams('id', '$S{id}')
            .expectStatus(200);
    });


    const testData = [
        { name: 'invalid', token: '1234', expectedStatus: 401 },
        { name: 'expired', token: 'eyfdfeifbenfkds', expectedStatus: 401 },
    ];

    testData.forEach(({ name, token, expectedStatus }) => {
        it(`GET API - Scenario - ${name} token`, async () => {
            await pactum
                .spec()
                .get(property.baseurl + property.getendpoint)
                .withBearerToken(token)
                .withQueryParams('queryParamKey', 'queryParamValue')
                .expectStatus(expectedStatus);
        });
    });

    it('PATCH API', async () => {
        const id = '';
        const body = {}
        const response = await pactum
            .spec()
            .patch(property.baseurl + property.patchendpoint)
            .withHeaders('headerKey', 'headerValue')
            .withBearerToken('$S{token}')
            .withBody(body)
            .withPathParams('id', id)
            .expectStatus(200);
    });
});