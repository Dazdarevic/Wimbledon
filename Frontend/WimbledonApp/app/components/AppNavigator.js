import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from './NewsDetail';
import News from '../screens/News';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Detail' component={Detail}/>
            <Stack.Screen name='News' component={News}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    
})
export default AppNavigator;