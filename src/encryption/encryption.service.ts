import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  SALT = 10;

  hash = (value: string) => {
    return bcrypt.hash(value, this.SALT);
  };
}
