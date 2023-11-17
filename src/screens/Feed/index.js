import React, { useState, useRef } from 'react';
import { Animated, View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { dataFeed, dataGaleri, dataKategori } from '../../../data';
import { Heart, SearchNormal } from 'iconsax-react-native';

const Card = ({ title, image }) => (
  <View style={styles.card}>
    <ImageBackground source={{ uri: image }} style={styles.cardImage}>
      <View style={styles.darkOverlay}></View>
      <View style={styles.cardIcon}>
        <TouchableOpacity>
          <Heart color='red' size={25} variant='Linear' />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

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
      <View style={{ paddingHorizontal: 20, }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          contentContainerStyle={{
            // paddingHorizontal: 24,
            paddingTop: 120,
            // paddingBottom: 54,
          }}
          data={dataFeed}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <Card title={item.title} image={item.image} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 60,
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
