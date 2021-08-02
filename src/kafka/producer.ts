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

    this.producer.on('event.error', (err) => {
      console.error('Error from producer', err)
    });
  }

  produce(data: T['data']) {
    console.log("Producing Data: ", data);
    this.producer.produce(
      this.topic,
      null,
      this.parseData(data),
      null,
      Date.now(),
      (err: Error, offset: any) => {
        if (err) { console.log(err); return; }
        console.log("Offset: " + offset);
      }
    );
  }

  parseData(data: any) {
    return Buffer.from(JSON.stringify(data));
  }
}