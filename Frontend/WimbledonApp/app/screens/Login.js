import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import * as Yup from "yup";
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitBtn from '../components/forms/SubmitBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import Admin from './Admin';
import { Base64 } from 'js-base64';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLogin } from '../context/LoginProvider';
import _ from 'lodash';

const validationSchema = Yup.object().shape({
  // email: Yup.string().required().email().label("Email"),
  // password: Yup.string().required().min(4).label("Password"),
});

const Login = ({ navigation }) => {
  const {setIsLoggedIn} = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setIsAdmin} = useLogin();
  const {setAccessToken} = useLogin();
  const {accessToken} = useLogin();

  const handleSubmit = async ({email, password}) => {
    //ako je ulogovani korisnik admin postavljam na true,  
    //a za editora postavljam na false

    
    const insertXBetweenLetters = (word) => {
      const modifiedWord = _.join(word.split(''), 'x');
      const modifiedWord2 = _.join(modifiedWord.split(''), 'z');
      return modifiedWord2;
    };
    
    const originalWord = password;
    const modifiedWord = insertXBetweenLetters(originalWord);
    
    try {
      const response = await axios.post("http://192.168.1.3:83/PostLoginDetails", {
        UserEmail: email,
        UserPassword: modifiedWord
      });

      const userAccessToken = response.data.accessToken;

      setAccessToken(userAccessToken);
      // console.log("access token " + userAccessToken);


      const role = response.data.userRole;
      if(role=="admin") {
        setIsAdmin(true); 
      }
      else {
        setIsAdmin(false);
      }
      setIsLoggedIn(true);  
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
    }
  };
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setRefreshing(false);
    }, 20);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Icon
          name="account-outline"
          color='#66347F'
          size={100}
          style={{
            margin: 30
          }}
        />
        <View style={{
          width: '100%',
          flex: 1,
          flexDirection: 'column'
        }}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit} 
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              // value={email}
              // onChangeText={(text) => setEmail(text)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              // value={password}
              // onChangeText={(text) => setPassword(text)}
            />
            <SubmitBtn title="Login" />
          </AppForm>
          <View>
            {/* <TouchableOpacity style={styles.button2}>
              <MaterialCommunityIcons name="google" size={25} style={{ flex: 1, color: '#9B0000' }} />
              <Text style={{ flex: 3.3, color: '#9B0000', fontSize: 17 }}>Log In with Google</Text>
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7 }}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity style={styles.button3}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.button3}>Sign Up</Text>
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  text: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  },
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
  button2: {
    backgroundColor: '#FBE5E5',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    width: 340,
    marginTop: 40,
    alignSelf: 'center'
  },
  button3: {
    fontSize: 14,
    color: "#66347F",
    fontWeight: 'bold'
  },
})

export default Login;
