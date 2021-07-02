import rdKafka from 'node-rdkafka';

/**
 * Singleton Class.
 */
class Kafka {
  private _producer?: rdKafka.Producer;
  private _consumer?: rdKafka.KafkaConsumer;

  get producer() {
    if (!this._producer) {
      throw new Error("Cannot access Kafka producer before connecting");
    }
    return this._producer
  }

  get consumer() {
    if (!this._consumer) {
      console.log("Consumer is: " + this._consumer);
      throw new Error("Cannot access Kafka consumer before connecting");
    }
    return this._consumer;
  }

  /**
   * Establish producer's connections with kafka.
   *  
   * @param url 
   * @returns Promise
   */
  connectProducer(url: string) {
    this._producer = new rdKafka.Producer({
      'metadata.broker.list': url,
    });

    this._producer.connect();

    return new Promise<void>((resolve, reject) => {
      this.producer.on('ready', () => {
        console.log('Kafka Producer Connected');
        resolve();
      });

      this.producer.on('event.error', (err) => {
        reject(err);
      });
    });
  }

  connectConsumer(url: string, groupId: string) {
    this._consumer = new rdKafka.KafkaConsumer({
      'group.id': groupId,
      'metadata.broker.list': url,
      'allow.auto.create.topics': true
    }, {});

    this._consumer.connect();

    return new Promise<void>((resolve, reject) => {
      this.consumer.on('ready', () => {
        console.log('Kafka Consumer Connected');
        resolve();
      });

      this.consumer.on('event.error', (err) => {
        reject(err);
      });
    });
  }
}


export const kafka = new Kafka();