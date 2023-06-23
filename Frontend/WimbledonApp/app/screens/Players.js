import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Modal, TouchableOpacity, Image, 
Text } from 'react-native';
import AppText from '../components/AppText';
import PlayersName from '../components/PlayersName';
import PlayerNameView from '../components/PlayerNameView';
import PlayerInfo from '../components/PlayerInfo';
import axios from 'axios';
import PlayerInfoText from '../components/PlayerInfoText';
import PlayerInfoTrophy from '../components/PlayerInfoTrophy';

const Players = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [visible2, setVisible2] = useState(false);
    const [list,setList] = useState([]);
    const [hideId, setHideId] = useState(null);

    
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


    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 20);
    }, []);

    
    
    const [modalData, setModalData] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);


    const handleVisibleModalPlayer = (player) => {
        setModalData(player);
        setSelectedPlayer(player);

        setVisible2(!visible2);
        setHideId(null);
    }
    

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
  
    
    return (
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
                    <PlayerNameView
                        key={player.id}
                        name={`${player.lastName} ${player.firstName}`}
                        onPress={() => handleVisibleModalPlayer(player)}
                        />
                    ))}
                </View>
                );
            })}

            <Modal 
                animationType="slide"
                visible={visible2}>
                      {selectedPlayer && (
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
                        <Text style={styles.name}>{selectedPlayer.firstName} {selectedPlayer.lastName}</Text>
                </View>

                <View style={styles.playerInfo}>
                    <PlayerInfoText text="Country" value={selectedPlayer.country} fontWeight='600'/>
                    <PlayerInfoText text="Age" value={selectedPlayer.age} fontWeight='600'/>
                    <PlayerInfoText text="Birth Date" value={selectedPlayer.birthDate} fontWeight='600'/>
                    <PlayerInfoText text="Birth Place" value={selectedPlayer.birhtPlace} fontWeight='600'/>
                    <PlayerInfoText text="Height" value={selectedPlayer.height} fontWeight='600'/>
                    <PlayerInfoText text="Weight" value={selectedPlayer.weight} fontWeight='600'/>
                    <PlayerInfoText text="Plays" value={selectedPlayer.plays} fontWeight='600'/>
                </View>

                <View style={styles.playerInfo2}>
                    <View style={styles.playerInfo2Text}>
                        <PlayerInfoTrophy text="Championships Played" value={selectedPlayer.championships}/>
                        <PlayerInfoTrophy text="Best Single" value={selectedPlayer.bestSingle}/>
                        <PlayerInfoTrophy text="Best Double" value={selectedPlayer.bestDouble}/>
                    </View>
                    <Image source={require('../screens/trofej.png')} style={styles.trofej} />
                </View>

                <View style={styles.playerInfo2}>
                    <View style={styles.playerInfo2Text}>
                        <PlayerInfoTrophy text="Years Turned Pro" value={selectedPlayer.turnedPro}/>
                        <PlayerInfoTrophy text="Career Matches Won" value={selectedPlayer.win}/>
                        <PlayerInfoTrophy text="Career Matches Lost" value={selectedPlayer.loss}/>
                        <PlayerInfoTrophy text="High Rank for Singles" value={selectedPlayer.highRankSingle}/>
                        <PlayerInfoTrophy text="High Rank for Doubles" value={selectedPlayer.hightRankDouble}/>
                    </View>
                    <Image source={require('../screens/reket.png')} style={styles.reket} />
                    
                </View>
                </ScrollView>
                </View>
                    )}
            </Modal>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      title: {
        fontSize: 25,
        color: "#446A46",
        textTransform: 'uppercase',
        fontWeight: '500',
        alignSelf: 'center',
        marginVertical: 30
      },
      txtClose:{
        fontSize: 18,
        fontWeight : "bold",
        marginVertical : 10,
        textAlign : "right",
        marginRight: 20
      },
      containerr: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 20,
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
})
export default Players;