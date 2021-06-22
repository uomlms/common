import { Topics } from './topics';
import Kafka, { Message } from 'node-rdkafka';

interface Event {
  topic: Topics;
  data: any;
}

export abstract class Consumer<T extends Event> {
  abstract topic: T['topic'];
  abstract onMessage(data: T['data'], msg: Message): void;
  private client: Kafka.KafkaConsumer;

  constructor(client: Kafka.KafkaConsumer) {
    this.client = client;
  }

  subscribe() {
    this.client.subscribe([this.topic]);
    this.client.consume();
    this.client.on('data', (msg: Message) => {
      console.log(
        `Message received: ${this.topic}`
      );
      const data = this.parseMessage(msg);
      this.onMessage(data, msg);
    });
  }

  parseMessage(msg: Message) {
    const value = msg.value;
    try {
      return (value)
        ? JSON.parse(value.toString())
        : {};
    } catch (err) {
      console.error(`Could not parse message. Error: ${err}`);
      return {};
    }
  }
}