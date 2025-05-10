import { HttpAdapter } from "../../src/config/adapters/http/http.adapter";
import { getCryptoByIdUseCase, listCryptossUseCase } from "../../src/core/use-cases";

const mockResponse = {
    data: [
        {
            id: "1",
            name: "Bitcoin",
            symbol: "BTC",
            price_usd: "30000",
            rank: 1
        },
        {
            id: "2",
            name: "Ethereum",
            symbol: "ETH",
            price_usd: "2000",
            rank: 2
        },
    ],
    info: {
        coins_num: 2,
        time: 123456789,
    },
};


describe("Prueba caso de uso traer lista de criptomonedas -> listCryptossUseCase", () => {
    test('debe retornar una la lista de Cryptos correctamente', async () => {
        const mockFetcher: HttpAdapter = {
            get: jest.fn().mockResolvedValue(mockResponse),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };
        const filters = { start: 1, limit: 2 };
        const result = await listCryptossUseCase(mockFetcher, filters);

        expect(result.info.coins_num).toBe(2);
        expect(result.data).toHaveLength(2);
        expect(result.data[0].nombre).toBe("Bitcoin");
        expect(result.data[1].simbolo).toBe("ETH");

    });

    test("debe lanzar un error si falla la petición", async () => {
        const mockFetcher: HttpAdapter = {
            get: jest.fn().mockRejectedValue(new Error("fallo de red en traer lista")),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };

        await expect(listCryptossUseCase(mockFetcher, { start: 1 })).rejects.toThrow(
            "Error fetching movies - NowPlaying"
        );
    });



})