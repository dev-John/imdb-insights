import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { RegistryService } from './registry/registry.service';
import { RegistryModule } from './registry/registry.module';
import { KafkaConsumerModule } from './kafka-consumer/kafka-consumer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registry } from './registry/entities/registry.entity';

@Module({
  imports: [
    RegistryModule,
    KafkaConsumerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Registry],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, KafkaConsumerService, RegistryService],
})
export class AppModule {}
