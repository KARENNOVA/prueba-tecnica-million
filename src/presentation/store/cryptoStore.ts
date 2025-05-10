import { create } from 'zustand'
import { Crypto } from '../../core/entities/crypto.entity'

export interface CryptoStore {
    cryptocurrency: Crypto
    cryptocurrencies: Crypto[]
    isLoading: boolean,
    setLoading: () => void
    setCryptos: (cryptocurrencies: Crypto[]) => void
    setCryto: (cryptocurrency: Crypto) => void
}

const initialValues = {
    cryptocurrency: {
        id: "",
        simbolo: "",
        nombre: "",
        nombreId: "",
        rango: 0,
        precioUSD: "",
        cambioPorcentual24h: "",
        cambioPorcentual1h: "",
        cambioPorcentual7d: "",
        precioBtc: "",
        mercadoCapUsd: "",
        volumen24: 0,
        volumen24a: 0,
        csupply: "",
        tsupply: "",
        msupply: "",
    },
    cryptocurrencies: [],
    isLoading: true
}

export const useCryptoStore = create<CryptoStore>()((set, get) => ({
    ...initialValues,
    setLoading: () => set((state) => ({ cryptocurrency: initialValues.cryptocurrency, isLoading: true })),
    setCryptos: (cryptocurrencies) => {
        const idsCryptoPrevious = get().cryptocurrencies.map(crypto => crypto.id)
        const newArray = cryptocurrencies.filter(item => !idsCryptoPrevious.includes(item.id))
        const merged = [
            ...get().cryptocurrencies,
            ...newArray
        ];

        

        set((state) => ({ cryptocurrencies: merged, isLoading: false }))
    },
    setCryto: (cryptocurrency) => set({ cryptocurrency: cryptocurrency, isLoading: false })
}))

