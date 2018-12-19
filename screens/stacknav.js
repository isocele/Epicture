import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, TextInput,
  View, TouchableOpacity
} from 'react-native';

import { StackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
import ProfilScreen from "./ProfilScreen";
import SearchScreen from "./SearchScreen";
import UploadScreen from "./UploadScreen";

const stackNav = StackNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: "Main",
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <IOSIcon name="ios-menu" size={30} style={{paddingRight: 10, paddingLeft: 15}}/>
                  </TouchableOpacity>
      ),
    })
  },
  Profil : {
    screen: ProfilScreen,
    navigationOptions: ({navigation}) => ({
      title: "Profil",
    })
  },
  Search : {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  Upload : {
    screen: UploadScreen,
    navigationOptions: ({navigation}) => ({
      title: "Upload",
    })
  }
});

export default stackNav;
