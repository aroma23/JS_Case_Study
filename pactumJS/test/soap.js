import pactum from 'pactum';
import {expect, use} from 'chai';
import chaiXml from 'chai-xml';
use(chaiXml);

describe('SOAP Service Testing', () => {

    it('response success', async () => {
        await pactum
            .spec()
            .post('https://www.w3schools.com/xml/tempconvert.asmx')
            .withHeaders('Content-Type', 'text/xml')
            .withBody(`<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <FahrenheitToCelsius xmlns="https://www.w3schools.com/xml/">
            <Fahrenheit>75</Fahrenheit>
        </FahrenheitToCelsius>
    </soap12:Body>
</soap12:Envelope>`)
            .expectStatus(200)
            .expect((xml) => {
                const data = xml.res.body;
                console.log(data);
                expect(data).xml.to.be.valid();
                expect(data).xml.to.be.valid();
                expect(data).xml.to.equal(`<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><FahrenheitToCelsiusResponse xmlns="https://www.w3schools.com/xml/"><FahrenheitToCelsiusResult>23.8888888888889</FahrenheitToCelsiusResult></FahrenheitToCelsiusResponse></soap:Body></soap:Envelope>`);
                expect(data).xml.to.equal(`<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><FahrenheitToCelsiusResponse xmlns="https://www.w3schools.com/xml/"><FahrenheitToCelsiusResult>23.8888888888889</FahrenheitToCelsiusResult></FahrenheitToCelsiusResponse></soap:Body></soap:Envelope>`);
                expect(data).xml.to.contains(`<FahrenheitToCelsiusResult>23.8888888888889</FahrenheitToCelsiusResult>`);
            })
            .expectBodyContains('FahrenheitToCelsiusResult')
            .expectBodyContains('23.8888888888889');
    });
});