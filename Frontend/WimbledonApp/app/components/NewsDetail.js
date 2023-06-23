import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, BackHandler  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from './AppText';
import Title from './Title';
import Subtitle from './Subtitle';
import AuthorName from './AuthorName';

const NewsDetail = ({ route }) => {
  const { title, authorName, subTitle } = route.params;
  const navigation = useNavigation();

  // Funkcija za povratak na prethodni ekran
  const goBack = () => {
    navigation.navigate('News')
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('News');
      return true; // Povratak "true" sprečava podrazumevanu radnju sistema
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Ukloni pretplatu na događaj pritiska na dugme "Back" prilikom unmount-a komponente
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.strelica}>
          <MaterialIcons name="arrow-back" size={30} color="#0079FF" />
          <AppText style={styles.back}>Back</AppText>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image source={require('../screens/ulaz.jpg')} style={styles.image} />
        <View style={styles.contentContainer}>
          <Title numberOfLines={null}>{title}</Title>
          <AuthorName style={styles.authorName}>{authorName}</AuthorName>
          <Subtitle numberOfLines={null}>{subTitle}</Subtitle>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  back: {
    color: '#0079FF',
    fontSize: 18,
    letterSpacing: 0,
    marginLeft: 5
  },
  strelica: {
    flexDirection: "row",
    color: 'blue'
  },
  authorName: {
    fontSize: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: "",
    paddingLeft: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 10,
  },
});

export default NewsDetail;
