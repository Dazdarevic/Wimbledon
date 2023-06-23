import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function PlayersName({letter}) {
    return (
        <View style={styles.container}>
            <Text style={styles.letter}>{letter}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        margin: 10,
        marginLeft: 20
    },
    letter: {
        fontSize: 30,
        fontWeight: '500',
        backgroundColor: '#446A46', //zelena boja
        paddingLeft: 20,
        color: "white"
    }
})
export default PlayersName;