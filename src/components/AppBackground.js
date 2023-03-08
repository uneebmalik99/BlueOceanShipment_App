import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function AppBackground() {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#196FDD', '#25B7E7']}
      style={{flex: 1}}></LinearGradient>
  );
}
