import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { RegistryDto } from 'src/registry/dtos/registry.dto';
import { RegistryService } from 'src/registry/registry.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer;

  constructor(private readonly registryService: RegistryService) {
    this.kafka = new Kafka({
      clientId: 'imdb-insights',
      brokers: ['0.0.0.0:9092'],
    });

    this.consumer = this.kafka.consumer({ groupId: 'imdb-insights-consumer' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'imdb-insights' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received data => ', {
          topic,
          partition,
          message: message.value.toString(),
        });

        const data = JSON.parse(message.value.toString()) as RegistryDto;

        await this.registryService.saveRegistry(data);
      },
    });
  }
}
