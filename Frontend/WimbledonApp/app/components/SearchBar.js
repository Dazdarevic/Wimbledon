import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    props.onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={handleSearch}
        // onSubmitEditing={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SearchBar;
