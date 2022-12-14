import { Product } from './db/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { DataSource } from 'typeorm';
import { ProductImageRepository } from './db/productImage.repository';
import { ProductImage } from './db/productImage.entity';
export declare class ProductsDataService {
    private productRepository;
    private tagRepository;
    private productImageRepository;
    private dataSource;
    constructor(productRepository: ProductRepository, tagRepository: TagRepository, productImageRepository: ProductImageRepository, dataSource: DataSource);
    addProduct(item: CreateProductDto): Promise<Product>;
    saveProductImages(images: string[]): Promise<ProductImage[]>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(id: string, item: UpdateProductDto): Promise<Product>;
    getProductById(id: string): Promise<Product>;
    getAllProducts(query: any): Promise<Product[]>;
}
