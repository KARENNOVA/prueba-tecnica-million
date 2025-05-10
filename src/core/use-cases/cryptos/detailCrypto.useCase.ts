import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { CryptoMapper } from "../../../infrastructure/mappers/crypto.mapper";
import { Crypto } from "../../entities/crypto.entity";

export const getCryptoByIdUseCase = async (fetcher: HttpAdapter, cryptoId: string): Promise<Crypto> => {
  try {    
    const crypto = await fetcher.get<any>(`ticker/?id=${cryptoId}`);    
    return CryptoMapper.fromCryptoResultToEntity(crypto[0]);
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching crypto with id ${cryptoId}`);
  }
}
