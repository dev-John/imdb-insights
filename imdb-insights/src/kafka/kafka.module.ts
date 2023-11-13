import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Module({
  providers: [KafkaService],
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'imdb-insights',
            brokers: ['0.0.0.0:9092'],
          },
          consumer: {
            groupId: 'imdb-insights-consumer',
          },
        },
      },
    ]),
  ],
})
export class KafkaModule {}
