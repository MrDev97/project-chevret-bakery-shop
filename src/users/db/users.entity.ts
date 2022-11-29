import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { UserAddress } from './userAddress.entity';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ length: 50 })
  @IsString()
  firstName: string;

  @Column({ length: 50 })
  @IsString()
  lastName: string;

  @Column({ length: 50 })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Exclude()
  password: string;

  @Column({ type: 'date' })
  @IsDate()
  dateOfBirth: Date;

  @Column('enum', {
    enum: UserRoles,
  })
  role: UserRoles;

  @OneToMany(() => UserAddress, (address) => address.user, { eager: true })
  address?: UserAddress[];
}
