

export interface Crypto {
  id: string;
  simbolo: string;
  nombre: string;
  nombreId: string | number;
  rango: number;
  precioUSD: string | number;
  cambioPorcentual24h: string | number;
  cambioPorcentual1h: string | number;
  cambioPorcentual7d: string | number;
  precioBtc: string | number;
  mercadoCapUsd: string | number;
  volumen24: number;
  volumen24a: number;
  csupply: string | number;
  tsupply: string | number;
  msupply: string | number;
}

