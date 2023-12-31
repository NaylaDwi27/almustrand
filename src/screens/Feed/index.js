import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Animated, View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { dataFeed, dataGaleri, dataKategori } from '../../../data';
import { Heart, SearchNormal, Add } from 'iconsax-react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from 'axios';
import firestore from '@react-native-firebase/firestore'

const Card = ({ id, title, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AlatPopulerDetail', { blogId: id })}>
      <ImageBackground source={{ uri: image }} style={styles.cardImage}>
        <View style={styles.darkOverlay}></View>
        <View style={styles.cardIcon}>
          <TouchableOpacity>
            <Heart color='red' size={25} variant='Linear' />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{ ...category.title, color }}>{item.namaKategori}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({ item }) => {
    const color = item.id === selected ? 'rgba(255, 195, 11, 1)' : 'white';
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={dataKategori}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const FeedScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [feedData, setFeedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('feed')
      .onSnapshot(querySnapshot => {
        const blogs = [];
        querySnapshot.forEach(documentSnapshot => {
          blogs.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setFeedData(blogs);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('blog')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setFeedData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);

  // const getFeedData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://6567ff729927836bd973fac3.mockapi.io/Almustrand/DataFeed',
  //     );
  //     setFeedData(response.data);
  //     setLoading(false)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     getFeedData()
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getFeedData();
  //   }, [])
  // );
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 120);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -120],
  });
  const [searchText, setSearchText] = useState('');

  const handleSearchPress = (text) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <View style={{ marginTop: 10, paddingHorizontal: 24, }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Cari Sesuatu"
              onChangeText={handleSearchPress}
              value={searchText}
              placeholderTextColor="gray"
            />
            <TouchableOpacity>
              <SearchNormal color={'black'} variant="Linear" size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 24, }}>
          <FlatListCategory />
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 120,
          // paddingBottom: 54,
        }}>
        {loading ? (<ActivityIndicator size={'large'} color={'rgba(255, 195, 11, 1)'} />) :
          (
            feedData.map((item, index) => <Card id={item.id} title={item.title} image={item.image} key={index} />)
          )
        }

      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddFeed")}
      >
        <Add color={'white'} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 60,
  },
  floatingButton: {
    backgroundColor: 'rgba(255, 195, 11, 1)',
    padding: 15,
    position: 'absolute',
    bottom: 80,
    right: 24,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    width: 35,
    height: 35,
  },
  header: {
    // paddingHorizontal: 24,
    // height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
  },
  icon: {
    marginRight: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 2,
    color: 'black',
    height: 45,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardTitle: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default FeedScreen;
