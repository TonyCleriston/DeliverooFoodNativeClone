import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import useBasketStore from "@/store/basketStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0)
  const opacity = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => ({opacity: opacity.value}))
  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const {items, total} = useBasketStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => {
        <Pressable style={styles.roundButton} onPress={() => navigation.goBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>;
      },
      headerRight: () => {
        <View style={styles.bar}>
          <Pressable style={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </Pressable>
          <Pressable style={styles.roundButton}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </Pressable>
        </View>;
      },
    });
  }, []);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index]
    setActiveIndex(index);

    selected.measure((x) => {
        scrollRef.current?.scrollTo({ x: x -16, y: 0, animated: true})
    })
  }

  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<TouchableOpacity[]>([])

  const onScroll = (event:any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 350) {
        opacity.value = withTiming(1)
    } else {
        opacity.value = withTiming(0)
    }
  }

const renderItem: ListRenderItem<any> = ({item,index}) => (
    <Link href={{pathname: '/(modal)/dish', params:{id: item.id}}} asChild>
    <Pressable style={styles.item}>
        <View style={{flex: 1}}>
            <Text style={styles.dish}>{item.name}</Text>
            <Text style={styles.dishText}>{item.info}</Text>
            <Text style={styles.dishText}>R${item.price}</Text>
        </View>
        <Image source={item.img} style={styles.dishImage} />
    </Pressable>
    </Link>
)

  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        style={{ flex: 1 }}
        backgroundColor={"#fff"}
        parallaxHeaderHeight={250}
        contentBackgroundColor={Colors.lightGrey}
        stickyHeaderHeight={105}
        renderStickyHeader={() => (
          <View style={styles.stickySection} key="sticky-header">
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ width: "100%", height: 300 }}
          />
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} •{" "}
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? " • " : ""}`
            )}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
          <SectionList
            SectionSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal:16, height: 1, backgroundColor: Colors.grey }} />
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={DATA}
            renderItem={renderItem}
          />
        </View>
      </ParallaxScrollView>

      <Animated.View style={[styles.stickySegments, animatedStyles]}>
                <View style={styles.segmentsShadow}>
                    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentScrollview}>
                        {restaurant.food.map((item,index) => (
                            <TouchableOpacity ref={ref => itemsRef.current[index] = ref!} onPress={() => selectCategory(index)} key={index} style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}>
                                <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
      </Animated.View>
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView style={{backgroundColor: '#fff'}} edges={['bottom']}>
              <Link href="/basket" asChild>
              <Pressable style={styles.fullButton}>
              <Text style={styles.basket}>{items}</Text>
              <Text style={styles.footerText}>Ver Cesta</Text>
              <Text style={styles.basketTotal}>R${total}</Text>
              </Pressable>
              </Link>
        </SafeAreaView>
          </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  basketTotal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,

  },
  basket: {
    color: '#fff',
    backgroundColor: '#19AA86',
    padding: 8,
    fontWeight: 'bold',
    borderRadius: 2,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    segmentScrollview:{
        paddingHorizontal:16,
        alignItems: 'center',
        gap:20,
        paddingBottom:4,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    stickySegments: {
       position: 'absolute',
        height:50,
        top: 100,
        right:0,
         left:0,
         backgroundColor: '#fff',
         overflow: 'hidden',
         paddingBottom:4,
    },
    segmentsShadow: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop:10,
        shadowColor: '#000',
        shadowOffset: {
            width:0,
            height:4,
        },
        shadowOpacity: 0.1,
        elevation:5,
        width: "100%",
        shadowRadius: 4,
        height: "100%",
    },
    dish:{
        fontSize: 16,
        fontWeight: 'bold',

    },
    dishText: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical:4,
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    item: {
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
    },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  stickySection: {
    justifyContent: "flex-end",
    marginLeft: 70,
    marginTop:37,
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
});

export default Details;
