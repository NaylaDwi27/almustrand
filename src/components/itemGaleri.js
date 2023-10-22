import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { Heart, Receipt21 } from 'iconsax-react-native';
const ItemHorizontal = ({ item, variant, onPress }) => {
  return (
    <View style={{ ...itemGaleri.cardItem, marginLeft: 0 }}>
      <ImageBackground
        style={itemGaleri.cardImage}
        resizeMode="cover"
        imageStyle={{ borderRadius: 15 }}
        source={{
          uri: item.image,
        }}
      >
        <View style={itemGaleri.darkOverlay}></View>
        <View style={itemGaleri.cardContent}>
          <View style={itemGaleri.textContainer}>
            <View style={itemGaleri.cardIcon}>
              <TouchableOpacity onPress={onPress}>
                <Heart color='red' size={25} variant={variant} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const ListGaleri = ({ data }) => {
  const [love, setLove] = useState([]);
  const toggleLove = itemId => {
    if (love.includes(itemId)) {
      setLove(love.filter(id => id !== itemId));
    } else {
      setLove([...love, itemId]);
    }
  };
  const renderItem = ({ item }) => {
    variant = love.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemHorizontal
        item={item}
        variant={variant}
        onPress={() => toggleLove(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default ListGaleri;
const itemGaleri = StyleSheet.create({
  cardItem: {
    width: 'auto',
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
  cardImage: {
    width: 300,
    height: 200,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {

    fontSize: 14,
    color: 'white',
  },
  cardText: {
    fontSize: 10,
    color: 'white',

  },
  cardIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    width: 35,
    height: 35,
  },
})