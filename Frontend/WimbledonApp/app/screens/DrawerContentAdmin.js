import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Avatar,
    Title,
    Caption, 
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackHandler } from 'react-native';
import { useLogin } from '../context/LoginProvider';
import jwtDecode from 'jwt-decode';

const DrawerContentAdmin = (props) => {

    
    const {setIsLoggedIn} = useLogin();
    const {setAccessToken} = useLogin();

    
    const {accessToken} = useLogin();
    const decodedToken = jwtDecode(accessToken);
    console.log(decodedToken.UserPassword); //userName iz accessToken-a

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                 <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'column', alignItems: 'center', 
                        justifyContent: 'center', marginTop: 20}}>
                            <Avatar.Image 
                                source={require('./logow.jpg')} size={120}/>
                            <View>
                                <Title style={styles.title}>{decodedToken.UserName}</Title>
                                <Title style={styles.title_role}>{decodedToken.UserRole}</Title>
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-group-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Users"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('Users')}}
                            />
                            {/* <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="My profile"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('Admin')}}
                            /> */}
                        </Drawer.Section>
                    </View>
                </View> 
                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="logout" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Log Out"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1, 
                                }}
                                onPress={() => {
                                        setIsLoggedIn(false),
                                        setAccessToken(null)
                                }}
                                style={{backgroundColor: '#F6F1E9', marginTop: 380}} // Dodajte ovu liniju za promenu pozadine u sivu
                            />
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 5,
        color: '#66347F',
        textTransform: 'capitalize',
        letterSpacing: 1
    },
    title_role: {
        fontSize: 16,
        marginTop: 5,
        color: '#66347F',
        textTransform: 'uppercase',
        letterSpacing: 0,
        fontWeight: "500",
        alignSelf: "center",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
        marginLeft: -15
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
})
export default DrawerContentAdmin;