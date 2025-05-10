import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ListCryptocurrencies } from '../../src/presentation/screens/ListCryptocurrencies';

// Mock de navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock del hook useCryptos
jest.mock('../../../presentation/src/hooks/useCryptos', () => ({
  useCryptos: () => ({
    cryptos: [
      { id: '1', nombre: 'Bitcoin', simbolo: 'BTC', precioUSD: 50000 },
      { id: '2', nombre: 'Ethereum', simbolo: 'ETH', precioUSD: 3000 },
    ],
    fetchCryptos: jest.fn(),
    isLoading: false,
  }),
}));

describe('ListCryptocurrencies', () => {
  it('muestra la lista de criptomonedas y permite buscar', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<ListCryptocurrencies />);

    // Verifica que el input se renderice
    const input = getByPlaceholderText('Buscar por nombre o símbolo');
    expect(input).toBeTruthy();

    // Verifica que las monedas se muestren
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();

    // Prueba el filtro
    fireEvent.changeText(input, 'bit');
    await waitFor(() => {
      expect(getByText('Bitcoin')).toBeTruthy();
      expect(queryByText('Ethereum')).toBeNull(); // Ya no se muestra
    });
  });
});
