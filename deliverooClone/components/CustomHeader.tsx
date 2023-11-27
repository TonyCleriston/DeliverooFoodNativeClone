import { View, Text, SafeAreaView,StyleSheet,Pressable,Image,TextInput } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import BottomSheet from './BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'


const SearchBar = () => (
    <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                 <Ionicons style={styles.searchIcon} name="ios-search" size={20} color={Colors.medium} />
                <TextInput style={styles.input} placeholder='Restaurants, groceries, dishes...' />
            </View>
            <Link href={'/(modal)/filter'} asChild>
                <Pressable style={styles.optionButton}>
                    <Ionicons name="options-outline" size={20} color={Colors.primary} />
                </Pressable>
            </Link>
        </View>
    </View>
)
const CustomHeader = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const openModal = () => {
        bottomSheetRef.current?.present();
    }
  return (
    <SafeAreaView style={styles.safeArea}>
        <BottomSheet ref={bottomSheetRef} />
        <View style={styles.container}>
      <Pressable onPress={openModal}>
        <Image style={styles.bike} source={require('@/assets/data/bike.png')} />
      </Pressable>
      <Pressable style={styles.titleContainer} onPress={openModal}>
        <Text style={styles.title}>Delivery * Now</Text>
        <View style={styles.locationName}>
            <Text style={styles.subtitle}>London</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary}/>
        </View>
      </Pressable>
      <Pressable style={styles.profileButton}>
        <Ionicons name='person-outline' size={20} color={Colors.primary}/>
      </Pressable>
      </View>
      <SearchBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:20,
    },
    container: {
        height: 60,
        gap:20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal:20,
        paddingTop:0,
    },
    bike: {
        width:30,
        height:30,
    },
    locationName: {
        flexDirection:"row",
        alignItems:'center',
    },
    titleContainer: {
        flex:1,
    },
    title: {
        fontSize: 14,
        color: Colors.primary,
    },
    searchContainer:{
        height:60,
        backgroundColor: '#fff',
    },
    searchSection: {
        flexDirection: 'row',
        gap:10,
        flex: 1,
        paddingHorizontal:20,
        alignItems:'center',
    },
    searchField: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        padding:10,
        color: Colors.mediumDark,
    },
    optionButton: {
        padding:10,
        borderRadius:50,
    },
    searchIcon: {
        paddingLeft: 10,
    },
    subtitle: {
        fontSize:18,
        fontWeight: 'bold',

    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius:50,
    },
})

export default CustomHeader