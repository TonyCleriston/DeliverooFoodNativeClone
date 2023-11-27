import { View, Text, FlatList ,StyleSheet, Pressable} from 'react-native'
import React, { useState } from 'react'
import useBasketStore from '@/store/basketStore';
import Colors from '@/constants/Colors';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import GmailStyleSwipeableRow from '@/components/SwipeableRow';

const Basket = () => {
    const {products, total, reduceProduct, clearCart } = useBasketStore();
    const [order, setOrder] = useState(false)
    const FEES ={
        service: 2.99,
        delivery: 5.99,
    }
    const startCheckout = () => {
        setOrder(true)
        clearCart()
    }
  return (
    <>
    {order && (
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} fallSpeed={2500} fadeOut={true} autoStart={true} />
    )}
    {order && (
        <View style={{marginTop: '50%', alignItems: 'center', padding: 20}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>Obrigado pela compra</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>Seu pedido foi concluído</Text>
            <Link href="/" asChild>
                <Pressable style={styles.orderBtn}>
                    <Text style={styles.footerText}>Novo pedido</Text>
                </Pressable>
            </Link>
        </View>
    )}
    {!order && (
        <>
        <FlatList
        data={products}
        ListHeaderComponent={<Text style={styles.section}>Items</Text>}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: Colors.grey}}/>}
        ListFooterComponent={
            <View>
                <View style={{height: 1, backgroundColor: Colors.grey}}/>
                <View style={styles.totalRow}>
                    <Text style={styles.total}>Subtotal</Text>
                    <Text style={{fontSize: 18}}>R${total}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.total}>Serviço</Text>
                    <Text style={{fontSize: 18}}>R${FEES.service}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.total}>Entregar</Text>
                    <Text style={{fontSize: 18}}>R${FEES.delivery}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.total}>Total da Entrega</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>R${(total + FEES.service + FEES.delivery).toFixed(2)}</Text>
                </View>
            </View>
        }
        renderItem={({item}) => (
            <GmailStyleSwipeableRow onDelete={() => reduceProduct(item)}>
            <View style={styles.row}>
                <Text style={{ fontSize: 18}}>{item.quantity}x</Text>
                <Text style={{flex: 1, fontSize: 18}}>{item.name}</Text>
                <Text style={{fontSize: 18}}>R${item.price * item.quantity}</Text>
            </View>
            </GmailStyleSwipeableRow>
        )}
        />
        </>
    )}
    <View style={styles.footer}>
    <SafeAreaView style={{backgroundColor: '#fff'}} edges={['bottom']}>
        <Pressable style={styles.fullButton} onPress={startCheckout}>
            <Text style={styles.footerText}>Finalizar pedido</Text>
        </Pressable>
    </SafeAreaView>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    orderBtn:{
       backgroundColor: Colors.primary,
       paddingHorizontal: 16,
       borderRadius:8,
       alignItems: 'center',
       width: 250,
       height: 50,
       justifyContent: 'center',
       marginTop: 20,
       
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      fullButton:{
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        flex: 1,
        height: 50,
        borderRadius:8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        paddingTop: 20,
        left: 0,
        width: '100%',
        padding: 20,
        marginBottom: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    total:{
        fontSize: 18,
        color: Colors.mediumDark,


    },
    section: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        margin: 16,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        gap:20,
    },
    totalRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'space-between',
    },
})

export default Basket