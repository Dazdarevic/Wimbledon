import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';

function AppButton({title, onPress, color = "primary"}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'purple',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 200,
        marginVertical: 10,
        alignSelf: 'center'
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold', 
        letterSpacing: 2
    }
})
export default AppButton;