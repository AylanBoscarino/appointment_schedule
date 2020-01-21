import { Module, Global } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import {} from '@schedule/core';

@Global()
@Module({
  providers: [ValidationService],
})
export class UtilModule {}
