<details>
  <summary>Kafka</summary>
  
  ### Kafkajs
	kafkajs -> using this we can create client for both producer and consumer, send / Receive messages - usefule for black box style testing (including integration/e2e)

	Pros:
	-----
	Can be combined with Jest / Mocha
	Can be used for Unit and Integration Testing

	Things to be explored
	----------------------
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

  source: https://www.google.com/search?q=kafka+streaming+testing+using+javascript&oq=kafka+streaming+testing+using+javascript&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgoIARAAGIAEGKIEMgoIAhAAGIAEGKIEMgoIAxAAGKIEGIkFMgoIBBAAGIAEGKIE0gEIMTk5MmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8
</details>