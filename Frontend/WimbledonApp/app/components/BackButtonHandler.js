import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

const BackButtonHandler = ({ navigation }) => {
  useEffect(() => {
    const handleBackPress = () => {
      // Dodajte željenu logiku ili navigaciju ovde
      // Na primer, možete koristiti navigacioni objekat za povratak na prethodni ekran
      navigation.goBack();
      // Vratite `true` ako želite da sprečite podrazumevanu radnju povratka
      // Vratite `false` ako želite da dozvolite podrazumevanu radnju povratka
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  return null;
};

export default BackButtonHandler;
