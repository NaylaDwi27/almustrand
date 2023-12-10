import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More, Clipboard, ClipboardText, Paperclip, Paperclip2, DocumentDownload } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { dataAlatPopuler } from '../../../data';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const AlatPopulerDetail = ({ route }) => {
  const { blogId } = route.params;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  // useEffect(() => {
  //   getBlogById();
  // }, [blogId]);

  // const getBlogById = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://6567ff729927836bd973fac3.mockapi.io/Almustrand/DataFeed/${blogId}`,
  //     );
  //     setSelectedBlog(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    const subscriber = firestore()
      .collection('feed')
      .doc(blogId)
      .onSnapshot(documentSnapshot => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setSelectedBlog(blogData);
        } else {
          console.log(`Blog with ID ${blogId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [blogId]);

  const navigateEdit = () => {
    closeActionSheet()
    navigation.navigate('EditFeed', { blogId })
  }
  // const handleDelete = async () => {
  //   await axios.delete(`https://6567ff729927836bd973fac3.mockapi.io/Almustrand/DataFeed/${blogId}`)
  //     .then(() => {
  //       closeActionSheet()
  //       navigation.navigate('Explore');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('feed')
        .doc(blogId)
        .delete()
        .then(() => {
          console.log('Feed deleted!');
        });
      if (selectedBlog?.image) {
        const imageRef = storage().refFromURL(selectedBlog?.image);
        await imageRef.delete();
      }
      console.log('Feed deleted!');
      closeActionSheet();
      setSelectedBlog(null);
      setLoading(false)
      navigation.navigate('Explore');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            color={'black'}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
      </View>
      {loading ? (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size={'large'} color={'rgba(255, 195, 11, 1)'} />
      </View>) : (<ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 62,
          paddingBottom: 54,
        }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Image
            style={styles.image}
            source={{
              uri: selectedBlog?.image,
            }}
            resizeMode={'cover'} />
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color={'black'}
              variant="Linear"
            />
          </TouchableOpacity>
          <DocumentDownload color={'black'} variant="Linear" size={24} />
          <Paperclip2 color={'black'} variant="Linear" size={24} />
        </View>
        <Text style={styles.title}>{selectedBlog?.title}</Text>
        <Text style={styles.content}>{selectedBlog?.description}</Text>
      </ScrollView>)
      }
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
          onPress={navigateEdit}
        >
          <Text
            style={{

              color: 'black',
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{

              color: 'black',
              fontSize: 18,
            }}>
            Delete
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
export default AlatPopulerDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 15,
  },
  info: {
    color: 'black',
    fontSize: 12,
  },
  category: {
    color: 'gold',
    fontSize: 12,
  },
  date: {
    color: 'black',
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});