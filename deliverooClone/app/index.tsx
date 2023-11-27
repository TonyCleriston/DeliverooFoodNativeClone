import { View, Text,ScrollView,StyleSheet } from 'react-native'
import React from 'react'
import Categories from '@/components/Categories'
import { SafeAreaView } from 'react-native-safe-area-context'
import Restaurants from '@/components/Restaurants'
import Colors from '@/constants/Colors'


const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical:40}}>
        <Categories />
        <Text style={styles.header}>
          Melhores Pratos perto de você
        </Text>
        <Restaurants />
        <Text style={styles.header}>
          Ofertas proximas de você
        </Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    top:40,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:16,
    marginBottom: 8,
    paddingHorizontal: 16,
  }
})

export default Page