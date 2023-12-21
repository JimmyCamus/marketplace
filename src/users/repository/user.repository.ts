import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getUserBy(strategy: object): Promise<User> {
    return this.userRepository.findOneBy(strategy);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const userEnity = this.userRepository.create({
      email: createUserDto.email,
      city: createUserDto.city,
      password: createUserDto.password,
      country: createUserDto.country,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
    });
    return this.userRepository.save(userEnity);
  }

  updateUser(updateUserDto: UpdateUserDto, userEntity: User): Promise<User> {
    userEntity.firstName = updateUserDto.firstName;
    userEntity.lastName = updateUserDto.lastName;
    userEntity.city = updateUserDto.city;
    userEntity.country = updateUserDto.country;
    userEntity.phone = updateUserDto.phone;
    return this.userRepository.save(userEntity);
  }

  removeUser(userEnity: User): Promise<User> {
    userEnity.isActive = false;
    return this.userRepository.save(userEnity);
  }
}
