import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More, Clipboard, ClipboardText, Paperclip, Paperclip2, DocumentDownload } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { dataAlatPopuler } from '../../../data';
const AlatPopulerDetail = ({ route }) => {
  const { blogId } = route.params;
  const selectedBlog = dataAlatPopuler.find(blog => blog.id === blogId);
  const navigation = useNavigation();
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
      <ScrollView
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
              uri: selectedBlog.image,
            }}
            resizeMode={'cover'} />
          <More
            color={'black'}
            variant="Linear"
          />
          <DocumentDownload color={'black'} variant="Linear" size={24} />
          <Paperclip2 color={'black'} variant="Linear" size={24} />
        </View>
        <Text style={styles.title}>{selectedBlog.name}</Text>
        <Text style={styles.content}>{selectedBlog.description}</Text>
      </ScrollView>
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