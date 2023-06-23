import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, BackHandler } from 'react-native';
import Admin from '../screens/Admin';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  DrawerContentAdmin  from '../screens/DrawerContentAdmin';
import Users from '../screens/Users';


const Drawer = createDrawerNavigator();

const NavigatorAdmin = () => {


  return (
      
      <Drawer.Navigator 
        useLegacyImplementation={true}
        drawerContent={(props) => <DrawerContentAdmin {...props}/>}
        >
          
          <Drawer.Screen name="Users" component={Users} 
          options={{
            headerBackground: () => (
              <ImageBackground
              source={require('../screens/trava.jpg')} // Putanja 
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
          {/* <Drawer.Screen name="Admin" component={Admin} 
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
              
          }}/> */}
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

export default NavigatorAdmin;
