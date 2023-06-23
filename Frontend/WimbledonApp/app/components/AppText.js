import React from 'react';
import { StyleSheet, Text } from 'react-native';

function AppText({children, ...otherProps}) {
    return (
        <Text style={styles.text} {...otherProps}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    }
})
export default AppText;