import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, ImageBackground, Image } from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Login from './Login';
import Register from './Register';
import moment from 'moment-timezone';
import Swiper from 'react-native-swiper';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';



const Home = ({navigation}) => {
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            BackHandler.exitApp();
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      );
    
    const currentDateTime = moment().tz('Europe/London').format('MM/DD/YYYY, HH:mm');
    // console.log('Current time in London:', currentDateTime);

    
    return (
        <View style={styles.container}>
            <StatusBar style={{backgroundColor: 'purple'}}/>
            <View style={styles.sliderContainer}>
            <Swiper 
                style={styles.wrapper} 
                autoplay={true}
                activeDotStyle={styles.activeDot} 
                dotStyle={styles.dot}
                autoplayTimeout={2}
                >
                <View style={styles.slide}>
                    <Image source={require('./tereni.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>
                    <Image source={require('./trofejj.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>
                    <Image source={require('./ulaz.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>
                    <Image source={require('./djod.jpg')} style={styles.image} />
                </View>
            </Swiper>
            </View>
            {/* <ImageBackground source={require('./ulaz.jpg')} */}
            {/* // style={{flex: 1, width: '100%', height: '100%'}}> */}
                <View style={{marginTop: 0}}>
                    <View>
                        <AppText style={styles.wim}>The Championships Wimbledon</AppText>
                        <AppText style={styles.date}>3 july - 16 july 2023</AppText>
                    </View>
                    <View style={styles.timezone}> 
                        <AppText style={styles.time}>Current time in London:</AppText>
                        <AppText style={styles.time}>{currentDateTime}</AppText>
                    </View>

                    <AppButton title="Login" color="#66347F" 
                    onPress={() =>  navigation.navigate("Login")}></AppButton>
                    <AppButton title="Sign up" color="#66347F"
                    onPress={() =>  navigation.navigate("Register")}></AppButton>
                </View>
            {/* </ImageBackground> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    timezone: {
        backgroundColor: "rgba(93, 156, 89, 0.7)", // Ovdje je 0.5 nivo providnosti
        width: "70%",
        alignSelf: "center",
        height: 110,
        borderRadius: 20,
        marginTop: 70,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 60,
        shadowColor: '#000', // Boja sjene
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25, // Prozirnost sjene (0-1)
        shadowRadius: 4, // Radijus sjene
        elevation: 5,
    },
    time: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        letterSpacing: 1,
    },
    date: {
        fontSize: 20,
        marginTop: 5,
        color: '#66347F',
        textTransform: 'uppercase',
        letterSpacing: 1,
        // marginTop: 70,
        alignSelf: "center",
        fontWeight: "700",
        shadowColor: '#000', // Boja sjene
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25, // Prozirnost sjene (0-1)
        shadowRadius: 4, // Radijus sjene
        elevation: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5
    },
    wim: {
        fontSize: 26,
        marginTop: 5,
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 70,
        alignSelf: "center",
        fontWeight: "700",
        shadowColor: '#000', // Boja sjene
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25, // Prozirnost sjene (0-1)
        shadowRadius: 4, // Radijus sjene
        elevation: 5,
        backgroundColor : 'rgba(102, 52, 127, 0.7)',
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        lineHeight: 39
    },
    sliderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      },
    image: {
        // flex: 1,
        resizeMode: "cover"
    },
    activeDot: {
        backgroundColor: '#66347F', // Promenite boju aktivnog kružića
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    dot: {
        backgroundColor: 'white', // Promenite boju kružića
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    
})
export default Home;