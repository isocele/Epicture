import React, { Component } from 'react'
import { Button, Text, View, FlatList, Image, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { PostStyles } from '../components/Styles'

export function AddToFavorite(id, token) {
    fetch('https://api.imgur.com/3/album/' + id + '/favorite', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(fetch.throwErrors)
    .then(res => res.json())
    .then(json => {
      console.log(JSON.stringify(json))
      if (json.status == 404) {
        fetch('https://api.imgur.com/3/image/' + id + '/favorite', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(fetch.throwErrors)
        .then(res => res.json())
        .then(json => {
          console.log(JSON.stringify(json))
        })
        .catch(err => console.log('ERROR', err.message, err));
      }
    })
    .catch(err => console.log('ERROR', err.message, err));
    console.log('image added to favorites')
  };

export function Vote(id, token, type) {
      fetch('https://api.imgur.com/3/album/' + id + '/vote/' + type, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(fetch.throwErrors)
      .then(res => res.json())
      .then(json => {
        console.log(JSON.stringify(json))
        if (json.status == 404) {
          fetch('https://api.imgur.com/3/image/' + id + '/vote/' + type, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(fetch.throwErrors)
          .then(res => res.json())
          .then(json => {
            console.log(JSON.stringify(json))
          })
          .catch(err => console.log('ERROR', err.message, err));
        }
      })
      .catch(err => console.log('ERROR', err.message, err));
      console.log('image added to favorites')
    };

export const Posts = ({item}) => (
      <View>
        <View style={PostStyles.title}>
          <Text style={PostStyles.text}>{item.data.title}</Text>
        </View>
        <FlatList
          data={item.images}
          renderItem={({item}) => <Image style={{flex:1, height: item.img.height * Dimensions.get('window').width / item.img.width, width: Dimensions.get('window').width}} source={{uri: item.key}} resizeMode="contain"/>}
        />
        <PostFooter data={item.data} token={this.token}/>
        <View style={{paddingTop: 20}}>
        </View>
      </View>
)

export const PostFooter = props => {
  return (
    <View style={[{flexDirection: 'row',}, PostStyles.footer]}>
      {props.data.vote === 'up' &&
      <Icon type='font-awesome' name='arrow-up' color='lightblue' size={20} onPress={() => {
        Vote(props.data.id, props.token, 'veto')
      }}/> }
      {props.data.vote != 'up' &&
      <Icon type='font-awesome' name='arrow-up' color='white' size={20} onPress={() => {
        Vote(props.data.id, props.token, 'up')
      }}/> }
      <Text style={PostStyles.text}>{props.data.ups}</Text>
      {props.data.vote === 'down' &&
      <Icon type='font-awesome' name='arrow-down' color='red' size={20}  onPress={() => {
        Vote(props.data.id, props.token, 'veto')
      }}/> }
      {props.data.vote != 'down' &&
      <Icon type='font-awesome' name='arrow-down' color='white' size={20}  onPress={() => {
        Vote(props.data.id, props.token, 'down')
      }}/> }
      <Text style={PostStyles.text}>{props.data.downs}</Text>
      {props.data.favorite &&
        <Icon name='favorite' color='white' size={20} onPress={() => {
          AddToFavorite(props.data.id, props.token)
        }}/>
      }
      {!props.data.favorite &&
        <Icon name='favorite-border' color='white' size={20} onPress={() => {
          AddToFavorite(props.data.id, props.token)
        }}/>
      }
      <Text>{props.data.vote}</Text>
    </View>
  );
}
