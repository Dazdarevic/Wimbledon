import React , { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    TouchableOpacity,
    Modal, 
    TextInput, 
    Text,
    ScrollView,
    Button,
    Image,
    FormData
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AppText from '../components/AppText';
import axios from 'axios';
import { Alert } from 'react-native';
import Subtitle from '../components/Subtitle';
import { useLogin } from '../context/LoginProvider';
import Title from '../components/Title';
import * as ImagePicker from 'expo-image-picker';
import jwtDecode from 'jwt-decode';

const NewsEdit = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [list,setList] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [hideId,setHideId] = useState(null);
    const {editorId} = useLogin();
    const {username} = useLogin();
    const [selectedImage, setSelectedImage] = useState(null);
    const {accessToken} = useLogin();


    useEffect(()=>{
        getList()
    },[])
    const getList= () => {
        axios({
            url:"http://192.168.1.3:83/api/News",
            method : "GET"
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
        .catch((error) => {
            console.log('Error fetching data from API:', error); // Add this console.log statement
          });
    }

    
  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });


      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
        console.log(selectedImage.uri +" " + selectedImage.type + " " + selectedImage.assetId);

      }

      console.log("Image: ",  result.assets);
    };
    // const {uri} = selectedImage.uri;
    const uploadImage = async () => {
        console.log("OVDE PRIKAZUJE: " + selectedImage.uri +" " + selectedImage.type +
         " " + selectedImage.assetId);

        try {
        const formData = new FormData();

          formData.append('file', {
            uri: selectedImage.uri,
            type: selectedImage.type,
            name: selectedImage.assetId
          });

          const response = await axios.post(
            'http://192.168.1.3:83/api/News/add-photo',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
    
          if (response.status === 200) {
            const photoData = response.data;
            console.log('Slika uspješno poslata:', photoData);
          } else {
            console.log('Greška prilikom slanja slike.');
          }
        } catch (error) {
            console.log('Greskaaa:', error);
            
        }
    };

    const handleVisibleModal = () => {
        setVisible(!visible);
        setHideId(null);
        setTitle(""); 
        setText(""); 
    }
    const decodedToken = jwtDecode(accessToken);
    //brisanje artikla
    const handleDelete = (item) => {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete the article?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        axios({
                            url: `http://192.168.1.3:83/api/News/${item.newsID}`,
                            method: "DELETE",
                            headers : {
                                "Content-Type" : "application/json",
                                "Authorization": `Bearer ${accessToken}`
                            }
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
    //editovanje artikla
    const handleEdit = (item) => {
        setVisible(true);
        setTitle(item.title);
        setText(item.text);
        setHideId(item.newsID);
    };
    const onChangeTitle = (value) => {
        setTitle(value);
    };
    const onChangeText = (value) => {
        setText(value);
    };
    const simpleAlert = () => {
        Alert.alert(
          'Success',
          'Article has been successfully created.',
          [
            {
              text: 'OK',
              onPress: () => {
              },
            },
          ]
        );
      };
    const id = parseInt(decodedToken.UserId, 10);
    // dodavanje ili editovanje artikla
    const handleSave = () => {
        if(hideId == null) {
            var data = {
                "title": title,
                "subtitle": decodedToken.UserName,
                "text": text,
                "authorID": id
                //dodati jos ID od autora i ime autora u subtitle - dodatoo :D
              }
            axios({
                url:"http://192.168.1.3:83/api/News",
                method : "POST",
                data : data,
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then((res)=>{
                getList();
                setTitle("");
                setText("");
                simpleAlert();
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        } 
        else {
            var data = {
                "newsID" : hideId,
                "title": title,
                "subtitle": decodedToken.UserName, //username ulogovanog editora
                "text": text,
                "authorID": id //id ulogovanog editora
              }
            axios({
                url: `http://192.168.1.3:83/api/News/${hideId}`,
                method : "PUT",
                data : data,
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then((res)=>{
                getList();
                setTitle("");
                setText("");
                simpleAlert();
            })
        }

    };

      
    return (
        <View style={styles.container}>
                
                <Modal
                    animationType="slide"
                    visible={visible}>
                        <SafeAreaView>
                            <ScrollView>
                            <View style={styles.form}>
                            <TouchableOpacity
                                onPress={handleVisibleModal}>
                                <AppText style={styles.txtClose}>Close</AppText>
                            </TouchableOpacity>
                            <TextInput
                                value={title}
                                style={styles.text_input}
                                placeholder="Title"
                                onChangeText={onChangeTitle}
                            />
                            <TextInput
                                value={text}
                                style={styles.text_input_email}
                                placeholder="Text"
                                autoCapitalize="none" // Da dopusti mala i velika slova
                                keyboardType="default" // Da dopusti unos svih karaktera, uključujući brojeve
                                multiline={true}
                                onChangeText={onChangeText}
                            />
                             <View style={{ flex: 1}}>
                                <TouchableOpacity onPress={pickImage}>
                                    <AppText style={styles.photoBtn}>Choose photo</AppText>
                                </TouchableOpacity>
                            </View>

                            {selectedImage && (
                                <Image
                                source={{ uri: selectedImage.uri }}
                                style={{ width: 150, height: 150, borderRadius:17, 
                                marginVertical: 4, alignSelf: 'center' }}
                                />
                            )}

                            <TouchableOpacity
                                onPress={uploadImage}
                                style={styles.btnContainer}
                            >
                                <AppText style={styles.textButton}>Submit</AppText>
                            </TouchableOpacity>
                            </View>
                            </ScrollView>
                        </SafeAreaView>
                </Modal>

                {/* <ScrollView style={styles.scroll}> */}
                {list.map((item,id)=>{
                    return(
                        <View style={styles.item_users} key={id}>
                            <View style={styles.newsDetails}>
                                <Title style={styles.txt_name}>{item.title}</Title>
                                <Subtitle>{item.text}</Subtitle>
                            </View>
                            <View style={styles.buttons}>
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
            {/* </ScrollView> */}
            <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleVisibleModal()}
                >
                    <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
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
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        backgroundColor: '#66347F',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
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
        color: 'black',
        textTransform: "capitalize",
        fontWeight: "300"
    },
    txt_del:{
        fontSize : 14,
        marginTop : 15,
        color:"red",
        fontWeight : "700",
        color: "#66347F",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    txt_edit:{
        fontSize : 14,
        marginTop : 15,
        color:"blue",
        fontWeight : "700",
        color: "#66347F",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    newsDetails: {
        width: "70%"
    },
    photoBtn: {
        backgroundColor: "#F6F1E9",
        height: 50,
        borderRadius: 10,
        marginVertical: 30,
        borderWidth: 1,
        borderColor: "gray",
        fontSize: 15,
        paddingTop: 10,
        paddingLeft: 10,
        color: "gray"
    }
});

export default NewsEdit;