import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, AsyncStorage} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Permissions from 'react-native-permissions'
import { UploadStyles } from '../components/Styles'

const options={
  title: 'Upload a photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
class UploadScreen extends Component {
  token = ''


  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic:null,
      title: ''
    }
  }

  componentDidMount() {
    Permissions.request('photo').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
  }

  _requestPermission = () => {
      Permissions.request('photo').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ photoPermission: response })
      })
    }

getPic = ()=>{
  this._requestPermission()
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('Image Picker Error: ', response.error);
    }

    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source,
        pic:response.data
      });
    }
  });
}
  // uploadPic = () => {
  //   console.log(this.state.title)
  //   console.log(JSON.stringify(this.state.avatarSource))
  //   console.log(this.state.pic)
  //   fetch('https://api.imgur.com/3/image', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'Bearer ' + this.token,
  //       //'Authorization': 'Client-ID ' + CLIENT_ID,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       image: this.state.pic,
  //       title: this.state.title
  //     }),
  //   })
  //   .then(fetch.throwErrors)
  //   .then(res => res.json())
  //   .then(json => {
  //     console.log(JSON.stringify(json))
  //   })
  //   .catch(err => console.log('ERROR', err.message, err));
  //   alert("Image uploaded")
  // };

  render() {
    return (
      <View style={UploadStyles.container}>
        <View>
          <TextInput
            style={UploadStyles.input}
            placeholder="Post title (required)"
            onChangeText={(text) => this.state.title = text}
          />
        </View>
          <Image source={this.state.avatarSource}
          style={UploadStyles.photo}/>

        <View style={UploadStyles.select}>
          <TouchableOpacity
          onPress={this.getPic}>
            <Text style={{fontSize: 20}}>Select Image</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}

export default UploadScreen;
