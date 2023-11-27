import { View, Text,StyleSheet,Image,Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getDishById } from '@/assets/data/restaurant'
import Colors from '@/constants/Colors'
import Animated, { FadeIn, FadeInDown, FadeInLeft } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import useBasketStore from '@/store/basketStore'

const Dish = () => {
    const {id} = useLocalSearchParams()
    const item = getDishById(+id)!
    const router = useRouter();
    const {addProduct} = useBasketStore();
    const addToCart = () => {
        addProduct(item);
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
       
        router.back()

    }
    
  return (
    <View style={styles.container}>
      <Animated.Image entering={FadeInDown.duration(300).delay(200)} source={item?.img}  style={{width:'100%',height:300}}/>
      <View style={{padding:20}}>
        <Animated.Text entering={FadeInLeft.duration(300).delay(200)}
         style={{fontSize:24,fontWeight: 'bold',marginBottom: 8}}>{item?.name}</Animated.Text>
        <Animated.Text entering={FadeInLeft.duration(300).delay(200)} style={{fontSize:16, color: '#777'}}>{item?.info}</Animated.Text>
      </View>
      <View style={styles.footer}>
                <Pressable style={styles.fullButton} onPress={addToCart}>
                    <Text style={styles.footerText}>Adicionar por ${item?.price}</Text>
                </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    fullButton:{
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius:8,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
    container: {
        flex: 1,
        backgroundColor:"#fff",
    },

})

export default Dish