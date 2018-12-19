import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Button,
  Text,
  View,
} from 'react-native'

export const LIGHT_BLUE = "#95D3BF"
export const BLUE = "#44a284"
export const LIGHT_GREY = "#c9e9df"

class MainScreen extends Component {
  token = ''

  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      Connected: false,
    }
  }

  render() {
    if (this.state.Connected) {
      // return (
      //   <ScrollView style={{ backgroundColor: 'black' }}>
      //       <Text style={styles.instructions}>Look at what's hot today : </Text>
      //       <FlatList
      //         data={this.state.arr}
      //         renderItem={Posts}
      //       />
      //   </ScrollView>
      // )
    }
    return (
      <View style={styles.container}>
            <View>
              <View style={styles.boardicon}>
                <Image source={{uri: 'https://cdn.discordapp.com/attachments/520566691751526401/521993052903178250/logo_epicture.png'}} style={{width:200, height:250}} />
              </View>
              <Text style={styles.welcome}> Facilitez vos soins ! </Text>
            </View>
            <View style={styles.connexion}>
            <Button onPress={() => alert("kk")} title="Connexion" color="#44a284">
            </Button>
            </View>
            <View style={styles.footer}>
              <Button  onPress={() => alert("coucour")} title="Inscription" color="#44a284" >
              </Button>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
    paddingTop: 20
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    margin: 60,
  },
  instructions: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: LIGHT_GREY,
    fontSize: 26,
    lineHeight: 56
  },
  boardicon: {
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 10
  },
  footer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 420
  },
  connexion:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 480
  }
});

export default MainScreen;
