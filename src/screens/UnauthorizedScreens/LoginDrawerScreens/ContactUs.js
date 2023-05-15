import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {SIZES, COLORS, SVGBackground} from '../../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppBackground from '../../../components/AppBackground';

// const svgCode = `
// <svg width="440" height="349" viewBox="0 0 490 349" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M0 320.218V-2H430V320.218C382.3 372.345 278.249 341.937 232.186 320.218C209.505 304.942 152.78 278.974 107.325 297.304C61.8695 315.635 16.8352 320.218 0 320.218Z" fill="url(#paint0_linear_227_7)" />
//   <path d="M0 317.154V0H430V317.154C382.3 368.463 331.071 282.938 232.186 317.154C133.301 351.37 151.408 305.92 93.8732 285.23C36.338 264.54 16.8352 317.154 0 317.154Z" fill="url(#paint1_linear_227_7)" fill-opacity="0.32" />
//   <circle cx="406.5" cy="28.5" r="70.5" fill="#85B4EB" fill-opacity="0.32" />
//   <defs>
//     <linearGradient id="paint0_linear_227_7" x1="164.5" y1="-48.5" x2="306.5" y2="349" gradientUnits="userSpaceOnUse">
//       <stop stop-color="#1A75DE" />
//       <stop offset="1" stop-color="#9DD7FF" />
//     </linearGradient>
//     <linearGradient id="paint1_linear_227_7" x1="215" y1="6.77769e-06" x2="392.796" y2="448.662" gradientUnits="userSpaceOnUse">
//       <stop stop-color="#1F689E" />
//       <stop offset="1" stop-color="#5AB8FF" />
//     </linearGradient>
//   </defs>
// </svg>`;

const openWhatsApp = () => {
  let phoneNumber = '+923037235334'; // Replace with your phone number
  let message = 'Hello, this is a test message!'; // Replace with your message

  if (Platform.OS === 'android') {
    phoneNumber = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
  } else {
    phoneNumber = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
  }

  Linking.openURL(phoneNumber)
    .then(data => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      alert('Make sure WhatsApp is installed on your device');
    });
};

// function to redirect to the email app
const openEmail = () => {
  let email = 'aamir104512@gmail.com'; // Will replace with user email
  let subject = 'Test Email'; // Will replace with user subject
  let body = 'This is the test email from my app.'; // Will replace with user body

  let url = `mailto:${email}?subject=${subject}&body=${body}`;

  Linking.openURL(url)
    .then(data => {
      console.log('Email Opened', data);
    })
    .catch(() => {
      alert('Make sure email app is installed on your device');
    });
};

// function to redirect to the sms app
const openTextMessage = () => {
  let phoneNumber = '+923037235334'; // Replace with user phone number
  let body = 'Hello, this is a test message!'; // Replace with user message

  let url = `sms:${phoneNumber}?body=${body}`;

  Linking.openURL(url)
    .then(data => {
      console.log('Text Message Opened', data);
    })
    .catch(() => {
      alert('Make sure text message app is installed on your device');
    });
};

export default function MyComponent({navigation}) {
  // function to redirect to the whatsapp app

  function ContactButtons({IconName, OnPress}) {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            backgroundColor: COLORS.lightGray,
            borderRadius: 25,
            // borderWidth: 1,
            // borderColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={OnPress}>
          <Image
            source={IconName}
            resizeMode="contain"
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function ContactItems({ItemText, IconName, IconColor}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: SIZES.windowHeight / 10,
          width: SIZES.windowWidth / 1.2,
          backgroundColor: COLORS.lightGray,
          alignItems: 'center',
          paddingHorizontal: 20,
          borderRadius: 10,
          shadowColor: COLORS.black,
          elevation: 5,
        }}>
        <View style={{right: 5}}>
          <MaterialIcons name={IconName} size={25} color={IconColor} />
        </View>

        <View style={{flex: 1, left: 5}}>
          <Text style={{color: COLORS.black, textAlign: 'justify'}}>
            {ItemText}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>
      <View style={{position: 'absolute'}}>
        <SvgXml
          xml={SVGBackground}
          width={SIZES.windowWidth}
          height={SIZES.windowHeight / 4.5}
        />
      </View>

      <View style={{paddingHorizontal: 20}}>
        <View>
          <TouchableOpacity
            style={{paddingTop: 20}}
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 25, color: COLORS.white}}>Contact Us</Text>
        </View>

        <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 16, color: COLORS.white}}>
            We provides 24/7 assistance to our customers. For sales, auction
            account towing, loading and shipping please contact us
          </Text>
        </View>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: '10%',
        }}>
        {/* view containing contact buttons (whatsapp, email, messages) */}
        <View
          style={{
            flexDirection: 'row',
            width: SIZES.windowWidth,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingHorizontal: SIZES.windowWidth / 8,
          }}>
          <ContactButtons
            IconName={require('../../../assets/icons/whatsapp.png')}
            OnPress={openWhatsApp}
          />
          <ContactButtons
            IconName={require('../../../assets/icons/email.png')}
            OnPress={openEmail}
          />
          <ContactButtons
            IconName={require('../../../assets/icons/message.png')}
            OnPress={openTextMessage}
          />
        </View>

        {/* view containing contact items (location, phone, email) */}
        <View style={{marginTop: 20}}>
          <ContactItems
            ItemText={
              '107 12th Floor, Centurion Star Tower, Block A, Opp Deira'
            }
            IconName="location-on"
            IconColor="red"
          />
        </View>

        <View style={{marginTop: 10}}>
          <ContactItems
            ItemText={'+923309826252    +923327625224'}
            IconName="phone"
            IconColor={COLORS.primary}
          />
        </View>

        <View style={{marginTop: 10}}>
          <ContactItems
            ItemText={'blueocean@shipping.com'}
            IconName="email"
            IconColor={COLORS.primary}
          />
        </View>

        <View style={{marginBottom: 30}} />
      </ScrollView>
    </View>
  );
}
