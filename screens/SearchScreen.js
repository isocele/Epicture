import React, {Component} from 'react'
import {
  Text, TextInput, View, TouchableOpacity, TouchableHighlight,
  FlatList, AsyncStorage
} from 'react-native'
import IOSIcon from "react-native-vector-icons/Ionicons"
import { Icon } from "react-native-elements"
import { CLIENT_ID, Key } from '../clientId'
import { AddToFavorite, Vote, PostFooter, Posts } from '../components/AddFavorites'
import { PostStyles } from '../components/Styles'
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

const IMGUR_URL = 'https://api.imgur.com/3/'
const url = 'https://api.imgur.com/3/gallery/search/'
const urlImage = 'https://api.imgur.com/3/image/'
const textColor = 'white'

class SearchScreen extends Component {
  token = ''

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(key, '=', value)
        this.token = value
      }
      else {
        console.log("no data received")
      }
     } catch (error) {
       console.log('error retrieving data')
     }
  }

  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      search: '',
      filter: 'time',
      isLoading: true,
    }
    this._retrieveData(Key)
  }

  searchImages(keyword) {
    this.setState({ search: keyword })
    this.setState({ arr: [] })
    this.setState({ isLoading: false })
    console.log(url + this.state.filter + '/?q=' + keyword)
    fetch(url + this.state.filter + '/?q=' + keyword, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
    .then(fetch.throwErrors)
    .then(res => res.json())
    .then(json => {
      console.log(JSON.stringify(json))
      json.data.forEach(post => {
        tmp = []
        if (post.images) {
          post.images.forEach(image => {
            tmp.push({key: image.link, img: image})
            console.log(image.link)
          })
        }
        else {
          tmp.push({key: post.link, img: post})
        }
        this.setState((state) => {
          arr: this.state.arr.push({key: post.link, data: post, images: tmp})
        })
      })
      this.setState({
        isLoading: true
      })
    })
    .catch(err => console.log('ERROR', err.message, err))
  }

  render () {
    if (!this.state.isLoading) {
      return (
        <View style={[PostStyles.container, { backgroundColor: 'black' }]}>
          <View style={PostStyles.searchBox}>
            <Text>Loading...</Text>
          </View>
        </View>
      )
    }
    return (
      <MenuProvider>
      <View style={[PostStyles.container, { backgroundColor: 'black' }]}>
        <View style={PostStyles.searchBox}>
          <TextInput
            style={PostStyles.searchText}
            placeholder="Search Imgur"
            onSubmitEditing={(text) => this.searchImages(text.nativeEvent.text)}
            maxLength = {30}
            onChangeText={(text) => this.setState({ search: text })}
            value = {this.state.search}
          />
          <TouchableOpacity onPress={()=> {this.searchImages(this.state.search)}}>
            <IOSIcon name="ios-search" size={30} style={{paddingRight: 10, paddingLeft: 15}}/>
          </TouchableOpacity>
          <Menu style={PostStyles.right}>
            <MenuTrigger>
              <Icon type='font-awesome' name='ellipsis-h' color='black' size={30}/>
            </MenuTrigger>
            <MenuOptions customStyles={optionStyles} optionsContainerStyle={PostStyles.menuContainerStyle}>
              {this.state.filter === 'time' && <MenuOption onSelect={() => this.state.filter = 'time'} text='Newest <='/> }
              {this.state.filter != 'time' && <MenuOption onSelect={() => this.state.filter = 'time'} text='Newest' /> }
              {this.state.filter === 'viral' && <MenuOption onSelect={() => this.state.filter = 'viral'} text='Popular <='/> }
              {this.state.filter != 'viral' && <MenuOption onSelect={() => this.state.filter = 'viral'} text='Popular'/> }
              {this.state.filter === 'top' && <MenuOption onSelect={() => this.state.filter = 'top'} text='Top <=' /> }
              {this.state.filter != 'top' && <MenuOption onSelect={() => this.state.filter = 'top'} text='Top' /> }
            </MenuOptions>
          </Menu>
        </View>
        <FlatList
          data={this.state.arr}
          extraData={this.state}
          renderItem={Posts}
        />
      </View>
      </MenuProvider>
    )
  }
}

const optionStyles = {
  optionOuterWrapper: {
    backgroundColor: 'black',
  },
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionWrapper: {
    borderRadius: 5,
    margin: 5,
  },
  optionText: {
    fontSize: 20,
    color: 'white',
  },
};

const textStyles = {
  optionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
}

export default SearchScreen
