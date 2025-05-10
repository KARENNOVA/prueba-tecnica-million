import type { Crypto } from "../../core/entities/crypto.entity";
import type { CryptoResponse } from "../interfaces/crypto.responses";

/**
 * Clase `CryptoMapper` esta clase transforma las diferentes representaciones
 * de los datos de criptomonedas. Utilizada para mapear datos desde la respuesta de la API
 * hacia la entidad del dominio (`Crypto`) y viceversa.
 */
export class CryptoMapper {
    /**
     * Método estático que transforma un objeto `CryptoResponse` (típicamente la respuesta
     * de una API) a una entidad `Crypto` del dominio. Realiza la adaptación de los nombres
     * de las propiedades si es necesario para que coincidan con la estructura de la entidad.
     *
     * @param {CryptoResponse} result - El objeto `CryptoResponse` recibido de la API.
     * @returns {Crypto} Una nueva instancia de la entidad `Crypto` con los datos mapeados.
     */
    static fromCryptoResultToEntity( result: CryptoResponse): Crypto {
        return {
            id: result.id, 
            simbolo: result.symbol, 
            nombre: result.name, 
            nombreId: result.nameid, 
            rango: result.rank,
            precioUSD: result.price_usd, 
            cambioPorcentual24h: result.percent_change_24h, 
            cambioPorcentual1h: result.percent_change_1h, 
            cambioPorcentual7d: result.percent_change_7d, 
            precioBtc: result.price_btc, 
            mercadoCapUsd: result.market_cap_usd, 
            volumen24: result.volume24,
            volumen24a: result.volume24a,
            csupply: result.csupply, 
            tsupply: result.tsupply, 
            msupply: result.msupply,
        }
    }
    /**
     * Método estático que transforma una entidad `Crypto` del dominio a un objeto
     * `CryptoResponse`. Esta transformación es útil cuando se necesita enviar datos
     * en un formato específico a una API (aunque en este caso, la estructura es similar).
     * Realiza la adaptación de los nombres de las propiedades si es necesario.
     *
     * @param {Crypto} crypto - La entidad `Crypto` del dominio.
     * @returns {CryptoResponse} Un nuevo objeto `CryptoResponse` con los datos mapeados.
     */
    static fromCryptoRequest( crypto: Crypto): CryptoResponse {
        return {
            id: crypto.id,
            symbol: crypto.simbolo,
            name: crypto.nombre,
            nameid: crypto.nombreId,
            rank: crypto.rango,
            price_usd: crypto.precioUSD,
            percent_change_24h: crypto.cambioPorcentual24h,
            percent_change_1h: crypto.cambioPorcentual1h,
            percent_change_7d: crypto.cambioPorcentual7d,
            price_btc: crypto.precioBtc,
            market_cap_usd: crypto.mercadoCapUsd,
            volume24: crypto.volumen24,
            volume24a: crypto.volumen24a,
            csupply: crypto.csupply,
            tsupply: crypto.tsupply,
            msupply: crypto.msupply,
        }
    }
}