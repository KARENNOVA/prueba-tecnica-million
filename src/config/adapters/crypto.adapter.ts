import { AxiosAdapter } from './http/axios.adapter';


export const cryptoFetcher = new AxiosAdapter({
  baseUrl: 'https://api.coinlore.net/api',
  params: {
    language: 'es'
  }
});