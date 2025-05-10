import { HttpAdapter } from "../../src/config/adapters/http/http.adapter";
import { getCryptoByIdUseCase } from "../../src/core/use-cases";

describe("Prueba caso de uso traer dettale de criptomoneda -> getCryptoByIdUseCase", () => {
    test('debe retornar una entidad Crypto correctamente', async () => {
        const mockFetcher: HttpAdapter = {
            get: jest.fn().mockResolvedValue([
                {
                    id: "80",
                    name: "Ethereum",
                    symbol: "ETH",
                    price_usd: "2000",
                },
            ]),
            post: jest.fn(),   // No se usan, pero deben existir
            put: jest.fn(),
            delete: jest.fn(),
        };
        const result = await getCryptoByIdUseCase(mockFetcher, '80');
        expect(result.id).toBe('80');
        expect(result.simbolo).toBe('ETH');
        expect(result.nombre).toBe('Ethereum');
    });

    test("debe lanzar un error si falla la petición", async () => {
        const mockFetcher: HttpAdapter = {
            get: jest.fn().mockRejectedValue(new Error("fallo red en traer detalle")),
            post: jest.fn(), // Necesarios para cumplir el contrato de HttpAdapter
            put: jest.fn(),
            delete: jest.fn(),
        };

        await expect(getCryptoByIdUseCase(mockFetcher, "80")).rejects.toThrow(
            "Error fetching crypto with id 80"
        );
    });

})