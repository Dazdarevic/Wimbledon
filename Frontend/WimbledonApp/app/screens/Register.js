import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Image, Text, Alert, ScrollView, RefreshControl } from 'react-native';
import * as Yup from "yup";
import { RadioButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitBtn from '../components/forms/SubmitBtn';
import { Formik, useFormikContext } from 'formik';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Base64 } from 'js-base64';
import _ from 'lodash';


const validationSchema = Yup.object().shape({
  //   password: Yup.string().required().min(4).label("Password"),
  //   repeatedPassword: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //     .required('Please confirm your password')
  //     .label('Repeat Password'),
});

const Register = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [checked, setChecked] = useState('admin');


  const validateFields = () => {
    if (password.trim() === '' || email.trim()==='' || repeatedPassword.trim()===''
    || name.trim()==='') {
        Alert.alert('Error', 'All fields are required.');
      return false;
    }

    if (repeatedPassword !== password) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const simpleAlert = () => {
    Alert.alert(
      'Successful Registration',
      'You have successfully registered.',
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setPassword('');
            setRepeatedPassword('');
          },
        },
      ]
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setName("");
    setEmail("");
    setPassword("");
    setRepeatedPassword("");
    setTimeout(() => {
      setRefreshing(false);
    }, 20);
  }, []);


  const checkEmailExists = async (email) => {
    const url = "http://192.168.1.3:83/api/User/CheckEmailExists";
    const data = {
      userEmail: email,
    };
    try {
      const response = await axios.post(url, data);
      return response.data.exists;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSave = async (values, { resetForm }) => {

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      Alert.alert('Error', 'Email already exists.');
    }
    else {
    if(validateFields()) {
    const role = checked;

    const insertXBetweenLetters = (word) => {
      const modifiedWord = _.join(word.split(''), 'x');
      const modifiedWord2 = _.join(modifiedWord.split(''), 'z');
      return modifiedWord2;
    };
    
    // Primjer korištenja
    const originalWord = password;
    const modifiedWord = insertXBetweenLetters(originalWord);
    console.log(modifiedWord);
    
    const url = "http://192.168.1.3:83/api/User";
    const data = {
      userName: name,
      userEmail: email,
      userPassword: modifiedWord,
      userRole: role
    };
    axios
      .post(url, data)
      .then(function (response) {
        // handle success
        simpleAlert();
        navigation.navigate('Login');
      })
      .catch(function (error) {
        // handle error
        alert(error.message);

      });

    console.log(data);
  }

  }
  };

  return (
    <View>
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Icon
          name="account-arrow-right-outline"
          color='#66347F'
          size={100}
          style={{
            margin: 30
          }} />
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              name: "",
              email: "",
              password: "",
              repeatedPassword: "",
            }}
            onSubmit={handleSave}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
              // textContentType="text"
              value={name}
              onChangeText={text => setName(text)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="repeatedPassword"
              placeholder="Repeat Password"
              secureTextEntry
              textContentType="password"
              value={repeatedPassword}
              onChangeText={text => setRepeatedPassword(text)}
            />
            <View style={styles.radioContainer}>
              <View style={styles.radioOption}>
                <RadioButton
                  value="admin"
                  status={checked === 'admin' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('admin')}
                />
                <Text onPress={() => setChecked('admin')}>Admin</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton
                  value="editor"
                  status={checked === 'editor' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('editor')}
                />
                <Text onPress={() => setChecked('editor')}>Editor</Text>
              </View>
            </View>
            <SubmitBtn title="Sign up" />
          </AppForm>
          {/* <TouchableOpacity style={styles.googleButton}>
            <MaterialCommunityIcons name="google" size={25} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Sign Up with Google</Text>
          </TouchableOpacity> */}
          <View style={styles.loginContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginButton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    // flex: 1,
    backgroundColor: "white",
    // width: '100%',
    flexDirection: 'column',
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#FBE5E5',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    width: 340,
    marginTop: 20,
    alignSelf: 'center',
  },
  googleIcon: {
    flex: 1,
    color: '#9B0000',
  },
  googleButtonText: {
    flex: 3.3,
    color: '#9B0000',
    fontSize: 17,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 7,
  },
  loginButton: {
    fontSize: 14,
    color: "#66347F",
    fontWeight: 'bold',
  },
});

export default Register;
