import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const Test = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayersByLastName = async (letter) => {
      try {
        const response = await axios.get(`http://192.168.1.8:83/api/Player/ByLastName/${letter}`);
        const data = response.data;
        setPlayers((prevPlayers) => [...prevPlayers, { letter, data }]);
      } catch (error) {
        console.error(error);
      }
    };

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

    letters.forEach((letter) => {
      fetchPlayersByLastName(letter);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.letter}</Text>
        <FlatList
          data={item.data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={(item) => item.letter}
      />
    </View>
  );
};

export default Test;
