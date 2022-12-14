import { Tag } from './tag.entity';
import { ProductImage } from './productImage.entity';
export declare class Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    tags: Tag[];
    images: ProductImage[];
    createdAt: Date;
    updatedAt: Date;
}
