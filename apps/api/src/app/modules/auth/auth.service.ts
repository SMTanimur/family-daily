/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersRepository.validateUser(email, password);
  }
}
