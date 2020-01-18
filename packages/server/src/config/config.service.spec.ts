import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have database name', () => {
    expect(service.get('DATABASE_NAME')).toBeDefined();
  });

  it('should have a database type', () => {
    expect(service.get('DATABASE_TYPE')).toBeDefined();
  });
});
