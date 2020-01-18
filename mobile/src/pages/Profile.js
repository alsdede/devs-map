import React from 'react';
import { View, Text } from 'react-native';
import { WebView} from 'react-native-webview';

const Profile = ({navigation}) => {
   const username = navigation.getParam('username');
    return(
        <WebView style={{flex:1}} source={{uri: `https://github.com/${username}`}}/>
    );
}
export default Profile;