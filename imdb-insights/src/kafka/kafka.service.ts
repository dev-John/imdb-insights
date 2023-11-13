import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'imdb-insights',
      brokers: ['0.0.0.0:9092'],
    });

    this.producer = this.kafka.producer();
    this.connect();
  }

  async connect() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic: topic,
      messages: [{ value: message }],
    });
  }
}
