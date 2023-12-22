import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async login(signInDto: SignInDto) {
    const user = await this.usersService.findBy({ email: signInDto.email });
    if (!user) {
      throw new HttpException(
        'email or password are wrong',
        HttpStatus.NOT_FOUND,
      );
    }
    const passwordValidate = await this.encryptionService.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordValidate) {
      throw new HttpException(
        'email or password are wrong',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      accessToken: await this.jwtService.signAsync({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        country: user.city,
        articles: user.articles,
        isActive: user.isActive,
        phone: user.phone,
      }),
    };
  }
}
