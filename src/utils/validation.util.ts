import { BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

export class ValidationUtil {
  static validateObjectId(id: string): void {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter a correct id!!!');
    }
  }
}
