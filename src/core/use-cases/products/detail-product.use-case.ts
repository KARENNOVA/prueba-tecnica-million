import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper";
import { Product } from "../../entities/product.entity";

export const getProductByIdUseCase = async (fetcher: HttpAdapter, productId: string): Promise<Product> => {
  try {    
    const product = await fetcher.get<any>(`ticker/?id=${productId}`);
    console.log('Producto', product);
    
    return ProductMapper.fromProductResultToEntity(product[0]);
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching product with id ${productId}`);
  }
}
