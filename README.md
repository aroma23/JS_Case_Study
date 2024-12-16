
<details>
  <summary>JS REST Test Frameworks Comparison</summary>
  

### Comparison
```
superTest:

Data-driven testing	--> Needs external setup through different libraries or file reading utilities which is complicated
Hooks --> no in built hooks (make use of the mocha's hooks) but not useful
Parallel execution is possible through the test runner (jest/mocha)
GraphQL	Requires manual setup which will take long time
JSON Schema Validation no inbuilt support, possible through external library (chai json schema)
REST & SOAP Support	REST + SOAP
HTTP Methods supports all the REST API methods. --> GET, POST, PUT, PATCH, DELETE
JSONPath is supported using external libraries.

pactum JS:

Data-driven testing	--> Native support for data driven testing through json (for any other file types, need to read the file and convert it a javascript object)
Hooks --> built in hooks along with the hooks from the test runner (we can write custom hooks as well)
Parallel execution is possible through the test runner (jest/mocha)
GraphQL	--> Native support for GraphQL as per the documentations (but didn't check)
JSON Schema Validation --> In built functions
REST & SOAP Support	REST only, SOAP is not supported (We need to use chaiXml library)
HTTP Methods supports all the REST API methods. --> GET, POST, PUT, PATCH, DELETE
JSONPath is supported natively

PACTUM JS --> we can setup the framework easily in quick time with built in support
SUPERTEST --> take some time to understand the flow and setup and relies mainly on external libraries
```

 ### superTest
```
Build on top of jest

pros
------
Can be combined with mocha for extended capabilities
Comparetively simple and lightweight than pactumjs

Cons
-----
Doesn't support contract testing (not a deal breaker)

```
sources: https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/

https://dev.to/heroku/comparing-the-top-3-javascript-testing-frameworks-2cco

### pactumjs

```
pros
----
Can be used with cucumber to enabled BDD style test
Suitable for pact / contract testing
Comes with inbuilt mock server
options to choose test runners like mocha, jest or cucumber

```

Sources: https://medium.com/@joaovitorcoelho10/pactumjs-a-next-gen-rest-api-testing-tool-ae88a9e51916

</details>

<details>
  <summary>Kafka</summary>
  
  ### Kafkajs	

  ```
Pros:
-----
Kafkajs -> using this, we can create client for both producer and consumer, send / Receive messages - useful for black box style testing (including integration/e2e)
KafkaJS node library looks promising and it has larger user base (47+ lakhs downloads)
Avro message format is supported here.
This library can be used for producing and consuming messages from Kafka stream but for data driven testing it needs external framework support.
Can be combined with Jest / Mocha
Can be used for Unit, Integration and E2E Testing  

Cons
-----
May not be suitable for performance testing

Things to be explored
----------------------
  If testing requires bombarded messages, need to figured out a way.
  If testing requires input messages in certain order, needs some digging and work around

  ```

  ### Example
  ```js
const { Kafka } = require('kafkajs');
const { createProducer } = require('./producer'); // Your producer module
const { createConsumer } = require('./consumer'); // Your consumer module

describe('Kafka Streaming Application', () => {
  let kafka;
  let producer;
  let consumer;

  beforeAll(async () => {
    kafka = new Kafka({ clientId: 'test-client', brokers: ['localhost:9092'] });
    producer = createProducer(kafka);
    consumer = createConsumer(kafka, 'test-group');
  });

  afterAll(async () => {
    await producer.disconnect();
    await consumer.disconnect();
  });

  it('produces messages to the correct topic', async () => {
    await producer.send('test-topic', { key: 'key1', value: 'value1' });
    // Verify that the message was sent to the correct topic (using mocking or a test consumer)
  });

  it('consumes messages from the correct topic', async () => {
    await producer.send('test-topic', { key: 'key2', value: 'value2' });
    const messages = await consumer.consume('test-topic');
    // Verify that the received messages are correct
  });
});
  ```

sources: 
1)
https://www.google.com/search?q=kafka+streaming+testing+using+javascript&oq=kafka+streaming+testing+using+javascript&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgoIARAAGIAEGKIEMgoIAhAAGIAEGKIEMgoIAxAAGKIEGIkFMgoIBBAAGIAEGKIE0gEIMTk5MmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8

2) https://kafka.js.org/docs/testing

3) https://www.kai-waehner.de/blog/2024/03/04/javascript-node-js-and-apache-kafka-full-stack-data-streaming-open-source/


### node-rdkafka
This is a Node.js binding to librdkafka, a C library for Kafka. It provides high-performance and real-time Kafka consumers and producers for Node.js. It supports integration testing by directly interacting with Kafka brokers.

```
Pros
---
Best for performance testing purpose

Cons
----
Seems learning curve is intense
Compatibility issues may raise during development, especially in CICD
Troubleshoot may be painful
Limited community support comparatively


```

Source: https://blizzard.github.io/node-rdkafka/current/
https://rclayton.silvrback.com/thoughts-on-node-rdkafka-development

### Kafka Mock Clients:
JEST / SINON helps mocking the kafka interaction, mainly useful for unit and component testing

other libs: kafkajs-mock, kafka-mock

</details>


<details>
  <summary>Playwright / Cypress cloud options</summary>
  
  ```
  playwright cloud
  ---------------
  https://github.com/microsoft/playwright-testing-service
  https://azure.microsoft.com/en-us/products/playwright-testing
  https://azure.microsoft.com/en-us/pricing/details/playwright-testing/
  ```
  ```
  cypress cloud
  --------------
  https://www.cypress.io/pricing
  ```



</details>


