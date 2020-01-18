import React,{ useEffect, useState } from 'react';
import { View, Text,StyleSheet, Image, TextInput,TouchableOpacity, Keyboard } from 'react-native';
import  MapView,{ Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors';

import api from '../services/api';

const Main = ({navigation}) => {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion ] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(()=>{
        async function loadInitialPosition(){
           const { granted } = await requestPermissionsAsync();

           if(granted){
               const { coords } = await getCurrentPositionAsync({
                   enableHighAccuracy: true,
               });
               const { latitude, longitude } = coords;

               setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta:0.04,
               });

           }
        }
        loadInitialPosition();

        
    },[]);

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs,
            }
        });
        setDevs(response.data.devs);
    };

    function handleRegionChange(region){
        setCurrentRegion(region);
    }; 
    
    if(!currentRegion){
        return null;
    };
    
    return(
        <>
        <MapView 
        onRegionChangeComplete={handleRegionChange} 
        initialRegion={currentRegion} 
        style={styles.map}
        >
            {devs.map(devs =>(
                <Marker
                key={devs.id} 
                coordinate={{
                    longitude:devs.location.coordinates[0],
                    latitude:devs.location.coordinates[1] 
                    }}>
                <Image style={styles.avatar}
                source={{uri: devs.avatar_url}}/>
                <Callout onPress={()=>{
                navigation.navigate('Profile',{username: devs.github_username});
            }}>
                    <View style={styles.callout}>
                        <Text style={styles.name}>{devs.name}</Text>
                        <Text style={styles.info}>{devs.bio}</Text>
                        <Text styles={styles.extra}>{devs.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}
            
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
            style={styles.searchInput}
            placeholde="Buscar devs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
            />
            <TouchableOpacity 
            style={styles.searchButton}
            onPress={loadDevs}
            >
                <MaterialIcons name='my-location' size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    map:{
        flex:1,
    },
    avatar:{
        height:50,
        width:50,
        borderRadius:5,
        borderWidth:1,
        borderColor: '#fff',
    },
    callout:{
        width:260,

    },
    name:{
        fontWeight: 'bold',
        fontSize:16,
    },
    info:{
        color: '#666',
        marginTop:5,
    },
    extra:{
        marginTop:5,
    },
    searchForm:{
        position:'absolute',
        top: 20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection: 'row',
    },
    searchInput:{
        flex:1,
        height:50,
        backgroundColor: '#FFF',
        color:'#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width:4,
            height:4,
        },
        elevation:2,
    },
    searchButton:{
        width:50,
        height:50,
        backgroundColor: Colors.primaryColor,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})
export default Main;