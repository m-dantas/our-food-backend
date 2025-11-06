import { randomBytes } from 'node:crypto';
import { HashingServiceProtocol } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BCryptService extends HashingServiceProtocol {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  generatePassword(length: number): string {
    return randomBytes(length).toString('base64').slice(0, length);
  }
}
