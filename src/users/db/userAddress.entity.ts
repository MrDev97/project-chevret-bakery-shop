import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_adresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ length: 50 })
  @IsString()
  country: string;

  @Column({ length: 50 })
  @IsString()
  city: string;

  @Column({ length: 50 })
  @IsString()
  street: string;

  @Column()
  @IsNumber()
  houseNo: number;

  @Column({ default: null })
  @IsNumber()
  @IsOptional()
  apartmentNo?: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
