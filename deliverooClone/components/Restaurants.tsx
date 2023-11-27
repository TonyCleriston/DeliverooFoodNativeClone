import { View, Text,ScrollView,StyleSheet,Image, Pressable } from 'react-native'
import React from 'react'
import { restaurants } from '@/assets/data/home'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'

const Restaurants = () => {
  return (
    <ScrollView horizontal contentContainerStyle={{padding:15,}}>
      {restaurants.map((restaurant, index) => (
        <Link href={'/details'} key={index} asChild>
            <Pressable>
        <View style={styles.restaurantCard}>
            <Image source={restaurant.img} style={{flex:5, width:'100%'}} />
            <View style={styles.categoryBox}>
                <Text style={styles.restaurantText}>{restaurant.name}</Text>
                <Text style={{color: Colors.green,}}>{restaurant.rating} {restaurant.ratings}</Text>
                <Text style={{color: Colors.medium,}}>{restaurant.distance}</Text>
            </View>
        </View>
        </Pressable>

        
        </Link>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    restaurantText: {
        paddingVertical: 5,
        fontSize: 14,
        fontWeight: 'bold',
  
      },
    restaurantCard: {
      width: 300,
      height: 250,
      backgroundColor: '#fff',
      marginEnd: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      borderRadius: 4,
    },
    categoryBox: {
        flex: 2,
        padding: 10,
    },
  })

export default Restaurants