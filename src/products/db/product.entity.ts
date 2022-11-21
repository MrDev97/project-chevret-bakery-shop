import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsDate, IsString, Min, IsInt, IsNumber } from 'class-validator';
import { Tag } from './tag.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ length: 100 })
  @IsString()
  name: string;

  @Column({
    default: 0,
    type: 'float',
  })
  @Min(0)
  @IsNumber()
  price: number;

  @Column({
    default: 1,
  })
  @Min(0)
  @IsInt()
  quantity: number;

  @Column({ type: 'text', nullable: true })
  @IsString()
  description: string;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({
    name: 'products_tags',
    joinColumn: {
      name: 'productId',
    },
    inverseJoinColumn: {
      name: 'tagId',
    },
  })
  tags: Tag[];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;
}
