import { Module } from '@nestjs/common';
import { RegistryModule } from 'src/registry/registry.module';
import { RegistryService } from 'src/registry/registry.service';

@Module({
  imports: [RegistryModule],
  providers: [RegistryService],
})
export class KafkaConsumerModule {}
