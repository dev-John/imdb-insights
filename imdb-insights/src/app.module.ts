import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaService } from './kafka/kafka.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService, KafkaService],
})
export class AppModule {}
