
import {  Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';




export const unstable_settings = {

  initialRouteName: 'index',
};

export default function RootLayoutNav() {
const navigation = useNavigation();

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ header:() => <CustomHeader/>}} />
        <Stack.Screen name="(modal)/filter" options={{presentation: 'modal',
      headerTitle: 'Filtro',
      headerShadowVisible:false,
      headerStyle: {
        backgroundColor: Colors.lightGrey,

      },
      headerLeft: () => (
        <Pressable onPress={() => {navigation.goBack()}}>
          <Ionicons name='close-outline' size={20} color={Colors.primary} />
        </Pressable>
      )
      }} />
      <Stack.Screen name="(modal)/dish" options={{presentation: 'modal',
      headerTitle: '',
      headerTransparent: true,
      headerLeft: () => (
        <Pressable style={{backgroundColor: '#fff', borderRadius: 20, padding:6 }} onPress={() => {navigation.goBack()}}>
          <Ionicons name='close-outline' size={20} color={Colors.primary} />
        </Pressable>
      )
      }} />
      <Stack.Screen name="(modal)/location-search" options={{presentation: 'fullScreenModal',
      headerTitle: 'Localização',
      headerLeft: () => (
        <Pressable onPress={() => {navigation.goBack()}}>
          <Ionicons name='close-outline' size={20} color={Colors.primary} />
        </Pressable>
      )
      }} />
      <Stack.Screen name="basket" options={{headerTitle: 'Cesta', headerLeft: () => (
        <Pressable onPress={() => {navigation.goBack()}}>
          <Ionicons name='arrow-back' size={28} color={Colors.primary} />
        </Pressable>
      )}} />
      </Stack>
    </BottomSheetModalProvider>
  );
}
