import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Welcome({navigation}) {
  // function to redirect to the whatsapp app
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

  //   function for dashboard items
  const DashboardItems = ({
    OnPress1,
    OnPress2,
    OnPress3,
    Icon1,
    Icon2,
    Icon3,
    Title1,
    Title2,
    Title3,
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            height: 75,
            width: 75,
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: 40,
          }}
          onPress={OnPress1}>
          <Image
            source={Icon1}
            resizeMode="contain"
            style={{height: 28, width: 28}}
          />
          <Text style={{color: 'black', fontSize: 12}}>{Title1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            height: 75,
            width: 75,
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: 40,
          }}
          onPress={OnPress2}>
          <Image
            source={Icon2}
            resizeMode="contain"
            style={{height: 28, width: 28}}
          />
          <Text style={{color: 'black', fontSize: 12}}>{Title2}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            height: 75,
            width: 75,
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: 40,
          }}
          onPress={OnPress3}>
          <Image
            source={Icon3}
            resizeMode="contain"
            style={{height: 28, width: 28}}
          />
          <Text style={{color: 'black', fontSize: 12}}>{Title3}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* logo view, below header */}
      <View
        style={{
          height: '25%',
          width: '100%',
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '8%',
        }}>
        <Image
          source={require('../../assets/images/blueOcean.png')}
          resizeMode="contain"
          style={{height: 50, width: 200, tintColor: 'white'}}
        />
      </View>

      {/* welcome screen dashboard view */}
      <View style={{flex: 1, marginTop: 28, paddingHorizontal: 20}}>
        <DashboardItems
          Icon1={require('../../assets/icons/car-dash.png')}
          Title1={'Track VIN'}
          OnPress1={() => console.log('Auction')}
          Icon2={require('../../assets/icons/finder.png')}
          Title2={'Finder'}
          OnPress2={() => console.log('Finder')}
          Icon3={require('../../assets/icons/watchlists.png')}
          Title3={'Watchlist'}
          OnPress3={() => console.log('Watchlist')}
        />

        <View style={{marginTop: 28}}>
          <DashboardItems
            Icon1={require('../../assets/icons/bid.png')}
            Title1={'My Bids'}
            OnPress1={() => console.log('My Bids')}
            Icon2={require('../../assets/icons/carwin.png')}
            Title2={'Won'}
            OnPress2={() => console.log('Won')}
            Icon3={require('../../assets/icons/thistory.png')}
            Title3={'History'}
            OnPress3={() => console.log('Payment History')}
          />
        </View>

        <View style={{marginTop: 28}}>
          <DashboardItems
            Icon1={require('../../assets/icons/buynow.png')}
            Title1={'Buy Now'}
            OnPress1={() => console.log('Buy Now')}
            Icon2={require('../../assets/icons/future-car.png')}
            Title2={'Future Cars'}
            OnPress2={() => console.log('Future Cars')}
            Icon3={require('../../assets/icons/operator.png')}
            Title3={'Contact Us'}
            OnPress3={() => navigation.navigate('ContactUs')}
          />
        </View>
      </View>

      {/* header view */}
      <View
        style={{
          height: '8%',
          width: SIZES.windowWidth,
          backgroundColor: COLORS.primary,
          elevation: 10,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          position: 'absolute',
        }}>
        <View>
          <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* login button view */}
          <View style={{right: 10}}>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate('LoginScreen')}>
              <AntDesign name="login" size={17} color="white" />
            </TouchableOpacity>
          </View>

          {/* whatsapp button view */}
          <View style={{right: 5}}>
            <TouchableOpacity style={{}} onPress={openWhatsApp}>
              <Icon name="whatsapp" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* search button view */}
          <View>
            <TouchableOpacity style={{}} onPress={() => console.log('search')}>
              <IonIcon name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '7%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: SIZES.windowWidth / 1.33,
            height: SIZES.windowHeight / 16,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: COLORS.white}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
