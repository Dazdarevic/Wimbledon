import React , { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    TouchableOpacity,
    Modal, 
    TextInput, 
    Text,
    ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AppText from '../components/AppText';
import axios from 'axios';
import { Alert } from 'react-native';
import _ from 'lodash';



const Users = ({navigation}) => {
    const [checked, setChecked] = useState('editor');
    const [visible, setVisible] = useState(false);
    const [list,setList] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hideId,setHideId] = useState(null);



    useEffect(()=>{
        getList()
    },[])
    const getList= () => {
        axios({
            url:"http://192.168.1.3:83/api/User",
            method : "GET",
            params: {
                role: "editor"
            }
        }).then((res)=>{
            const reversedData = res.data.reverse();
            setList(reversedData);
            // console.log(res.data); //ovaj deo koda se izvrsava
        })
        .then(res=>{
            // console.log("radi");
        }).then(res=>{
            // console.log("radi");
        })
    }

    
    const handleVisibleModal = () => {
        setVisible(!visible);
        setName("");
        setEmail("");
        setHideId(null);
    }

    //brisanje user-a
    const handleDelete = (item) => {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete the user?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        axios({
                            url: `http://192.168.1.3:83/api/User/${item.id}`,
                            method: "DELETE",
                        })
                        .then((res) => {
                            getList();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    },
                    style: 'destructive',
                },
            ]
        );
    };
    
      
    //editovanje user-a
    const handleEdit = (item) => {
        setVisible(true);
        setName(item.userName);
        setEmail(item.userEmail);
        setPassword(item.userPassword);
        setHideId(item.id);
    };

    const onChangeName = (value) => {
        setName(value);
    };
    const onChangeEmail = (value) => {
        setEmail(value);
    };
    const onChangePassword = (value) => {
        setPassword(value);
    }



    const simpleAlert = () => {
        Alert.alert(
          'Success',
          'User has been successfully created.',
          [
            {
              text: 'OK',
              onPress: () => {
              },
            },
          ]
        );
      };


    //dodavanje ili editovanje user-a
    const handleSave = () => {
        const insertXBetweenLetters = (word) => {
            const modifiedWord = _.join(word.split(''), 'x');
            const modifiedWord2 = _.join(modifiedWord.split(''), 'z');
            return modifiedWord2;
          };
          
          const originalWord = password;
          const modifiedWord = insertXBetweenLetters(originalWord);
          
        if(hideId == null) {
            var data = {
                "userName": name,
                "userEmail": email,
                "userPassword": modifiedWord,
                "userRole":  checked
              }
            axios({
                url:"http://192.168.1.3:83/api/User",
                method : "POST",
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then((res)=>{
                getList();
                setName("");
                setEmail("");
                setPassword("");
                setVisible(false);
                simpleAlert();
            })
        } 
        else {
            var data = {
                "id" : hideId,
                "userName": name,
                "userEmail": email,
                "userPassword": modifiedWord,
                "userRole":  checked
              }
            axios({
                url: `http://192.168.1.3:83/api/User/${hideId}`,
                method : "PUT",
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then((res)=>{
                getList();
                setName("");
                setEmail("");
                setPassword("");
                setVisible(false);
                simpleAlert();
            })
        }

    };
    return (
        <View style={styles.container}>
                <View style={styles.header_container}>
                    <AppText style={styles.txt_main}>Users {list.length}</AppText>
                    <TouchableOpacity
                        onPress={handleVisibleModal}
                        style={styles.btnNewContainer}>
                        <AppText style={styles.textButton}>New User</AppText>
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
                                value={name}
                                style={styles.text_input}
                                placeholder="User Name"
                                onChangeText={onChangeName}
                            />
                            <TextInput
                                value={email}
                                style={styles.text_input_email}
                                placeholder="User Email"
                                onChangeText={onChangeEmail}
                            />
                            <TextInput
                                value={visible ? null : password}
                                style={styles.text_input_email}
                                placeholder="User Password"
                                onChangeText={onChangePassword}
                            />

                            {/* Radio buttons */}
                            <View style={styles.radioContainer}>
                                {/* <View style={styles.radioOption}>
                                    <RadioButton
                                    value="admin"
                                    status={checked === 'admin' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('admin')}
                                    />
                                    <AppText onPress={() => setChecked('admin')}>Admin</AppText>
                                </View> */}
                                <View style={styles.radioOption}>
                                    <RadioButton
                                    value="editor"
                                    status={checked === 'editor' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('editor')}
                                    />
                                    <AppText onPress={() => setChecked('editor')}>Editor</AppText>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleSave}
                                style={styles.btnContainer}
                            >
                                <AppText style={styles.textButton}>Submit</AppText>
                            </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                </Modal>

                <ScrollView style={styles.scroll}>
                {list.map((item,id)=>{
                    return(
                        <View style={styles.item_users} key={id}>
                            <View>
                                <Text style={styles.txt_name}>{item.userName}</Text>
                                <Text style={styles.txt_item}>{item.userEmail}</Text>
                                <Text style={styles.txt_item_role}>{item.userRole}</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={()=>handleDelete(item)}
                                >
                                    <Text style={styles.txt_del}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>handleEdit(item)}
                                >
                                    <Text style={styles.txt_edit}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F1E9',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      scroll: {
        backgroundColor : "white"
      },
      header_container : {
        padding : 15,
        backgroundColor : "#F6F1E9",
        flexDirection:"row",
        justifyContent : "space-between"
    },
    btnContainer : {
        display : 'flex',
        padding :15,
        backgroundColor : "#66347F",
        marginTop : 20,
        borderRadius: 15,
    },
    textButton : {
        textAlign : "center",
        color : "#FFF",
        fontSize: 20,
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
      txt_main : {
        fontSize : 22,
        fontWeight : "500",
        color: "#000"
      },
      btnNewContainer : {
        padding :10,
        backgroundColor : "#000",
     },
     textButton : {
        textAlign : "center",
        color : "#FFF"
    },
    radioContainer: {
        flexDirection: 'row',
        marginTop: 20,
      },
      radioOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      item_users: {
        padding :15,
        borderBottomWidth: 1,
        borderBottomColor : "#e2e2e2",
        flexDirection : "row",
        justifyContent:"space-between"
      },
      txt_name : {
        fontSize : 18,
        marginTop : 5,
        fontWeight : "800",
        color: "#000",
        textTransform: "capitalize",
    },
    txt_item : {
        fontSize : 14,
        marginTop : 5,
    },
    txt_item_role : {
        fontSize : 14,
        marginTop : 5,
        color: 'green',
        textTransform: "capitalize",
        fontWeight: "500"
    },
    txt_del:{
        fontSize : 14,
        marginTop : 15,
        color:"red",
        fontWeight : "700"
    },
    txt_edit:{
        fontSize : 14,
        marginTop : 15,
        color:"blue",
        fontWeight : "700"
    },
})
export default Users;