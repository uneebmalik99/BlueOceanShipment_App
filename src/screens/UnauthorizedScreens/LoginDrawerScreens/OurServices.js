import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES, COLORS} from '../../../constants/theme';

export default function OurServices({navigation}) {
  // function for services items (used for code resuseability)
  function Services({ServiceTitle}) {
    return (
      <ImageBackground
        source={require('../../../assets/images/services.png')}
        style={{height: 100 / 1.2, width: 112 / 1.2, alignItems: 'center'}}>
        <View style={{position: 'absolute', bottom: 3, paddingHorizontal: 2}}>
          <Text style={{textAlign: 'center', fontSize: 10, color: 'black'}}>
            {ServiceTitle}
          </Text>
        </View>
      </ImageBackground>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>

      {/* first circle at at left corner */}
      <View
        style={{
          width: SIZES.windowWidth / 2.1,
          height: SIZES.windowHeight / 4.1,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          left: -SIZES.windowWidth / 4.5,
          top: -SIZES.windowHeight / 12,
        }}
      />

      {/* second circle at top right corner */}
      <View
        style={{
          width: SIZES.windowWidth / 1.7,
          height: SIZES.windowHeight / 3.3,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          right: -SIZES.windowWidth / 4.5,
          top: -SIZES.windowHeight / 14,
        }}
      />

      {/* first circle at at left corner */}
      <View
        style={{
          width: SIZES.windowWidth / 2.1,
          height: SIZES.windowHeight / 4.1,
          backgroundColor: 'rgba(133, 180, 235, 0.32)',
          position: 'absolute',
          borderRadius: SIZES.windowHeight / 3,
          right: -SIZES.windowWidth / 4.5,
          top: -SIZES.windowHeight / 17,
        }}
      />

      <View style={{paddingHorizontal: 20}}>
        <View>
          <TouchableOpacity
            style={{paddingTop: 20}}
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 25, color: COLORS.white}}>Our Services</Text>

          <Text
            style={{
              paddingTop: 20,
              fontSize: 14,
              color: COLORS.white,
              textAlign: 'justify',
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem m has been the industry's printer took a galley of
            and typesetting industry.
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          marginTop: 30,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingHorizontal: 20,
        }}>
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <Text style={{color: COLORS.primary, fontSize: 20}}>
            Services we Offer
          </Text>
        </View>

        <View
          style={{
            paddingTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Services ServiceTitle={'Create account in auction'} />

          <View style={{}}>
            <Services ServiceTitle={'Car shipping in containers'} />
          </View>

          <View style={{}}>
            <Services ServiceTitle={'Car towing across USA'} />
          </View>
        </View>
        <View
          style={{
            paddingTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <Services ServiceTitle={'Car warehousing before export'} />
          </View>
          <View style={{}}>
            <Services ServiceTitle={'Custom clearance in UAE'} />
          </View>

          <View style={{}}>
            <Services ServiceTitle={'Make export documentation'} />
          </View>
        </View>
      </View>
    </View>
  );
}
