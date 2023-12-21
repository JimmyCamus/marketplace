import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { EncryptionModule } from './encryption/encryption.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local'] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Article],
      synchronize: true,
    }),
    ArticlesModule,
    EncryptionModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
