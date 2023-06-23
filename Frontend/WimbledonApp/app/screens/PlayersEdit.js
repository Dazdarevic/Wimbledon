import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Button, Image, Platform,
Modal, SafeAreaView, TextInput, Text, Alert  } from 'react-native';
import AppText from '../components/AppText';
import PlayersName from '../components/PlayersName';
import PlayerName from '../components/PlayerName';
import PlayerInfo from '../components/PlayerInfo';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import PlayerInfoText from '../components/PlayerInfoText';
import PlayerInfoTrophy from '../components/PlayerInfoTrophy';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';
import jwtDecode from 'jwt-decode';

const PlayersEdit = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [visible, setVisible] = useState(false);
    const [hideId, setHideId] = useState(null);
    const [visible2, setVisible2] = useState(false);
    const [list,setList] = useState([]);
    const {accessToken} = useLogin();
    const decodedToken = jwtDecode(accessToken);
    const englishAlphabetRegex = /^[a-zA-Z]+$/;


    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [country, setCountry] = useState("");
    const [age, setAge] = useState("");
    const [birhtPlace, setBirthPlace] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [plays, setPlays] = useState("");
    const [championships, setChampionships] = useState("");
    const [bestSingle, setBestSingle] = useState("");
    const [bestDouble, setBestDouble] = useState("");
    const [grandSlam, setGrandSlam] = useState("");
    const [turnedPro, setTurnedPro] = useState("");
    const [win, setWin] = useState("");
    const [loss, setLoss] = useState("");
    const [highRankSingle, setHighRankSingle] = useState("");
    const [hightRankDouble, setHightRankDouble] = useState("");
    const [rank, setRank] = useState("");

    useEffect(() => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
        alphabet.split('').forEach((letter) => {
          getList(letter);
        });
      }, []);
      
      const getList = (letter) => {
        axios({
          url: `http://192.168.1.3:83/api/Player/ByLastName/${letter}`,
          method: 'GET',
        })
          .then((res) => {
            const sortedData = res.data.sort((a, b) => a.lastName.localeCompare(b.lastName)); // Sortiranje po prezimenu
            setList((prevList) => ({
                ...prevList,
                [letter]: sortedData,
              }));
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
    // data picker
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
    const handleDateChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
            console.log(formatDate(date));
            setSelectedDate(formattedDate);

    };
      
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 20);
    }, []);
    // console.log("pristupni token: " + accessToken);

    const handleVisibleModal = () => {
        setVisible(!visible);
        setHideId(null);
        
    }

    const [modalData, setModalData] = useState(null);

    const handleVisibleModalPlayer = (player) => {
        setModalData(player);

        setVisible2(!visible2);
        setHideId(null);
    }

    const onChangeFirstname = (value) => { 
        if (englishAlphabetRegex.test(value) || value === '') {
        setFirstname(value) 
        }
    }
    const onChangeLastname = (value) => { 
        if (englishAlphabetRegex.test(value) || value === '') {
            setLastname(value) 
        }
    }

    const onChangeCountry = (value) => { setCountry(value) }
    const onChangeAge = (value) => { setAge(value) }
    const onChangeBirthPlace = (value) => { setBirthPlace(value) }
    const onChangeHeight = (value) => { setHeight(value) }
    const onChangeChampionships = (value) => { setChampionships(value) }
    const onChangeWeight = (value) => { setWeight(value) }
    const onChangePlays = (value) => { setPlays(value) }
    const onChangeBestSingle = (value) => { setBestSingle(value) }
    const onChangeBestDouble = (value) => { setBestDouble(value) }
    const onChangeGrandSlam = (value) => { setGrandSlam(value) }
    const onChangeTurnedPro = (value) => { setTurnedPro(value) }
    const onChangeWin = (value) => { setWin(value) }
    const onChangeLoss = (value) => { setLoss(value) }
    const onChangeHighRankSingle = (value) => { setHighRankSingle(value) }
    const onChangeHighRankDouble = (value) => { setHightRankDouble(value) }
    const onChangeRank = (value) => { setRank(value) }

    const simpleAlert = () => {
        Alert.alert(
          'Success',
          'Player has been successfully created.',
          [
            {
              text: 'OK',
              onPress: () => {
              },
            },
          ]
        );
      };
    // handleSave Player

    const id = parseInt(decodedToken.UserId, 10);

    //dodavanje ili editovanje tenisera
    const handleSave = () => {
        if(hideId == null) {
            var data = {
                    "userId": id,
                    "firstName": firstname,
                    "lastName": lastname,
                    "country": country,
                    "age": age,
                    "birthDate": formatDate(date),
                    "birthPlace": birhtPlace,
                    "height": height,
                    "weight": weight,
                    "plays": plays,
                    "singleRank": rank,
                    "grandSlam": grandSlam,
                    "championshipsPlayed": championships,
                    "bestSingle": bestSingle,
                    "bestDouble": bestDouble,
                    "yearsTurnedProp": turnedPro,
                    "win": win,
                    "loss": loss,
                    "highRankforSingle": highRankSingle,
                    "highRankForDouble": hightRankDouble 
              }
            axios({
                url:"http://192.168.1.3:83/api/Player",
                method : "POST",
                data : data,
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then((res)=>{
                // getList();
                setFirstname("");
                setLastname("");
                setCountry("");
                setAge("");
                setBirthPlace("");
                setHeight("");
                setWeight("");
                setPlays("");
                setHighRankSingle("");
                setHightRankDouble("");
                setRank("");
                setGrandSlam("");
                setBestSingle("");
                setBestDouble("");
                setChampionships("");
                setTurnedPro("");
                setWin("");
                setLoss("");
                simpleAlert();
                setDate(new Date());

                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                              
                alphabet.split('').forEach((letter) => {
                    getList(letter);
                });
            })
        } 
        else {
            var data = {
                "id" : hideId,
                "userId": id,
                "firstName": firstname,
                "lastName": lastname,
                "country": country,
                "age": age,
                "birthDate": formatDate(date),
                "birthPlace": birhtPlace,
                "height": height,
                "weight": weight,
                "plays": plays,
                "singleRank": rank,
                "grandSlam": grandSlam,
                "championshipsPlayed": championships,
                "bestSingle": bestSingle,
                "bestDouble": bestDouble,
                "yearsTurnedProp": turnedPro,
                "win": win,
                "loss": loss,
                "highRankforSingle": highRankSingle,
                "highRankForDouble": hightRankDouble 
              }
            axios({
                url: `http://192.168.1.3:83/api/Player/${hideId}`,
                method : "PUT",
                data : data,
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then((res)=>{
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                alphabet.split('').forEach((letter) => {
                    getList(letter);
                });
                simpleAlert();
            })
        }

    };


      
      //brisanje artikla
    const handleDelete = (item) => {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete the player?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // console.log("radi");
                        axios
                        .delete(`http://192.168.1.8:83/api/Player/${item.id}`,
                        {
                            headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${accessToken}`
                            }
                        })
                        
                        .then((res) => {
                            console.log("radi");
                            
                                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                              
                                alphabet.split('').forEach((letter) => {
                                  getList(letter);
                                });
                        })

                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleEdit = (item) => {
        setVisible(true);

        setFirstname(item.firstName);
        setLastname(item.lastName);
        setCountry(item.country);
        setAge(item.age);
        setBirthPlace(item.birhtPlace);
        setHeight(item.height);
        setWeight(item.weight);
        setPlays(item.plays);
        setHighRankSingle(item.highRankSingle);
        setHightRankDouble(item.highRankForDouble);
        setRank(item.rank);
        setGrandSlam(item.grandSlam);
        setBestSingle(item.bestSingle);
        setBestDouble(item.bestDouble);
        setChampionships(item.championships);
        setTurnedPro(item.turnedPro);
        setWin(item.win);
        setLoss(item.loss);


        setHideId(item.id);
    };
    return (
        <View>
        <ScrollView 
            contentContainerStyle={styles.container}
            refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
            <AppText style={styles.title}>Gentlemen's</AppText>

            {Object.keys(list)
            .sort() // Sortiranje slova abecede
            .map((letter) => {
                const sortedPlayers = list[letter].sort((a, b) => a.lastName.localeCompare(b.lastName));

                return (
                <View key={letter} style={{ width: '100%' }}>
                    <PlayersName letter={letter} />
                    {sortedPlayers.map((player) => (
                    <PlayerName
                        key={player.id}
                        name={`${player.lastName} ${player.firstName}`}
                        onPress={() => handleVisibleModalPlayer(player)}
                        onDelete={() => handleDelete(player)} 
                        onEdit={() => handleEdit(player)}
                    />
                    ))}
                </View>
                );
            })}

            
            <Modal 
                animationType="slide"
                visible={visible2}>
                    { modalData && ( 
                    <View style={styles.containerr}>
                    <TouchableOpacity
                                onPress={handleVisibleModalPlayer}>
                                <AppText style={styles.txtClose}>Close</AppText>
                    </TouchableOpacity>
                        <ScrollView>
                {/* Slika i rang */}
                <View style={styles.playerHeader}>
                    <Image resizeMode="contain" source={require('../screens/novakd.jpg')} 
                    style={styles.image} />
                    <View style={styles.rangContainer}>
                    <Text style={styles.rangPlace}>{rank}</Text>
                    <View style={styles.rangContainerText}>
                        <Text style={styles.rang}>singles</Text>
                        <Text style={styles.rang}>rang</Text>
                    </View>
                    </View>
                </View>
                {/* Ostale informacije o igracu */}
                <View style={styles.playerContent}>
                        <Image resizeMode="contain" source={require('../screens/srb.jpg')} style={styles.zastava} />
                        <Text style={styles.name}>{modalData.firstName} {modalData.lastName}</Text>
                </View>

                <View style={styles.playerInfo}>
                    <PlayerInfoText text="Country" value={modalData.country} fontWeight='600'/>
                    <PlayerInfoText text="Age" value={modalData.age} fontWeight='600'/>
                    <PlayerInfoText text="Birth Date" value={modalData.birthDate} fontWeight='600'/>
                    <PlayerInfoText text="Birth Place" value={modalData.birhtPlace} fontWeight='600'/>
                    <PlayerInfoText text="Height" value={modalData.height} fontWeight='600'/>
                    <PlayerInfoText text="Weight" value={modalData.weight} fontWeight='600'/>
                    <PlayerInfoText text="Plays" value={modalData.plays} fontWeight='600'/>
                </View>

                <View style={styles.playerInfo2}>
                    <View style={styles.playerInfo2Text}>
                        <PlayerInfoTrophy text="Championships Played" value={modalData.championships}/>
                        <PlayerInfoTrophy text="Best Single" value={modalData.bestSingle}/>
                        <PlayerInfoTrophy text="Best Double" value={modalData.bestDouble}/>
                    </View>
                    <Image source={require('../screens/trofej.png')} style={styles.trofej} />
                </View>

                <View style={styles.playerInfo2}>
                    <View style={styles.playerInfo2Text}>
                        <PlayerInfoTrophy text="Years Turned Pro" value={modalData.turnedPro}/>
                        <PlayerInfoTrophy text="Career Matches Won" value={modalData.win}/>
                        <PlayerInfoTrophy text="Career Matches Lost" value={modalData.loss}/>
                        <PlayerInfoTrophy text="High Rank for Singles" value={modalData.highRankSingle}/>
                        <PlayerInfoTrophy text="High Rank for Doubles" value={modalData.hightRankDouble}/>
                    </View>
                    <Image source={require('../screens/reket.png')} style={styles.reket} />
                    
                </View>
                </ScrollView>
                </View>
                    )}
            </Modal>

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
                                value={firstname}
                                style={styles.text_input}
                                placeholder="First Name"
                                onChangeText={onChangeFirstname}
                            />
                            <TextInput
                                value={lastname}
                                style={styles.text_input}
                                placeholder="Last Name"
                                onChangeText={onChangeLastname}
                            />
                            <TextInput
                                value={country}
                                style={styles.text_input}
                                placeholder="Country"
                                onChangeText={onChangeCountry}
                            />
                            {/* <TouchableOpacity onPress={selectImage}> */}
                                {/* <AppText>Select Image</AppText> */}
                            {/* </TouchableOpacity> */}
                            {/* {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />} */}

                            <TextInput
                                value={age}
                                style={styles.text_input}
                                placeholder="Age"
                                keyboardType="numeric"
                                onChangeText={onChangeAge}
                            />
                           
                            <View style={styles.datatime}>
                                 <AppText onPress={toggleDatePicker} style={{fontSize: 15, color: "gray"}}>
                                 Birth Date: {selectedDate || formatDate(date)}                                    
                                </AppText>
                            </View>

                            {showDatePicker && (
                                <DateTimePicker 
                                    mode='date'
                                    minimumDate={new Date(1980, 0, 1)} 
                                    maximumDate={new Date(2005, 11, 31)}
                                    display="spinner"
                                    value={date} 
                                    onChange={handleDateChange}
                                />
                            )}

                            <TextInput
                                value={birhtPlace}
                                style={styles.text_input}
                                placeholder="Birth Place"
                                onChangeText={onChangeBirthPlace}
                            />
                            <TextInput
                                value={height}
                                style={styles.text_input}
                                placeholder="Height"
                                onChangeText={onChangeHeight}
                            />
                            <TextInput
                                value={weight}
                                style={styles.text_input}
                                placeholder="Weight"
                                onChangeText={onChangeWeight}
                            />
                            <TextInput
                                value={plays}
                                style={styles.text_input}
                                placeholder="Plays"
                                onChangeText={onChangePlays}
                            />
                            <TextInput
                                value={rank}
                                style={styles.text_input}
                                placeholder="Single Rank"
                                keyboardType="numeric"
                                onChangeText={onChangeRank}
                            />
                            <TextInput
                                value={grandSlam}
                                style={styles.text_input}
                                placeholder="Grand Slam Titles"
                                keyboardType="numeric"
                                onChangeText={onChangeGrandSlam}
                            />
                            <TextInput
                                value={championships}
                                style={styles.text_input}
                                placeholder="Championships Played"
                                keyboardType="numeric"
                                onChangeText={onChangeChampionships}
                            />
                            <TextInput
                                value={bestSingle}
                                style={styles.text_input}
                                placeholder="Best Singles"
                                keyboardType="numeric"
                                onChangeText={onChangeBestSingle}
                            />
                            <TextInput
                                value={bestDouble}
                                style={styles.text_input}
                                placeholder="Best Doubles"
                                keyboardType="numeric"
                                onChangeText={onChangeBestDouble}
                            />
                            <TextInput
                                value={turnedPro}
                                style={styles.text_input}
                                placeholder="Years Turned Pro"
                                keyboardType="numeric"
                                onChangeText={onChangeTurnedPro}
                            />
                            <TextInput
                                value={win}
                                style={styles.text_input}
                                placeholder="Career Matches Won"
                                onChangeText={onChangeWin}
                            />
                            <TextInput
                                value={loss}
                                style={styles.text_input}
                                placeholder="Career Matches Lost"
                                onChangeText={onChangeLoss}
                            />
                            <TextInput
                                value={highRankSingle}
                                style={styles.text_input}
                                placeholder="High Rank for Single"
                                onChangeText={onChangeHighRankSingle}
                            />
                            <TextInput
                                value={hightRankDouble}
                                style={styles.text_input}
                                placeholder="High Rank for Double"
                                onChangeText={onChangeHighRankDouble}
                            />

                            <TouchableOpacity
                                onPress={handleSave}
                                style={styles.btnContainer}
                            >
                                <AppText style={styles.textButton}>Submit</AppText>
                            </TouchableOpacity>
                            </View>
                            </ScrollView>
                        </SafeAreaView>
                </Modal>
        </ScrollView>
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
    containerr: {
        width: '100%',
        backgroundColor: 'white',
        margin: 20,
      },     
  playerHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    // backgroundColor: "red",
    paddingVertical: 20,
    marginLeft: 20,
  },
  trofej: {
    width: 63,
    height: 83,
    marginLeft: 20,
    alignSelf: 'center'
  },
  reket: {
    width: 70,
    height: 68,
    marginLeft: 20,
    alignSelf: 'center'
  },
  playerContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    // backgroundColor: "red",
    paddingTop: 20,
    // paddingHorizontal: 20
    padding: 30
  },
  playerInfo: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 20,
    paddingVertical: 10,
  },
  playerInfo2: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 20
  },
  playerInfo2Text: {
        width: "70%"
  },
  rangContainer: {
    marginLeft: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  rangContainerText: {
    flexDirection: 'column',
    paddingTop: 10,
    textAlign: 'center',
    alignSelf: 'center'
  },
  rangPlace: {
    fontSize: 50,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    color: "#66347F",
  },
  rang: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: '500',
    paddingLeft: 4,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  zastava: {
    width: 80,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1
  },
  name: {
    fontSize: 20,
    color: "#446A46",
    fontWeight: '400',
    letterSpacing: 1,
    marginLeft: 20
  },
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      containerr: {
        flex: 1,
        backgroundColor: '#F6F1E9',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
      title: {
        fontSize: 25,
        color: "#446A46",
        textTransform: 'uppercase',
        fontWeight: '500',
        alignSelf: 'center',
        marginVertical: 30
      },
      header_container : {
        padding : 15,
        backgroundColor : "#F6F1E9",
        flexDirection:"row",
        width: "100%",
        justifyContent : "space-between"
    },
    btnNewContainer : {
        padding :10,
        backgroundColor : "#66347F",
        borderRadius: 10,
     },
     textButton : {
        textAlign : "center",
        color : "#FFF",
        fontSize: 15,
    },
    txt_main : {
        fontSize : 22,
        fontWeight : "500",
        color: "#000"
    },
    form:{
        padding : 15,
        // backgroundColor : "#e3e3e3",
        marginTop:10
    },
    txtClose:{
        fontSize: 18,
        fontWeight : "bold",
        marginVertical : 10,
        textAlign : "right",
        marginRight: 20
    },
    btnContainer : {
        display : 'flex',
        padding :15,
        backgroundColor : "#66347F",
        marginTop : 20,
        borderRadius: 15,
    },
    text_input:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :30
    },
    datatime: {
        backgroundColor: "#F6F1E9",
        marginTop: 20,
        padding: 10,
        borderWidth: 1, 
        borderColor: "gray",
        borderRadius: 10
    }
});

export default PlayersEdit; 