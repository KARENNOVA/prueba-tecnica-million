import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { Response } from '../../../infrastructure/interfaces/product.responses';
import { ProductMapper } from '../../../infrastructure/mappers/product.mapper';
import type { Product } from '../../entities/product.entity';


export const listProductsUseCase = async ( fetcher: HttpAdapter, filters?: { start: number, limit?: number  }  ):Promise<{ data: Product[], info: any}> => {
  
  try {

    const list = await fetcher.get<Response>(filters ? `/tickers/?start=${filters.start}&limit=${filters?.limit || 100}` : 'tickers');    
   console.log('lista', list);
   
    const newList = list.data.map(  ProductMapper.fromProductResultToEntity );
    return {
      info: list.info,
      data: newList
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - NowPlaying');
  }


}

