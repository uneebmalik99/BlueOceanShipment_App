import {Image, View, Button, Text, ImageBackground} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {COLORS, SIZES} from '../../../constants/theme';

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

const Buttons = ({label}) => {
  return (
    <View style={{paddingTop: 15}}>
      <Text style={{color: COLORS.white, fontSize: 16, fontWeight: 'bold'}}>
        {label}
      </Text>
    </View>
  );
};
const slides = [
  {
    key: 1,
    title: 'Welcome to Blue Ocean Shipping',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
    image: require('../../../assets/images/onboarding1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
    image: require('../../../assets/images/onboarding2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
    image: require('../../../assets/images/onboarding3.png'),
    backgroundColor: '#22bcb5',
  },
];

const renderItem = ({item}) => {
  return (
    <ImageBackground
      source={require('../../../assets/images/onboarding.png')}
      // resizeMode="cover"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={{width: SIZES.windowWidth - 80, height: 200}}
      />
      <Text
        style={{
          fontSize: 22,
          color: '#fff',
          fontWeight: 'bold',
        }}>
        {item.title}
      </Text>
      <Text style={{marginTop: 10, fontSize: 16, color: '#fff'}}>
        {item.text}
      </Text>
    </ImageBackground>
  );
};

export default function OnBoarding({navigation}) {
  return (
    // <Onboarding
    //   onDone={() => navigation.replace('Drawer')}
    //   onSkip={() => navigation.replace('Drawer')}
    //   pages={[
    //     {
    //       backgroundColor: '#A9E7F8',
    //       image: (
    //         <Image
    //           source={require('../../../assets/images/ship1.png')}
    //           style={{width: '100%', height: 300}}
    //         />
    //       ),
    //       title: 'Onboarding',
    //       subtitle:
    //         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
    //     },
    //     {
    //       backgroundColor: '#CCF8A9',
    //       image: (
    //         <Image
    //           source={require('../../../assets/images/ship1.png')}
    //           style={{width: '100%', height: 300}}
    //         />
    //       ),
    //       title: 'The Title',
    //       subtitle:
    //         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
    //     },
    //     {
    //       backgroundColor: '#F8A9CA',
    //       image: (
    //         <Image
    //           source={require('../../../assets/images/ship1.png')}
    //           style={{width: '100%', height: 300}}
    //         />
    //       ),
    //       title: 'Triangle',
    //       subtitle:
    //         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem m has been the industrys printer',
    //     },
    //   ]}
    // />

    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      activeDotStyle={{width: 30, backgroundColor: COLORS.white, height: 10}}
      renderNextButton={() => <Buttons label={'Next'} />}
      renderPrevButton={() => <Buttons label={'Back'} />}
      renderSkipButton={() => <Buttons label={'Skip'} />}
      renderDoneButton={() => <Buttons label={'Done'} />}
      showSkipButton
      showPrevButton
      onDone={() => navigation.replace('Drawer')}
      onSkip={() => navigation.replace('Drawer')}
    />
  );
}
