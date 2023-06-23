import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../AppText';

//koriscenjem UseFormikContext dobijamo pristup formik poljima

import { useFormikContext } from 'formik';
import AppTextInput from '../AppTextInput';
import  ErrorMessage  from './ErrorMessage';


function AppFormField({name, ...otherProps}) {
    const { setFieldTouched, handleChange, touched, errors } = useFormikContext();
    
    return (
        <View style={{
            height: 90,
        }}>
           <AppTextInput 
                        onChangeText={handleChange(name)}
                        onBlur={() => setFieldTouched(name)}
                        {...otherProps}
            style={{height: '80%'}}
            />
            <ErrorMessage style={{height: '20%'}} error={errors[name]} visible={touched[name]}/> 
        </View>
    );
}

const styles = StyleSheet.create({
    
})
export default AppFormField;