import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import colors from '../config/colors';

function Screen(props) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={[styles.screen, styles.view]}>
                {props.children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddinTop: Constants.statusBarHeight,
        marginVertical: 20,
        backgroundColor: colors.white,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    view: {
        flex: 1
    }
})
export default Screen;