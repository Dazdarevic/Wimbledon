import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function PlayerInfoText({text, value, fontWeight = '400'}) {
    return (
        <View style={styles.playerContentInfo}>
            <Text style={[styles.text, { fontWeight }]}>{text}:</Text>
            <Text style={[styles.value, { fontWeight }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerContentInfo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
        // backgroundColor: "red",
        paddingVertical: 8,
        fontSize: 15,
        // paddingHorizontal: 20
      },
      value: {
        color: "#66347F",
        // fontWeight: 'bold',
        marginLeft: 50,
        letterSpacing: 1,
        width: '60%'
      },
      text: {
        letterSpacing: 1,
        width: "40%"
      }
})
export default PlayerInfoText;