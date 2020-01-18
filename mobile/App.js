import React from 'react';
import Routes from './src/routes';
import {StatusBar} from 'react-native';
import Colors from './src/constants/Colors';

export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor={Colors.primaryColor}/>
    <Routes/>
    </>
  );
}

