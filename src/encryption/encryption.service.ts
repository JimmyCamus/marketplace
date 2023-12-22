import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  SALT = 10;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT);
  }

  compare(value: string, compareTo: string): Promise<boolean> {
    return bcrypt.compare(value, compareTo);
  }
}
