import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photoUrl: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  deliveryType: number;

  @Column()
  deliveryPoint: string;

  @Column({ default: 0 })
  state: number;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ default: Date.now() })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
