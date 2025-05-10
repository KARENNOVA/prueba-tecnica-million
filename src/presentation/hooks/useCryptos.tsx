import { useEffect, useState } from 'react';
import type { Crypto } from '../../core/entities/crypto.entity';

import * as UseCases from '../../core/use-cases';
import { cryptoFetcher } from '../../config/adapters/crypto.adapter';
import { useCryptoStore } from '../store/cryptoStore';


/**
 * Interfaz que define las propiedades (props) aceptadas por el hook `useCryptos`.
 * Permite especificar el tipo de operación a realizar y, opcionalmente, un ID.
 */
interface Props {
  /**
   * Tipo de operación a realizar. Los valores posibles son:
   * - 'create': Para crear una nueva criptomoneda (actualmente no implementado en este hook).
   * - 'edit': Para editar una criptomoneda existente (actualmente no implementado en este hook).
   * - 'delete': Para eliminar una criptomoneda existente (actualmente no implementado en este hook).
   * - 'list': Para obtener una lista paginada de criptomonedas.
   * - 'get': Para obtener los detalles de una criptomoneda específica por su ID.
   */
  type: 'create' | 'edit' | 'delete' | 'list' | 'get'
  /**
   * ID de la criptomoneda a obtener cuando el `type` es 'get'. Es opcional para otros tipos.
   */
  id?: string;
}

/**
 * Hook personalizado `useCryptos` que encapsula la lógica para interactuar con datos de criptomonedas.
 * Permite obtener listas paginadas o detalles de una criptomoneda específica.
 * Utiliza el store `useCryptoStore` para gestionar el estado global de las criptomonedas y los casos de uso definidos.
 *
 * @param {Props} { type, id } - Objeto con las propiedades que definen la operación a realizar.
 * @returns {object} Un objeto que contiene el estado de las criptomonedas (`cryptos`, `crypto`, `isLoading`)
 * y las funciones para obtener los datos (`fetchCryptos`, `fetchCrptoById`).
 */
export const useCryptos = ({ type, id }: Props) => {

  const cryptos = useCryptoStore(state => state.cryptocurrencies)
  const crypto = useCryptoStore(state => state.cryptocurrency)
  const isLoading = useCryptoStore(state => state.isLoading)
  const setCryptos = useCryptoStore(state => state.setCryptos)
  const setCryto = useCryptoStore(state => state.setCryto)
  const setLoading = useCryptoStore(state => state.setLoading)
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Efecto que se ejecuta una sola vez al montar el componente (o cuando cambia `type`).
   * Si el `type` es 'list', se llama a la función para obtener la lista de criptomonedas.
   */
  useEffect(() => {
    if (type === 'list')
      fetchCryptos()
  }, [])

  /**
   * Efecto que se ejecuta cuando el valor de `id` cambia.
   * Si el `type` es 'get' y se proporciona un `id`, se llama a la función para obtener los detalles de esa criptomoneda.
   */
  useEffect(() => {
    if (type === 'get' && id) {
      fetchCrptoById(id)
    }
  }, [id]) 


  /**
   * Función asíncrona para obtener una lista paginada de criptomonedas.
   * Utiliza el caso de uso `listCryptossUseCase` para realizar la llamada a la API.
   * Actualiza el estado global de las criptomonedas y la información de paginación.
   *
   * @returns {Promise<Crypto[]>} Una promesa que resuelve a un array de objetos `Crypto`.
   */
  const fetchCryptos = async (): Promise<Crypto[]> => {
    if (!hasMore) return [];
    setLoading()
    try {
      const json = await UseCases.listCryptossUseCase(cryptoFetcher, { start: page * 10 });
      setCryptos(json.data)
      setPage(page + 1);
      if (json.data.length === json.info.coins_num) {
        setHasMore(false);
      }
      return json.data
    } catch (error) {
      console.error("Error fetching coins:", error);
      return []
    }
  };


  /**
   * Función asíncrona para obtener los detalles de una criptomoneda específica por su ID.
   * Utiliza el caso de uso `getCryptoByIdUseCase` para realizar la llamada a la API.
   * Actualiza el estado global de la criptomoneda seleccionada.
   *
   * @param {string} cryptoId - El ID de la criptomoneda a obtener.
   * @returns {Promise<Crypto>} Una promesa que resuelve al objeto `Crypto` encontrado.
   */
  const fetchCrptoById = async (cryptoId: string): Promise<Crypto> => {
    setLoading()
    try {
      const crypto = await UseCases.getCryptoByIdUseCase(cryptoFetcher, cryptoId);
      setCryto(crypto)
      return crypto

    } catch (error) {
      console.log('error', error);
      return crypto
    }
  };

  return {
    cryptos,
    crypto,
    isLoading,
    fetchCryptos,
    fetchCrptoById,
  };
};
