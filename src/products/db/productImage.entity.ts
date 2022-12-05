import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Product } from './product.entity';

@Entity({
  name: 'product_images',
})
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ length: 100 })
  @IsString()
  name: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
