import {Image, View, Button} from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';

const Square = ({isLight, selected}) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({isLight, ...props}) => (
  <Button
    title={'Done'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{color: color(isLight)}}
    {...props}
  />
);

const Skip = ({isLight, skipLabel, ...props}) => (
  <Button
    title={'Skip'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
    }}
    textStyle={{color: color(isLight)}}
    {...props}>
    {skipLabel}
  </Button>
);

const Next = ({isLight, ...props}) => (
  <Button
    title={'Next'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{color: color(isLight)}}
    {...props}
  />
);

export default function OnBoarding({navigation}) {
  return (
    <Onboarding
      onDone={() => navigation.replace('Drawer')}
      onSkip={() => navigation.replace('Drawer')}
      pages={[
        {
          backgroundColor: '#A9E7F8',
          image: (
            <Image
              source={require('../../../assets/images/ship1.png')}
              style={{width: '100%', height: 300}}
            />
          ),
          title: 'Onboarding',
          subtitle:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
        },
        {
          backgroundColor: '#CCF8A9',
          image: (
            <Image
              source={require('../../../assets/images/ship1.png')}
              style={{width: '100%', height: 300}}
            />
          ),
          title: 'The Title',
          subtitle:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
        },
        {
          backgroundColor: '#F8A9CA',
          image: (
            <Image
              source={require('../../../assets/images/ship1.png')}
              style={{width: '100%', height: 300}}
            />
          ),
          title: 'Triangle',
          subtitle:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
        },
      ]}
    />
  );
}
