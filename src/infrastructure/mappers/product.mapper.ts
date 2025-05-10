import type { Product } from "../../core/entities/product.entity";
import { ProductResponse } from "../interfaces/product.responses";
import { formatDateToDDMMYYYY, formatDateToYYYYMMDD } from "../../config/helpers/functions"


export class ProductMapper {
    static fromProductResultToEntity( result: ProductResponse): Product {
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
    static fromProductRequest( product: Product): ProductResponse {
        return {
            id: product.id,
            symbol: product.simbolo,
            name: product.nombre,
            nameid: product.nombreId,
            rank: product.rango,
            price_usd: product.precioUSD,
            percent_change_24h: product.cambioPorcentual24h,
            percent_change_1h: product.cambioPorcentual1h,
            percent_change_7d: product.cambioPorcentual7d,
            price_btc: product.precioBtc,
            market_cap_usd: product.mercadoCapUsd,
            volume24: product.volumen24,
            volume24a: product.volumen24a,
            csupply: product.csupply,
            tsupply: product.tsupply,
            msupply: product.msupply,
        }
    }
}