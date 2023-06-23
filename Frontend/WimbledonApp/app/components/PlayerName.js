import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function PlayerName({name, player, onPress, onDelete, onEdit }) {
    const handlePress = () => {
        onPress(player);
      };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
            <View style={styles.buttons}>
            <TouchableOpacity
                onPress={onDelete}
            >
                <Text style={styles.txt_del}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onEdit}
            >
                <Text style={styles.txt_edit}>Edit</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
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
    buttons: {
        paddingRight: 20
    },
    txt_del: {
        color: "#66347F",
        fontWeight: "500",
        alignSelf: "center",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    txt_edit: {
        color: "#66347F",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
})
export default PlayerName;