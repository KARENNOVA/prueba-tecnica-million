import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { globalStyles } from '../theme/global.styles';
import { type NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigation';
import { useCryptos } from '../hooks/useCryptos';
import { useCryptoStore } from '../store/cryptoStore';
import { Loading } from '../components/Loading';

/**
 * @component DetailCrypto
 * @description Muestra los detalles de una criptomoneda específica.
 * Utiliza los parámetros de la ruta para obtener el ID de la criptomoneda
 * y el hook `useCryptos` para cargar la información detallada.
 * La información se muestra en una lista dentro de un `ScrollView`.
 */
export const DetailCrypto = () => {
    const params = useRoute<RouteProp<RootStackParams, 'detailCrypto'>>().params;
    const crypto = useCryptoStore(state => state.cryptocurrency)

    const {
        // crypto,
        isLoading,
    } = useCryptos({ type: 'get', id: `${params.id}` });

    return isLoading ? <Loading /> : (
        <ScrollView style={[globalStyles.container, styles.viewScroll]}>
            <View>
                <Text style={styles.idText}>ID: {crypto?.id}</Text>
                <Text style={styles.extraInfo}>Información extra</Text>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.value}>{crypto?.nombre}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>ID Nombre</Text>
                    <Text style={styles.value}>{crypto?.nombreId}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Simbolo</Text>
                    <Text style={styles.value}>{crypto?.simbolo}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Ranking en el mercado</Text>
                    <Text style={styles.value}>{crypto?.rango}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Precio BTC</Text>
                    <Text style={styles.value}>{crypto?.precioBtc}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Precio unitario en dolares (USD)</Text>
                    <Text style={styles.value}> $ {crypto?.precioUSD}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Capitalización total (USD)</Text>
                    <Text style={styles.value}>{crypto?.mercadoCapUsd}</Text>
                </View>



                <View style={styles.detailRow}>
                    <Text style={styles.label}>Porcentaje de cambio en 24H</Text>
                    <Text style={styles.value}>{crypto?.cambioPorcentual24h}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Porcentaje de cambio en 1H</Text>
                    <Text style={styles.value}>{crypto?.cambioPorcentual1h}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Porcentaje de cambio en 7 días</Text>
                    <Text style={styles.value}>{crypto?.cambioPorcentual7d}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Vol. trasnsacciones (USD)</Text>
                    <Text style={styles.value}>{crypto?.volumen24}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Vol. trasnsacciones BTC</Text>
                    <Text style={styles.value}>{crypto?.volumen24a}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Cantidad en circulación</Text>
                    <Text style={styles.value}>{crypto?.csupply}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Suministro total actual</Text>
                    <Text style={styles.value}>{crypto?.tsupply}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Máximo suministro</Text>
                    <Text style={styles.value}>{crypto?.msupply}</Text>
                </View>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewScroll: {
        flex: 1
    },
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


