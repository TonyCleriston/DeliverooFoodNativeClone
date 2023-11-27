import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { forwardRef, useMemo,useCallback } from "react";
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export type Ref = BottomSheetModal;
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
  const {dismiss} = useBottomSheetModal();
  return (
    <BottomSheetModal backgroundStyle={{backgroundColor: Colors.lightGrey, borderRadius:0,}} overDragResistanceFactor={0}  ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <Pressable style={styles.toggleActive}>
            <Text style={styles.activeText}>
              Entregas
            </Text>
          </Pressable>
          <Pressable style={styles.toggleInactive}>
          <Text style={styles.inactiveText}>
              Escolher
            </Text>
          </Pressable>
        </View>
        <Text style={styles.subheader}>Sua Localização</Text>
        <Link href={'/(modal)/location-search'} asChild>
          <Pressable>
              <View style={styles.item}>
                <Ionicons name="location-outline" size={20} color={Colors.medium}/>
                <Text style={{flex:1}}>
                  usar localização atual
                </Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.primary}/>
              </View>
          </Pressable>
        </Link>
        <Text style={styles.subheader}>Tempo de chegada</Text>
        <Pressable>
              <View style={styles.item}>
                <Ionicons name="stopwatch-outline" size={20} color={Colors.medium}/>
                <Text style={{flex:1}}>
                  Agora
                </Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.primary}/>
              </View>
          </Pressable>
        <Pressable style={styles.button} onPress={() => dismiss} >
          <Text style={styles.buttonText}>
            Confirmar
          </Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontWeight:'bold',
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderColor: Colors.grey,
    borderWidth:1,
  },
  subheader: {
    fontSize:16,
    fontWeight: '600',
    margin:16,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    marginBottom:32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding:8,
    borderRadius: 32,
    paddingHorizontal:30,
  },
  toggleInactive: {
    padding:8,
    borderRadius: 32,
    paddingHorizontal:30,
  },
  activeText: {
    color: '#fff',
    fontWeight:'700',
  },
  inactiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius:4,
    margin: 16,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  }

})

export default BottomSheet;
