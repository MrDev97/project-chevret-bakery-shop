import { IsDate, IsString, Min, IsOptional } from 'class-validator';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Statuses } from '../enums/statuses.enum';
import { OrderProduct } from './orderProduct.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  orderedProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @ManyToOne(() => UserAddress, (address) => address.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  address: UserAddress;

  @Column({ type: 'float' })
  @Min(0)
  totalPrice: number;

  @IsOptional()
  @Column({ type: 'text' })
  @IsString()
  description?: string;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;
}
