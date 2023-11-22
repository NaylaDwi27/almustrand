import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

const AddFeedForm = () => {
  const dataCategory = [
    { id: 1, name: "Alat Musik Jawa" },
    { id: 2, name: "Alat Musik Kalimantan" },
    { id: 3, name: "Alat Musik Papua" },
    { id: 4, name: "Alat Musik NTT" },
  ];
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: {},
  });
  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
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
            value={blogData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderInput, { minHeight: 250 }]}>
          <TextInput
            placeholder="Description"
            value={blogData.content}
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
                item.id === blogData.category.id
                  ? 'black'
                  : 'black';
              const color =
                item.id === blogData.category.id
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
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
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