import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Players from '../screens/Players';
import Results from '../screens/Results';
import Admin from '../screens/Admin';
import News from '../screens/News';
import 'react-native-gesture-handler';
import NewsDetail from './NewsDetail';

import { createDrawerNavigator } from '@react-navigation/drawer';
import  DrawerContent  from '../screens/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack'; 

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // 


const DrawerNavigator = () => {


  return (
      
      <Drawer.Navigator 
        useLegacyImplementation={true}
        // drawerContent={props => <DrawerContent {...props}/>}
        drawerContent={(props) => <DrawerContent {...props}/>}
        >
          
          <Drawer.Screen 
              name="Home" 
              component={Home}  
              options={{
                headerBackground: () => (
                  <ImageBackground
                  source={require('../screens/trava.jpg')} // Putanja do slike
                  style={{ flex: 1,
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2, }}
                  />
                ),
                  drawerContentOptions: {
                    activeBackgroundColor: '#66347F',
                  },
                  drawerStyle: {
                    backgroundColor: '#fff',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                  color: '#fff',
                  letterSpacing: 1,
                  fontSize: 15,
                  },
                  headerTitleContainerStyle: {
                    marginLeft: -8, 
                  },
                  headerRight: () => (
                    <Image
                      source={require('../screens/wim.png')}
                      style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                    />
                  )}
          }/>
          <Drawer.Screen name="Results" component={Results} options={{
                headerBackground: () => (
                  <ImageBackground
                  source={require('../screens/trava.jpg')} // Putanja do slike
                  style={{ flex: 1,
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2, }}
                  />
                ),
                  drawerContentOptions: {
                    activeBackgroundColor: '#66347F',
                  },
                  drawerStyle: {
                    backgroundColor: '#fff',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                  color: '#fff',
                  letterSpacing: 1,
                  fontSize: 15,
                  },
                  headerTitleContainerStyle: {
                    marginLeft: -8, 
                  },
                  headerRight: () => (
                    <Image
                      source={require('../screens/wim.png')}
                      style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                    />
                  )
          }}/>
          <Drawer.Screen name="Admin" component={Admin} options={{
                headerBackground: () => (
                  <ImageBackground
                  source={require('../screens/trava.jpg')} // Putanja do slike
                    style={{ flex: 1,
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2, }}
                  />
                ),
                  drawerContentOptions: {
                    activeBackgroundColor: '#66347F',
                  },
                  drawerStyle: {
                    backgroundColor: '#fff',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                  color: '#fff',
                  letterSpacing: 1,
                  fontSize: 15,
                  },
                  headerTitleContainerStyle: {
                    marginLeft: -8, 
                  },
                  headerRight: () => (
                    <Image
                      source={require('../screens/wim.png')}
                      style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                    />
                  )
          }}/>
          <Drawer.Screen name="Players" component={Players} 
          options={{
            headerBackground: () => (
              <ImageBackground
              source={require('../screens/trava.jpg')} // Putanja do slike
              style={{ flex: 1,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2, }}
              />
            ),
              drawerContentOptions: {
                activeBackgroundColor: '#66347F',
              },
              drawerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              color: '#fff',
              letterSpacing: 1,
              fontSize: 15,
              },
              headerTitleContainerStyle: {
                marginLeft: -8, 
              },
              headerRight: () => (
                <Image
                source={require('../screens/wim.png')}
                style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                />
              )
          }}/>
          <Drawer.Screen name="News" component={News}
           options={{
            headerBackground: () => (
              <ImageBackground
              source={require('../screens/trava.jpg')} // Putanja do slike
              style={{ flex: 1,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2, }}
              />
            ),
              drawerContentOptions: {
                activeBackgroundColor: '#66347F',
              },
              drawerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              color: '#fff',
              letterSpacing: 1,
              fontSize: 15,
              },
              headerTitleContainerStyle: {
                marginLeft: -8, 
              },
              headerRight: () => (
                <Image
                source={require('../screens/wim.png')}
                style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                />
              )
          }}/>
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetail}
            options={{
              headerShown: false, 
            }}
          />
          <Drawer.Screen name="Login" component={Login} 
          options={{
            headerBackground: () => (
              <ImageBackground
              source={require('../screens/trava.jpg')} // Putanja do slike
              style={{ flex: 1,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2, }}
              />
            ),
              drawerContentOptions: {
                activeBackgroundColor: '#66347F',
              },
              drawerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              color: '#fff',
              letterSpacing: 1,
              fontSize: 15,
              },
              headerTitleContainerStyle: {
                marginLeft: -8, 
              },
              headerRight: () => (
                <Image
                source={require('../screens/wim.png')}
                style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                />
              )
              
          }}/>
          <Drawer.Screen name="Register" component={Register}
          options={{
            headerBackground: () => (
              <ImageBackground
              source={require('../screens/trava.jpg')} // Putanja do slike
              style={{ flex: 1,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2, }}
              />
            ),
              drawerContentOptions: {
                activeBackgroundColor: '#66347F',
              },
              drawerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              color: '#fff',
              letterSpacing: 1,
              fontSize: 15,
              },
              headerTitleContainerStyle: {
                marginLeft: -8, 
              },
              headerRight: () => (
                <Image
                  source={require('../screens/wim.png')}
                  style={{ width: 45, height: 45, alignSelf: 'center', marginRight: 105 }}
                />
              )
          }}/>
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DrawerNavigator;
