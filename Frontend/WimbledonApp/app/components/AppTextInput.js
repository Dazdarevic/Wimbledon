import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AppTextInput({icon, ...placeholder}) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>}
            <TextInput style={styles.textInput} {...placeholder}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        borderRadius: 25,
        flexDirection: 'row',
        width: 300,
        padding: 15,
        marginVertical: 0,
        alignItems: 'center',
        shadowColor: '#000', // Boja sjene
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25, // Prozirnost sjene (0-1)
        shadowRadius: 4, // Radijus sjene
        elevation: 5, // Obrada senke na Androidu
    },
    icon: {
        marginRight: 10
    },
    textInput: {
        fontSize: 18
    }
})
export default AppTextInput;