import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import AppText from '../components/AppText';
import SearchBar from '../components/SearchBar';
import BlockCard from '../components/BlockCard';
import NewsDetail from '../components/NewsDetail';
import axios from 'axios';

const News = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState([]);


  useEffect(()=>{
    getList()
  },[])
  const getList= () => {
    axios({
        url:"http://192.168.1.3:83/api/News",
        method : "GET",
    }).then((res)=>{
        const reversedData = res.data.reverse();
        setList(reversedData);
        setOriginalList(reversedData); 
        // console.log(res.data); //ovaj deo koda se izvrsava
    })
    .then(res=>{
        // console.log("radi");
    }).then(res=>{
        // console.log("radi");
    })
  }

  //resetovanje liste
  const resetList = () => {
    setList(originalList);
  };
  
  const renderItem = ({ item }) => (
    <BlockCard
      key={item.newsID} 
      title={item.title}
      authorName={item.subtitle}
      subTitle={item.text}
      onPress={() =>
        navigation.navigate('NewsDetail', {
          id: item.newsID,
          title: item.title,
          authorName: item.subtitle,
          subTitle: item.text,
        })
      }
    />
  );

  const handleSearch = (searchText) => {
    if(searchText) {
        const filteredList = list.filter((item) => 
          (item.text && item.text.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.title && item.title.toLowerCase().includes(searchText.toLowerCase()))
    );
      setList(filteredList); 
    } else {
      setList(originalList);
    }
  };
  
  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch}/>
      <FlatList
        data={list}
        keyExtractor={(item) => item.newsID.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1E9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default News;
