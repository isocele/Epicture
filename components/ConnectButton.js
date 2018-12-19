import React from 'react';
import { Button } from 'react-native';

const imgurButton = props => {
  return (
    <Button title="Connect" onPress={props.onConnect} />
  );
};

export default imgurButton;
