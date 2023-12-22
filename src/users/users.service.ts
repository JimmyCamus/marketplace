import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.getUserBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new HttpException('email is already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.encryptionService.hash(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    const userEntity = await this.userRepository.createUser(createUserDto);
    userEntity.password = null;
    return userEntity;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  async findBy(strategy: object): Promise<User> {
    return await this.userRepository.getUserBy(strategy);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userEntity = await this.userRepository.getUserById(id);
    return await this.userRepository.updateUser(updateUserDto, userEntity);
  }

  async remove(id: number): Promise<User> {
    const userEntity = await this.userRepository.getUserById(id);
    return await this.userRepository.removeUser(userEntity);
  }
}
