import { Article } from 'src/articles/entities/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ default: -1 })
  rate: number;

  @OneToMany(() => Article, (article) => article.user)
  photos: Article[];

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ default: Date.now() })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
