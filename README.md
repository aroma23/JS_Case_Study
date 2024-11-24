<details>
  <summary>Kafka</summary>
  
  ### Kafkajs
	kafkajs -> using this, we can create client for both producer and consumer, send / Receive messages - usefule for black box style testing (including integration/e2e)

  ```
Pros:
-----
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
  <summary>JS REST Test Frameworks Comparison</summary>
  
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


