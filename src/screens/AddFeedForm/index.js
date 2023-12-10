import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";
import { ArrowLeft, AddSquare, Add } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddFeedForm = () => {
  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`feedimages/${filename}`);

    setLoading(true);
    try {
      await reference.putFile(image);
      const url = await reference.getDownloadURL();
      await firestore().collection('feed').add({
        image: url,
        title: feedData.title,
        description: feedData.content,
        category: feedData.category,
      });
      setLoading(false);
      console.log('Feed added!');
      navigation.navigate('Explore');
    } catch (error) {
      console.log(error);
    };
    // try {
    //   await axios.post('https://6567ff729927836bd973fac3.mockapi.io/Almustrand/DataFeed', {
    //     image,
    //     title: feedData.title,
    //     description: feedData.content,
    //     category: feedData.category,
    //   })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   setLoading(false);
    //   navigation.navigate('Explore');
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const dataCategory = [
    { id: 1, name: "Alat Musik Jawa" },
    { id: 2, name: "Alat Musik Kalimantan" },
    { id: 3, name: "Alat Musik Papua" },
    { id: 4, name: "Alat Musik NTT" },
  ];
  const [feedData, setBlogData] = useState({
    title: "",
    content: "",
    category: {},
  });
  const handleChange = (key, value) => {
    setBlogData({
      ...feedData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={'black'} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Tambahkan Feed Baru</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <View style={textInput.borderInput}>
          <TextInput
            placeholder="Judul"
            value={feedData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderInput, { minHeight: 250 }]}>
          <TextInput
            placeholder="Description"
            value={feedData.content}
            onChangeText={(text) => handleChange("content", text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderInput]}>
          <Text
            style={{
              fontSize: 12,

              color: 'rgba(128, 128, 128, 0.6)',
            }}
          >
            Category
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === feedData.category.id
                  ? 'black'
                  : 'black';
              const color =
                item.id === feedData.category.id
                  ? 'rgba(255, 195, 11, 1)'
                  : 'white';
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange("category", { id: item.id, name: item.name })
                  }
                  style={[category.item, { backgroundColor: bgColor }]}
                >
                  <Text style={[category.name, { color: color }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {image ? (
          <View style={{ position: 'relative' }}>
            <Image
              style={{ width: '100%', height: 127, borderRadius: 5 }}
              source={{
                uri: image,
              }}
              resizeMode={'cover'}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'rgba(255, 195, 11, 1)',
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={'white'}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.borderInput,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color={'rgba(128, 128, 128, 0.6)'} variant="Linear" size={42} />
              <Text
                style={{

                  fontSize: 12,
                  color: 'rgba(128, 128, 128, 0.6)',
                }}>
                Upload Foto
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={'rgba(255, 195, 11, 1)'} />
        </View>
      )}
    </View>
  );
};

export default AddFeedForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {

    fontSize: 16,
    color: 'black',
  },
  bottomBar: {
    backgroundColor: 'white',
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 195, 11, 1)',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,

    color: 'white',
  },
});
const textInput = StyleSheet.create({
  borderInput: {
    // borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: 'rgba(128, 128, 128, 0.4)',
  },
  title: {
    fontSize: 12,

    color: 'black',
    padding: 0,
  },
  content: {
    fontSize: 12,

    color: 'black',
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,

    color: 'rgba(128, 128, 128, 0.6)',
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,

  },
});