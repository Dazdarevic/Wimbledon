import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import News from './News';
import NewsDetail from '../components/NewsDetail';

const Stack = createStackNavigator();

const NewsStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="News">
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="NewsDetail" component={NewsDetail}/>
    </Stack.Navigator>
  );
};

export default NewsStack;
