import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginDrawerHeader({IconName, HeaderText}) {
  return (
<View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#95DDCA', '#608D81', '#46675E']}
        style={{
          height: windowHeight / 9,
          width: windowWidth,
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          <View style={{alignItems: 'center'}}>
            <Icon name= {IconName} size={30} color="white" />
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{HeaderText}</Text>
          </View>
        </LinearGradient>
    </View>
  )
}