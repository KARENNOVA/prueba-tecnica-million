export interface ProductResponse {
    id: string;
    symbol: string;
    name: string;
    nameid: string | number;
    rank: number;
    price_usd: string | number;
    percent_change_24h: string | number;
    percent_change_1h: string | number;
    percent_change_7d: string | number;
    price_btc: string | number;
    market_cap_usd: string | number;
    volume24: number;
    volume24a: number;
    csupply: string | number;
    tsupply: string | number;
    msupply: string | number;
}

export interface Response {
    data: ProductResponse[];
    info?: {
        coins_num: number;
        time: number;
    }
}
