import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import Title from './Title';
import Subtitle from './Subtitle';
import AuthorName from './AuthorName';
// import  { useNavigation} from '@react-navigation';

const BlockCard = ({ title, authorName, subTitle, onPress }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.columnStyle}>
            <View style={styles.imageContainer}>
              <Image resizeMode="stretch" source={require('../screens/novak.jpg')} style={styles.image} />
            </View>
            <View style={styles.contentContainer}>
                <Title>{title}</Title>
                <AuthorName>{authorName}</AuthorName>
                <Subtitle>{subTitle}</Subtitle>
            </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 130,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 10,
  },
  imageContainer: {
    width: '30%',
    paddingRight: 10,
  },
  image: {
    width: 110,
    height: 120,
    borderRadius: 8,
  },
  contentContainer: {
    width: '70%',
    padding: 5,    
  },
  columnStyle: {
    flex: 1,
    flexDirection: "row"
  }
});

export default BlockCard;
