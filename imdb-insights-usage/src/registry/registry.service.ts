import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registry } from './entities/registry.entity';
import { Repository } from 'typeorm';
import { RegistryDto } from './dtos/registry.dto';

@Injectable()
export class RegistryService {
  constructor(
    @InjectRepository(Registry)
    private readonly registryRepository: Repository<Registry>,
  ) {}

  async saveRegistry(data: RegistryDto) {
    await this.registryRepository.save(data);
  }
}
