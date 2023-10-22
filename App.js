import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, ImageBackground, TextInput, Button } from 'react-native';
import { Notification, SearchNormal, Receipt21, Clock, Message, ArrowRight2, HambergerMenu, } from 'iconsax-react-native';
import { ItemGaleri } from './src/components';
import { dataGaleri } from './data';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchPress = (text) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <View style={styles.notificationContainer}>
              <HambergerMenu color={'black'} variant="Linear" size={24} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Almustrand</Text>
            </View>
            <View style={styles.notificationContainer}>
              <Notification color={'black'} variant="Linear" size={24} />
            </View>
          </View>
          <View style={styles.header}>
            <Image
              source={{
                uri: 'https://templates.iqonic.design/sofbox-admin/sofbox-dashboard-html/html/images/user/02.jpg',
              }}
              style={{ ...styles.profileImage, marginRight: 10, }}
            />
            <Text style={styles.welcomeText}>Selamat Datang, Nayla</Text>
          </View>
          <View style={{ paddingHorizontal: 24, marginTop: 10, }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Cari Alat Musik"
                onChangeText={handleSearchPress}
                value={searchText}
                placeholderTextColor="gray"
              />
              <TouchableOpacity>
                <SearchNormal color={'black'} variant="Linear" size={24} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <AlatMusikPopuler />
        <Galeri />
        <Berita />
      </ScrollView>
    </View>
  );
};

const AlatMusikPopuler = () => {
  return (
    <View style={styles.headerGaleri}>
      <View style={styles.galeriTitleContainer}>
        <Text style={styles.textSeni}>Alat Musik Populer</Text>
      </View>

      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 20 }}>
          <View style={{ ...itemPopuler.cardItem, marginLeft: 0, }}>
            <View style={{ position: 'absolute', bottom: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, }}>
              <Text style={itemPopuler.cardMore}>Selengkapnya</Text>
              <ArrowRight2 color={'black'} variant="Linear" size={20} />
            </View>
            <ImageBackground
              style={itemPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/736x/7e/0d/a9/7e0da932ed99c04c700899f6bb7f659e.jpg',
              }}
            >
              <View style={itemPopuler.darkOverlay}></View>
              <View style={itemPopuler.cardContent}>
                <View style={itemPopuler.textContainer}>
                  <Text style={itemPopuler.cardTitle}>Gamelan</Text>
                  <Text style={itemPopuler.cardText}>Gamelan adalah musik tradisional di Indonesia yang memiliki tangga nada pentatonis dalam sistem tangga nada slendro dan pelog.</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...itemPopuler.cardItem, marginLeft: 0, }}>
            <View style={{ position: 'absolute', bottom: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, }}>
              <Text style={itemPopuler.cardMore}>Selengkapnya</Text>
              <ArrowRight2 color={'black'} variant="Linear" size={20} />
            </View>
            <ImageBackground
              style={itemPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/564x/a8/ee/46/a8ee46db1a0483d7d8438c938d9b7afc.jpg',
              }}
            >
              <View style={itemPopuler.darkOverlay}></View>
              <View style={itemPopuler.cardContent}>
                <View style={itemPopuler.textContainer}>
                  <Text style={itemPopuler.cardTitle}>Angklung</Text>
                  <Text style={itemPopuler.cardText}>Alat musik ini dibuat dari bambu, dibunyikan dengan cara digoyangkan sehingga menghasilkan bunyi yang bergetar dalam susunan nada 2, 3, sampai 4 nada dalam setiap ukuran, baik besar maupun kecil.</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const Galeri = () => {
  return (
    <View style={styles.headerGaleri}>
      <View style={styles.galeriTitleContainer}>
        <Text style={styles.textSeni}>Galeri</Text>
        <ArrowRight2 color={'black'} variant="Linear" size={20} />
      </View>
      <View style={styles.listBlog}>
        <ItemGaleri data={dataGaleri} />
      </View>
    </View>
  );
};

const Berita = () => {
  return (
    <View style={styles.headerSeniDaerah}>
      <View style={styles.galeriTitleContainer}>
        <Text style={styles.textSeni}>Berita</Text>
        <ArrowRight2 color={'black'} variant="Linear" size={20} />
      </View>
      <View style={beritaSeniRupa.listCard}>
        <View style={beritaSeniRupa.cardItem}>
          <Image
            style={beritaSeniRupa.cardImage}
            source={{
              uri: 'https://akcdn.detik.net.id/community/media/visual/2023/08/23/papompang_169.jpeg?w=700&q=90',
            }}
          />
          <View style={beritaSeniRupa.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ gap: 5, width: '100%' }}>
                <Text style={beritaSeniRupa.cardCategory}>Alat Musik</Text>
                <Text style={beritaSeniRupa.cardTitle}>
                  Mengenal Pa' pompang, Alat Musik Tradisional Khas Toraja
                </Text>
              </View>
            </View>
            <View style={beritaSeniRupa.cardInfo}>
              <Clock
                size={10}
                variant="Linear"
                color={'rgba(109, 125, 154, 0.6)'}
              />
              <Text style={beritaSeniRupa.cardText}>25 Agu 2023</Text>
            </View>
          </View>
        </View>

      </View>
    </View>

  );
};

const beritaSeniRupa = StyleSheet.create({
  listCard: {
    paddingVertical: 10,
  },
  cardItem: {
    flexDirection: 'row',
  },
  cardCategory: {
    backgroundColor: 'rgba(255, 195, 11, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 10,
    color: 'black',
    width: '35%',
    textAlign: 'center',

  },
  cardTitle: {
    fontSize: 14,

    color: 'black',
  },
  cardText: {
    fontSize: 10,

    color: 'rgba(255, 195, 11, 1)',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerGaleri: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerSeniDaerah: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  welcomeText: {
    fontSize: 16,
    marginRight: 20,
    color: 'black',
  },
  textSeni: {
    fontSize: 20,
    marginRight: 8,

    color: 'black',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 0,
  },
  galeriTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});

export default HomeScreen;
