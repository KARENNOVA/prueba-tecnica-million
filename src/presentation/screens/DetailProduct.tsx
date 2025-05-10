import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { globalStyles } from '../theme/global.styles';
import { ModalDeleteProduct } from '../components/ModalDeleteProduct';
import { type NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigation';
import { useProducts } from '../hooks/useProducts';

export const DetailProduct = () => {
    const params = useRoute<RouteProp<RootStackParams, 'editlProduct'>>().params;
    
    const {
        product,
    } = useProducts({ type: 'get', id: `${params.id}` });

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    return (
        <View style={globalStyles.container}>

            <Text style={styles.idText}>ID: {product?.id}</Text>
            <Text style={styles.extraInfo}>Información extra</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Nombre</Text>
                <Text style={styles.value}>{product?.nombre}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>ID Nombre</Text>
                <Text style={styles.value}>{product?.nombreId}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Rango</Text>
                <Text style={styles.value}>{product?.rango}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Precion USD</Text>
                <Text style={styles.value}>{product?.precioUSD}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>cambioPorcentual1h</Text>
                <Text style={styles.value}>{product?.cambioPorcentual24h}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>cambioPorcentual1h</Text>
                <Text style={styles.value}>{product?.cambioPorcentual1h}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>cambioPorcentual7d</Text>
                <Text style={styles.value}>{product?.cambioPorcentual7d}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>precioBtc</Text>
                <Text style={styles.value}>{product?.precioBtc}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>mercadoCapUsd</Text>
                <Text style={styles.value}>{product?.mercadoCapUsd}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>volumen24</Text>
                <Text style={styles.value}>{product?.volumen24}</Text>
            </View>
            
            <View style={styles.detailRow}>
                <Text style={styles.label}>volumen24a</Text>
                <Text style={styles.value}>{product?.volumen24a}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>csupply</Text>
                <Text style={styles.value}>{product?.csupply}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>tsupply</Text>
                <Text style={styles.value}>{product?.tsupply}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>msupply</Text>
                <Text style={styles.value}>{product?.msupply}</Text>
            </View>

            {/* <Pressable onPress={() => navigation.navigate('editlProduct', { id: `${params.id}` })} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
            </Pressable> */}
            {/* <ModalDeleteProduct product={product} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    bankTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    idText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    extraInfo: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    detailRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        fontWeight: '400',
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',

    },
    editButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    editButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    deleteButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#E53935',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    deleteButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});


