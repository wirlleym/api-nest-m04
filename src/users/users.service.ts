import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entities';

@Injectable()
export class UsersService {
  users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuid(),
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }
}
