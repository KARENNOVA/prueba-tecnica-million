import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../theme/global.styles';
import { type RootStackParams } from '../routes/StackNavigation';
import { useCryptos } from '../hooks/useCryptos';
import { Loading } from '../components/Loading';

/**
 * @component ListCryptocurrencies
 * @description Muestra una lista de criptomonedas con funcionalidad de búsqueda
 * y paginación infinita. Permite navegar a la pantalla de detalles de una
 * criptomoneda al tocar un elemento de la lista.
 */
export const ListCryptocurrencies = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [canCallEndReached, setCanCallEndReached] = useState(true);

    const onEndReached = () => {
        if (!isLoading && canCallEndReached) {
            setCanCallEndReached(false);
            fetchCryptos();
        }
    };

    const {
        cryptos,
        fetchCryptos,
        isLoading
    } = useCryptos({ type: 'list' });

    
    const filteredData = cryptos.filter(item =>
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.simbolo.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('detailCrypto', { id: item.id })} style={styles.item}>
            <View style={{}}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.id}>Simbolo: {item.simbolo}</Text>
                <Text style={styles.id}>USD: $ {item.precioUSD}</Text>
            </View>
            <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={globalStyles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre o símbolo"
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#999"
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => setCanCallEndReached(true)}
                ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        borderColor: '#573ee1',
        padding: 10,
        borderRadius: 5,
        marginVertical: 30,
        minHeight: 50,
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 5,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e1e1e1',
    },
    nombre: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    id: {
        color: 'gray',
        fontSize: 14,
    },
    arrow: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#ccc',
    },
});
