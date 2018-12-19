import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";

export const LIGHT_BLUE = "#95D3BF"
export const BLUE = "#44a284"
export const LIGHT_GREY = "#225344"

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.navSectionStyle}>
              <IOSIcon name="ios-home" size={25} color='#44a284' style={{paddingRight: 10, paddingLeft: 15}}/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Main')}>
                Home
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <IOSIcon name="ios-search" size={30} color='#44a284' style={{paddingRight: 10, paddingLeft: 15}}/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Search')}>
                Search
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <IOSIcon name="ios-share" size={30} color='#44a284' style={{paddingRight: 10, paddingLeft: 15}}/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Upload')}>
                Upload
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <IOSIcon name="ios-contact" size={25} color="#44a284" style={{paddingRight: 10, paddingLeft: 15}}/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Profil')}>
                Profil
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>Made in Tek</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#c9e9df'
  },
  navItemStyle: {
    padding: 5,
  },
  navSectionStyle: {
    padding: 10,
    flexDirection:'row',
    color: LIGHT_BLUE
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: LIGHT_BLUE
  }
});
