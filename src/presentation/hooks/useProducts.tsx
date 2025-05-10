import { useEffect, useState } from 'react';
import type { Product } from '../../core/entities/product.entity';

import * as UseCases from '../../core/use-cases';
import { productFetcher } from '../../config/adapters/product.adapter';

interface Props {
  type: 'create' | 'edit' | 'delete' | 'list' | 'get'
  id?: string;
}

export const useProducts = ({ type, id }: Props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: "",
    simbolo: "",
    nombre: "",
    nombreId: "",
    rango: 0,
    precioUSD: "",
    cambioPorcentual24h: "",
    cambioPorcentual1h: "",
    cambioPorcentual7d: "",
    precioBtc: "",
    mercadoCapUsd: "",
    volumen24: 0,
    volumen24a: 0,
    csupply: "",
    tsupply: "",
    msupply: "",
  });
  const [changeStatus, setChangeStatus] = useState(false);

  useEffect(() => {
    if (type === 'list')
      fetchProducts()
  }, [changeStatus])

  useEffect(() => {
    if (type === 'get' && id) {
      fetchProductById(id)
    }
  }, [id])


  const fetchProducts = async (): Promise<Product[]> => {
    console.log("@@@@@@", hasMore);
    
    if (!hasMore) return [];
    console.log('Pagina', page);
    
    setIsLoading(true)
    try {
      const json = await UseCases.listProductsUseCase(productFetcher, {start: page * 100});
      // setListProducts(info.data);
      setListProducts(prev => [...prev, ...json.data]);
      setPage(prev => prev + 1);
      if (json.data.length === json.info.coins_num) {
        setHasMore(false); // ya no hay más datos
      }
      return json.data

    } catch (error) {
      console.error("Error fetching coins:", error);
      return []

    } finally {
      setIsLoading(false);


    }


  };


  const fetchProductById = async (productId: string): Promise<Product> => {

    console.log('entra aqui', productId);
    
    setIsLoading(true)
    const product = await UseCases.getProductByIdUseCase(productFetcher, productId);
    setProduct(product)
    setIsLoading(false)
    return product
  };

  const createProduct = async (product: Product): Promise<void> => {
    const createdProduct = await UseCases.createProductUseCase(productFetcher, product);
    // setListProducts(prev => [...prev, createdProduct]); // actualiza el estado
    setChangeStatus(!changeStatus)
  };

  const updateProduct = async (productId: string, product: Product): Promise<void> => {
    const updatedProduct = await UseCases.updateProductUseCase(productFetcher, productId, product);
    // setListProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
    setChangeStatus(!changeStatus)
  };

  const deleteProduct = async (productId: string): Promise<void> => {
    await UseCases.deleteProductUseCase(productFetcher, productId);
    // setListProducts(prev => prev.filter(p => p.id !== productId));
    setChangeStatus(!changeStatus)
  };

  // 🚀 Eliminar producto
  const verifyProduct = async (productId: string): Promise<boolean> => {
    return await UseCases.getVerifyProductUseCase(productFetcher, productId);
  };

  return {
    isLoading,
    listProducts,
    product,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    verifyProduct
  };
};
