import React, { useState } from 'react';
import AppText from '../components/AppText';
import { StyleSheet, View, TouchableOpacity, Modal, SafeAreaView, TextInput, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

const Admin = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const {setAccessToken} = useLogin();

    const onChangeName = (value) => {
        setName(value);
    };
    const onChangeEmail = (value) => {
        setEmail(value);
    };
    const onChangePassword = (value) => {
        setPassword(value);
    }
    const onChangePasswordNew = (value) => {
        setPasswordNew(value);
    }

    const validateFields = () => {
        if (passwordNew.trim() === '' || password.trim()==='') {
            Alert.alert('Error', 'Password cannot be empty');
          return false;
        }
        return true;
    };

    const handleVisibleModal = () => {
        setVisible(!visible);
        // setHideId(null);
    }
    const {accessToken} = useLogin();    

    const decodedToken = jwtDecode(accessToken);
    // console.log(decodedToken.UserName); //userName iz accessToken-a
    // console.log(decodedToken);
    const handleSave = async () => {
        if(validateFields()) {
        const insertXBetweenLetters = (word) => {
            const modifiedWord = _.join(word.split(''), 'x');
            const modifiedWord2 = _.join(modifiedWord.split(''), 'z');
            return modifiedWord2;
          };
          
          const originalWord = password;
          const modifiedWord = insertXBetweenLetters(originalWord);
        //   console.log(modifiedWord); //stara lozinka


      if (modifiedWord !== decodedToken.UserPassword) {
        Alert.alert("Invalid Old Password", "The entered old password is incorrect.");
        return;
      }
      if (password === passwordNew) {
        Alert.alert("Invalid New Password", "New password must be different from the old password.")
        return;
      }
    
      
      const newPass = insertXBetweenLetters(passwordNew);
    //   console.log(newPass);
      
      try {
        const response = await axios.put(
            `http://192.168.1.8:83/api/User/changepassword?userEmail=${decodedToken.UserEmail}`,
            {
                OldPassword: modifiedWord,
                NewPassword: newPass,
            }
        );
           
    
        if (response.status === 200) {
          Alert.alert("Password Change Successful", "Your password has been successfully changed.");
            setPassword("");
            setPasswordNew("");
            setAccessToken(response.data.accessToken);
        } else {
          Alert.alert("Password Change Failed", "Failed to change password. Please try again later.");
        }
      } catch (error) {
        console.log("Error occurred while sending the HTTP request:", error);
        Alert.alert("Password Change Failed", "An error occurred while changing the password. Please try again later.");
      }
    }
    };
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.myprofile}>
                    <AppText style={styles.profileText}>My profile</AppText>
                </View>
                <View style={styles.userinfo}>
                    <AppText style={styles.userDetails}>Role: </AppText>
                    <AppText style={{textAlign: "center", textTransform: "capitalize"}}>{decodedToken.UserRole}</AppText>
                    <AppText style={styles.userDetails}>Username: </AppText>
                    <AppText style={{textAlign: "center", textTransform: "capitalize"}}>{decodedToken.UserName}</AppText>
                    <AppText style={styles.userDetails}>Email: </AppText>
                    <AppText style={{textAlign: "center"}}>{decodedToken.UserEmail}</AppText>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleVisibleModal}
                        style={styles.btnNewContainer}>
                        <AppText style={styles.textButton}>Change Password</AppText>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    visible={visible}>
                        <SafeAreaView>
                            <View style={styles.form}>
                            <TouchableOpacity
                                onPress={handleVisibleModal}>
                                <AppText style={styles.txtClose}>Close</AppText>
                            </TouchableOpacity>
                            <TextInput
                                value={password}
                                style={styles.text_input_email}
                                placeholder="Old Password"
                                onChangeText={onChangePassword}
                            />
                            <TextInput
                                value={passwordNew}
                                style={styles.text_input_email}
                                placeholder="New Password"
                                onChangeText={onChangePasswordNew}
                            />
                            <TouchableOpacity
                                onPress={handleSave}
                                style={styles.btnContainer}
                            >
                                <AppText style={styles.textButtonSubmit}>Submit</AppText>
                            </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                </Modal>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#F6F1E9",
    },
    myprofile: {
        justifyContent: "center",
        height: 150,
        alignItems: "center",
    },
    profileText: {
        fontSize: 30,
        letterSpacing: 1,
        fontWeight: "600",
        color: "#66347F",
    },
    info: {
        backgroundColor: "white",
        height: "70%",
        width: "80%",
        marginTop: 110,
        borderRadius: 20,
        alignSelf: "center",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    userinfo: {
        alignSelf: "center",
    },
    userDetails: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: "500", 
        color: "#66347F",
        textAlign: "center"
    },
    btnNewContainer: {
        backgroundColor: '#66347F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 270,
        marginTop: 70,
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
    textButton: {
        color: 'white',
        fontSize: 18,
        // textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 2
    },
    txtClose:{
        fontSize:18,
        fontWeight : "bold",
        marginVertical : 10,
        textAlign : "right"
    },
    text_input:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :30
    },
    text_input_email:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :30,
        textTransform: "lowercase",
    },
    form:{
        padding : 15,
        // backgroundColor : "#e3e3e3",
        marginTop:10
    },
    btnContainer : {
        display : 'flex',
        padding :15,
        backgroundColor : "#66347F",
        marginTop : 20,
        borderRadius: 15
    },
    textButtonSubmit: {
        textAlign : "center",
        color : "#FFF",
        fontSize: 20,
    }
})
export default Admin;