import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registry } from './entities/registry.entity';
import { RegistryService } from './registry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Registry])],
  providers: [RegistryService],
  exports: [TypeOrmModule],
})
export class RegistryModule {}
