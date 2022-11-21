import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'tags',
})
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ length: 50 })
  @IsString()
  name: string;
}
