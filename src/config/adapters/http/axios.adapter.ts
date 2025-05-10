import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './http.adapter';

interface Options {
  baseUrl: string;
  params: Record<string,string>;
}

/**
 * Implementación del adaptador HTTP utilizando la librería Axios.
 * Proporciona métodos para realizar peticiones GET, POST, PUT y DELETE,
 * encapsulando la lógica de Axios y adaptándola a la interfaz `HttpAdapter`.
 */
export class AxiosAdapter implements HttpAdapter {
  
  private axiosInstance: AxiosInstance;
  /**
   * Constructor de la clase AxiosAdapter.
   * Inicializa la instancia de Axios con las opciones proporcionadas.
   *
   * @param {Options} options - Objeto que contiene la configuración del adaptador.
   */
  constructor( options: Options ) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    })
  }

    /**
   * Realiza una petición HTTP GET a la URL especificada.
   *
   * @template T El tipo de la respuesta que se espera recibir.
   * @param {string} url La URL a la que se realizará la petición GET.
   * @param {Record<string, unknown> | undefined} options Opciones adicionales para la petición (opcional).
   * @returns {Promise<T>} Una promesa que resuelve con los datos de la respuesta.
   * @throws {Error} Si ocurre un error durante la petición.
   */
  async get<T>( url: string, options?: Record<string, unknown> | undefined ): Promise<T> {
    
    try {
      const { data } = await this.axiosInstance.get<T>(url, options );      
      return data;

    } catch (error) {
      throw new Error(`Error fetching get: ${ url } `);
    }

  }

  async post<T>(url: string, info: T, options?: Record<string, unknown>): Promise<T> {
    try {      
      const { data } = await this.axiosInstance.post<T>(url, info, {
        params: options, // o headers si prefieres
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching POST: ${url}`);
    }
  }

  async put<T>(url: string, info: T, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.put<T>(url, info, {
        params: options,
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching PUT: ${url}`);
    }
  }

  async delete<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.delete<T>(url, {
        params: options,
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching DELETE: ${url}`);
    }
  }


}

