import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { ArrowRight2, Heart, Receipt21 } from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
const navigation = useNavigation();
const ItemHorizontal = ({ item, variant, onPress }) => {
  return (
    <View style={{ ...itemPopuler.cardItem, marginLeft: 0, }}>
      <TouchableOpacity style={{ position: 'absolute', bottom: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, }} onPress={() => navigation.navigate('AlatPopulerDetail', {blogId: item.id})}>
        <Text style={itemPopuler.cardMore}>Selengkapnya</Text>
        <ArrowRight2 color={'black'} variant="Linear" size={20} />
      </TouchableOpacity>
      <ImageBackground
        style={itemPopuler.cardImage}
        resizeMode="cover"
        imageStyle={{ borderRadius: 15 }}
        source={{
          uri: item.image,
        }}
      >
        <View style={itemPopuler.darkOverlay}></View>
        <View style={itemPopuler.cardContent}>
          <View style={itemPopuler.textContainer}>
            <Text style={itemPopuler.cardTitle}>{item.name}</Text>
            <Text style={itemPopuler.cardText}>{item.description}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const ListAlatPopuler = ({ data }) => {
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
export default ListAlatPopuler;
const itemPopuler = StyleSheet.create({
  cardItem: {
    width: 'auto',
    height: 350,
    backgroundColor: 'rgba(255, 195, 11, 0.6)',
    borderRadius: 20,
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 5,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
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
  cardMore: {

    fontSize: 16,
    color: 'black',
    flex: 1,
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
    borderRadius: 5,
    width: 30,
    height: 30,
  },
})