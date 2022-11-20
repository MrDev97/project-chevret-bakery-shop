import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { UserAddress } from './userAddress.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column('enum', {
    enum: UserRoles,
    select: false,
  })
  role: UserRoles;

  @OneToMany(() => UserAddress, (address) => address.user, { eager: true })
  address?: UserAddress[];
}
