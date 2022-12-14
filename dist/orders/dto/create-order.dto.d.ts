export declare class CreateOrderDto {
    orderedProducts: Array<CreateOrderProductDto>;
    userId: string;
    addressId: string;
    description?: string;
}
export declare class CreateOrderProductDto {
    productId: string;
    quantity: number;
}
