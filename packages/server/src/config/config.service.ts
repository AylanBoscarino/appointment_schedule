import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class ConfigService {
  get(variable: string): string | undefined {
    return process.env[variable];
  }
}
