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


const DrawerContent = (props) => {

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
                                <Title style={styles.title}>3 july - 16 july 2023</Title>
                            </View>
                        </View>

                        {/* linkovi ka drugim ekranima */}
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="home-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Home"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {
                                    props.navigation.navigate('Home')}}
                                // style={{ backgroundColor: '#CEE5D0', borderRadius: 10 }}
                            />
                            {/* <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="trophy-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Results"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('Results')}}
                            /> */}
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-group-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Players"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('Players')}}
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="card-bulleted-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="News"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('News')}}
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Login"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('Login')}}
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-arrow-right-outline" 
                                    color='#66347F'
                                    size={size}
                                    />
                                )}
                                label="Register"
                                labelStyle={{color: '#66347F', fontSize: 18, letterSpacing: 1}}
                                onPress={() => {props.navigation.navigate('Register')}}
                            />
                        </Drawer.Section>
                    </View>
                </View> 
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
        textTransform: 'uppercase',
        letterSpacing: 1
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
export default DrawerContent;