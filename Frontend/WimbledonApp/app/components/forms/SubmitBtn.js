import React from 'react';
import { useFormikContext } from 'formik';
import AppButton from '../AppButton';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

function SubmitBtn({title}) {
    const { handleSubmit } = useFormikContext();
    
    return (
        // <AppButton title={title} onPress={handleSubmit}/>
        <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#66347F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 200,
        marginTop: 40,
        alignSelf: 'center',
        shadowColor: '#000', // Boja sjene
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25, // Prozirnost sjene (0-1)
        shadowRadius: 4, // Radijus sjene
        elevation: 5, // Obrada senke na Androidu
    },
    text: {
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold', 
        letterSpacing: 2
    }
})
export default SubmitBtn;