import { Setting } from 'iconsax-react-native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { dataFeed } from '../../../data';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actions-sheet';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  useEffect(() => {
    const user = auth().currentUser;
    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);
  const handleLogout = async () => {
    try {
      closeActionSheet();
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground style={styles.imageBanner} resizeMode='cover' source={{ uri: 'https://images.unsplash.com/photo-1671636791627-a5b55434aadb?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}>
          <TouchableOpacity onPress={openActionSheet} style={styles.iconContainer}>
            <Setting color={'white'} variant="Linear" size={25} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: profileData?.photoUrl,
              }}
              style={{ ...styles.profileImage }}
            />
          </View>
          <View>
            <Text style={styles.profileName}>{profileData?.fullName}</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10, }}>
            <Text style={styles.profileNumber}>{profileData?.followingCount}</Text>
            <Text style={styles.profileInfo}>Mengikuti</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10, }}>
            <TouchableOpacity style={{ backgroundColor: 'lightgray', paddingHorizontal: 25, paddingVertical: 15, borderRadius: 50, }}>
              <Text style={styles.profileNumber}>Edit Profil</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
              ...styles.likedPhotosText,
              borderBottomWidth: 3,
              borderBottomColor: 'grey',
              borderRadius: 20,
            }}>Foto yang Disukai</Text>

          </View>
          <View style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
            {dataFeed.map((item, index) => {
              return (
                <View key={item.id} style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <View style={styles.darkOverlay}></View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleLogout}>
          <Text
            style={{
              
              color: 'black',
              fontSize: 18,
            }}>
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    backgroundColor: 'white',
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
  card: {
    width: '48%',
    marginVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageBanner: {
    height: 150,
  },
  iconContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    zIndex: 2,
  },
  profileName: {
    marginTop: 60,
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  profileBio: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
  },
  profileNumber: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  profileInfo: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
  },
  likedPhotosText: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    paddingBottom: 10,
  }
});

export default ProfileScreen;