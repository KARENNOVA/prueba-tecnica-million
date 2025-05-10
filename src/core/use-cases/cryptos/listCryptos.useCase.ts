import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { Response } from '../../../infrastructure/interfaces/crypto.responses';
import { CryptoMapper } from '../../../infrastructure/mappers/crypto.mapper';
import type { Crypto } from '../../entities/crypto.entity';



export const listCryptossUseCase = async ( fetcher: HttpAdapter, filters?: { start: number, limit?: number  }  ):Promise<{ data: Crypto[], info: any}> => {
  
  try {   
    const list = await fetcher.get<Response>(filters ? `/tickers/?start=${filters.start}&limit=${filters?.limit || 10}` : 'tickers');    
    
    const newList = list.data.map(  CryptoMapper.fromCryptoResultToEntity );
    return {
      info: list.info,
      data: newList
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - NowPlaying');
  }


}

