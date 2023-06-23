import React from 'react';
import { FlatList } from 'react-native';
import BlockCard from './BlockCard';

const NewsList = ({ navigation }) => {
    // ...
    const renderItem = ({ item }) => (
      <BlockCard
        title={item.title}
        authorName={item.authorName}
        subTitle={item.subTitle}
        onPress={() => navigation.navigate('NewsDetail', { news: item })}
      />
    );
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    );
  };
  
export default NewsList;