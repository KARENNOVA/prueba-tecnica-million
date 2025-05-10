import React, { useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../theme/global.styles';
import { type RootStackParams } from '../routes/StackNavigation';
import { useProducts } from '../hooks/useProducts';
import { Loading } from '../components/Loading';


export const ListProduct = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const {
        listProducts,
        fetchProducts,
        isLoading
    } = useProducts({ type: 'list' });


    const filteredData = listProducts.filter(item =>
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.simbolo.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('detailProduct', { id: item.id })} style={styles.item}>
            <View>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.id}>USD: {item.precioUSD}</Text>
            </View>
            <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
    );

    // isLoading ? <Loading /> :
    return (
        <View style={globalStyles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre o símbolo"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={renderItem}
                onEndReached={fetchProducts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
            />
            <Pressable
                onPress={() => navigation.navigate('addProduct')}
                style={globalStyles.prymaryButton}
            >
                <Text style={globalStyles.prymaryButtonText}>Agregar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 30,
        minHeight: 50,
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
