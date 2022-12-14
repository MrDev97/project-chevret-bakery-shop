import { Product } from './db/product.entity';
import { ProductsDataService } from './products-data.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQuery } from './queries/products-query.interface';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsDataService);
    getProductById(id: string): Promise<ExternalProductDto>;
    getAllProducts(query: ProductsQuery): Promise<Array<ExternalProductDto>>;
    addProduct(item: CreateProductDto): Promise<ExternalProductDto>;
    mapProductToExternal(product: Product): ExternalProductDto;
    deleteProduct(_id_: string): void;
    updateProduct(id: string, product: UpdateProductDto): Promise<ExternalProductDto>;
}
