import React from 'react';
import AppText from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

function AuthorName({ children, numberOfLines = 3 }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='account-edit-outline' size={15} style={styles.icon} />
      <AppText numberOfLines={numberOfLines} style={styles.text}>
        {children}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', // Centriraj
  },
  icon: {
    marginRight: 5, 
    color: '#0079FF',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
    color: '#0079FF',
    fontWeight: 'bold'
  },
});

export default AuthorName;
