import { Injectable } from '@nestjs/common';
import { validateDate, validateHour } from '@schedule/core';

@Injectable()
export class ValidationService {
  validateDate(date: string): boolean {
    return validateDate(date);
  }

  validateHour(hour: number) {
    return validateHour(hour);
  }
}
