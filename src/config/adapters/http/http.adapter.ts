/**
 * @abstract
 * @class HttpAdapter
 * @classdesc Define una interfaz abstracta para adaptadores HTTP.
 * Esta clase proporciona métodos genéricos para realizar las operaciones
 * HTTP más comunes (GET, POST, PUT, DELETE), permitiendo la implementación
 * de diferentes estrategias de cliente HTTP (como `fetch` nativo, `axios`, etc.)
 * sin acoplar el resto de la aplicación a una implementación específica.
 */
export abstract class HttpAdapter {

  abstract get<T>(url: string, options?: Record<string, unknown>): Promise<T>;

  abstract post<T>(url: string, body: T, options?: Record<string, unknown>): Promise<T>;

  abstract put<T>(url: string, body: T, options?: Record<string, unknown>): Promise<T>;

  abstract delete<T>(url: string, options?: Record<string, unknown>): Promise<T>;

}
