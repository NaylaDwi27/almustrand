import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const EditFeedForm = ({route}) => {
  const { blogId } = route.params;
  const [loading, setLoading] = useState(false);
  const dataCategory = [
    { id: 1, name: "Alat Musik Jawa" },
    { id: 2, name: "Alat Musik Kalimantan" },
    { id: 3, name: "Alat Musik Papua" },
    { id: 4, name: "Alat Musik NTT" },
  ];
  const [feedData, setFeedData] = useState({
    title: "",
    content: "",
    category: {},
  });
  const handleChange = (key, value) => {
    setFeedData({
      ...feedData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    getBlogById();
  }, [blogId]);

  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://6567ff729927836bd973fac3.mockapi.io/Almustrand/DataFeed/${blogId}`,
      );
      setFeedData({
        title: response.data.title,
        content: response.data.description,
        category: {
          id: response.data.category.id,
          name: response.data.category.name
        }
      })
      setImage(response.data.image)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios
        .put(`https://6567ff729927836bd973fac3.mockapi.io/Almustrand/DataFeed/${blogId}`, {
          image,
          title: feedData.title,
          description: feedData.content,
          category: feedData.category,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
      navigation.navigate('Explore');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={'black'} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Edit Feed</Text>
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
          <TextInput
            placeholder="Image"
            value={image}
            onChangeText={(text) => setImage(text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
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
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
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

export default EditFeedForm;

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