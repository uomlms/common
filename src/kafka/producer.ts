import { Topics } from './topics';
import { Producer as KafkaProducer } from 'node-rdkafka';

interface Event {
  topic: Topics;
  data: any;
}

export abstract class Producer<T extends Event> {
  abstract topic: T['topic'];
  private producer: KafkaProducer;

  constructor(producer: KafkaProducer) {
    this.producer = producer;
  }

  produce(data: T['data']) {
    this.producer.produce(
      this.topic,
      null,
      this.parseData(data)
    );
  }

  parseData(data: any) {
    return Buffer.from(JSON.stringify(data));
  }
}