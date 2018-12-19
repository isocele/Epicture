import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, Image, AsyncStorage } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from "react-native-elements";
import { Key, CLIENT_ID } from '../clientId'
import { PostFooter, Posts } from '../components/AddFavorites'
import { PostStyles } from '../components/Styles'

const IMGUR_URL = 'https://api.imgur.com/3/account/me/images'
const favoritesUrl = 'https://api.imgur.com/3/account/me/gallery_favorites'
const backColor = 'black'


export default class ProfilScreen extends React.Component {
  token = ''

  componentWillMount() {
    AsyncStorage.getItem(Key).then((token) => {
      this.token = token
      fetch(IMGUR_URL, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(fetch.throwErrors)
      .then(res => res.json())
      .then(json => {
        json.data.forEach(post => {
          tmp = []
          if (post.images) {
            post.images.forEach(image => {
              tmp.push({key: image.link, img: image})
            })
          }
          else {
            tmp.push({key: post.link, img: post})
          }
          this.setState((state) => {
            posts: this.state.posts.push({key: post.link, data: post, images: tmp})
          });
        });
        this.setState({
          isLoading: true
        })
      })
      .catch(err => console.log('ERROR', err.message, err));
      fetch(favoritesUrl, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(fetch.throwErrors)
      .then(res => res.json())
      .then(json => {
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
            favorites: this.state.favorites.push({key: post.link, data: post, images: tmp})
          });
        });
        this.setState({
          loadFavorites: true
        })
      })
      .catch(err => console.log('ERROR', err.message, err));
    });
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.token = value
        console.log(key, '=', value);
      }
      else {
        console.log("no data received")
      }
      console.log(IMGUR_URL, this.token)

     } catch (error) {
       console.log('error retrieving data', error)
     }
  }

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      index: 0,
      routes: [
        { key: 'first', title: 'Posts'},
        { key: 'second', title: 'Favorites' },
      ],
      posts: [],
      favorites: [],
      isLoading: false,
      loadFavorites: false,
    }
  }

  FirstRoute = (props) => (
    <View style={[PostStyles.container, { backgroundColor: backColor }]}>
    <FlatList
      data={props.tab}
      renderItem={Posts}
    />
    </View>
  );

  SecondRoute = (props) => (
    <View style={[PostStyles.container, { backgroundColor: backColor }]}>
    <FlatList
      data={props.tab}
      renderItem={Posts}
    />
    </View>
  );

  _renderTabBar(props) {
    return (
       <TabBar
         {...props}
         style={{backgroundColor: "#44a284", height: 50, fontColor: 'black'}}
         renderIcon={this.renderIcon}
         indicatorStyle={{backgroundColor: "#555555"}}
       />
     )
  }

  render() {
    if (!this.state.isLoading || !this.state.loadFavorites) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <TabView
        navigationState={this.state}
        renderScene = {({ route }) => {
          switch (route.key) {
            case 'first':
              return <this.FirstRoute tab={this.state.posts}/>;
            case 'second':
              return <this.SecondRoute tab={this.state.favorites}/>;
            default:
              return null;
          }
        }}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ height: 0, width: Dimensions.get('window').width}}
        renderTabBar={this._renderTabBar}
      />
    );
  }
}
