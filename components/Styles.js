import { StyleSheet } from 'react-native';

export const LIGHT_BLUE = "#95D3BF"
export const BLUE = "#44a284"

export const PostStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor: 'lightgreen',
    backgroundColor: LIGHT_BLUE,
  },
  searchText: {
    height: 40,
    fontSize: 20,
    padding: 10
  },
  title: {
    backgroundColor: '#2D2D2D',
  },
  footer: {
    backgroundColor: '#2D2D2D',
  },
  text: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  right: {
    flex: 0.8,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuContainerStyle: {
    backgroundColor: '#635D5D',
    borderRadius: 5,
    width: 120,
  },
});

export const UploadStyles = StyleSheet.create({
  container: {
    padding: 20,
    //justifyContent: 'center',
    backgroundColor: LIGHT_BLUE,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  upload: {
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: BLUE,
    borderRadius: 5,
  },
  input: {
    height: 50,
    width: '100%',
    fontSize: 20,
    padding: 10,
    backgroundColor: BLUE,
    borderRadius: 5,
  },
  photo: {
    marginTop: 10,
    marginBottom: 10,
    width:'100%',
    height: '72%',
    borderRadius: 5,
  },
  select: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE,
    borderRadius: 5,
  }
});
