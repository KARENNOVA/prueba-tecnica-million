import { createStackNavigator } from '@react-navigation/stack';
import { ListCryptocurrencies } from '../screens/ListCryptocurrencies';
import { Text, View } from 'react-native';
import { DetailCrypto } from '../screens/DetailCrypto';


export type RootStackParams = {
    listCryptos: undefined
    detailCrypto: { id: string };

}

const Stack = createStackNavigator<RootStackParams>();


/**
 * Stack Navigation Component for Cryptocurrency Screens
 *
 *  Este componente configura el stack de navegación principal para la aplicación de criptomonedas.
 *  Utiliza `createStackNavigator` de React Navigation para gestionar las transiciones
 *  entre la lista de criptomonedas y los detalles de una criptomoneda seleccionada.
 */
export const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#261186', // Cambia este color al que desees
                    height: 180,
                    
                },
                headerTintColor: '#fff',
                headerTitle: () =>
                    <View style={{ marginVertical: 60, flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, color: 'white',  fontWeight: 'bold',  }}>CRYPTO CURRENCY</Text>
                        <Text style={{ color: 'white', marginTop: 10  }}>Infomacion de tu cripto preferida al alcance de tu mano</Text>
                    </View>,
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen name="listCryptos" component={ListCryptocurrencies} />
            <Stack.Screen name="detailCrypto" component={DetailCrypto} />
        </Stack.Navigator>
    );
};

