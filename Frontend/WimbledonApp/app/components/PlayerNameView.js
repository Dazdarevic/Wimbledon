import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function PlayerNameView({name, player, onPress }) {
    const handlePress = () => {
        onPress(player);
      };
    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={onPress}>
                <Text style={styles.name}>{name}</Text>
             </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginLeft: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingLeft: 20,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    name: {
        color: "#446A46",
        fontSize: 15, 
        paddingTop: 10
    },
})
export default PlayerNameView;