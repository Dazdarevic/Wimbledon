import { Header } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PlayerInfoText from './PlayerInfoText';
import PlayerInfoTrophy from '../components/PlayerInfoTrophy';


function PlayerInfo({navigation}) {
  return (
    <View style={styles.container}>
      {/* Slika i rang */}
      <View style={styles.playerHeader}>
        <Image resizeMode="contain" source={require('../screens/novakd.jpg')} style={styles.image} />
        <View style={styles.rangContainer}>
          <Text style={styles.rangPlace}>3</Text>
          <View style={styles.rangContainerText}>
            <Text style={styles.rang}>singles</Text>
            <Text style={styles.rang}>rang</Text>
          </View>
        </View>
      </View>
      {/* Ostale informacije o igracu */}
      <View style={styles.playerContent}>
            {/* <Image resizeMode="contain" source={require('../screens/srb.jpg')} style={styles.zastava} /> */}
            <Text style={styles.name}>Novak Djokovic</Text>
      </View>

      <View style={styles.playerInfo}>
        <PlayerInfoText text="Country" value="Serbia" fontWeight='600'/>
        <PlayerInfoText text="Age" value="36" fontWeight='600'/>
        <PlayerInfoText text="Birth Date" value="22 may 1987" fontWeight='600'/>
        <PlayerInfoText text="Birth Place" value="Belgrade, Serbia" fontWeight='600'/>
        <PlayerInfoText text="Height" value="188" fontWeight='600'/>
        <PlayerInfoText text="Weight" value="77" fontWeight='600'/>
        <PlayerInfoText text="Plays" value="Right Handed" fontWeight='600'/>
      </View>

      <View style={styles.playerInfo2}>
        <View style={styles.playerInfo2Text}>
            <PlayerInfoTrophy text="Championships Played" value="17"/>
            <PlayerInfoTrophy text="Best Single" value="2022"/>
            <PlayerInfoTrophy text="Best Double" value="2006"/>
        </View>
        <Image source={require('../screens/trofej.png')} style={styles.trofej} />
      </View>

      <View style={styles.playerInfo2}>
        <View style={styles.playerInfo2Text}>
            <PlayerInfoTrophy text="Years Turned Pro" value="2003"/>
            <PlayerInfoTrophy text="Career Matches Won" value="1051"/>
            <PlayerInfoTrophy text="Career Matches Lost" value="210"/>
            <PlayerInfoTrophy text="High Rank for Singles" value="1"/>
            <PlayerInfoTrophy text="High Rank for Doubles" value="114"/>
        </View>
        <Image source={require('../screens/reket.png')} style={styles.reket} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'beige',
    padding: 20,
  },
  playerHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    // backgroundColor: "red",
    paddingVertical: 20
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
  },
  playerInfo: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  playerInfo2: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingBottom: 10
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
  }
});

export default PlayerInfo;
