import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  SIZES,
  COLORS,
  SVGBackground,
  SVGVehicle,
} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppBackground from '../../../../components/AppBackground';
import IonIcons from 'react-native-vector-icons/Ionicons';

const BulletText = ({Data}) => {
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 14, color: 'black'}}>
        {`\u2022`} {` `}
      </Text>
      <Text style={{fontSize: 14, color: COLORS.primary, flexShrink: 1}}>
        {Data}
      </Text>
    </View>
  );
};
export default function TermsAndConditions({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
        <AppBackground />
      </View>

      {/* header with back button and screen name */}
      <View
        style={{
          width: SIZES.windowWidth,
          height: SIZES.windowHeight / 14,
          backgroundColor: 'rgba(29, 119, 231, 0.81)',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
            name="arrow-back-circle-sharp"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <View>
          <Text style={{color: COLORS.white, fontSize: 18}}>
            Terms and Conditions
          </Text>
        </View>

        <View />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          width: '100%',
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: COLORS.black,
          elevation: 3,
          // alignItems: 'center',
        }}>
        <View style={{position: 'absolute'}}>
          <SvgXml
            xml={SVGVehicle}
            width={SIZES.windowWidth}
            height={SIZES.windowHeight / 1.5}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 18, color: COLORS.black, fontWeight: 'bold'}}>
            Terms and Conditions
          </Text>
        </View>

        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <Text style={{fontSize: 14, color: COLORS.black, textAlign: 'auto'}}>
            A terms and conditions agreement outlines the website
            administrator’s rules regarding user behavior and provides
            information about the actions the website administrator can and will
            perform. Essentially, your terms and conditions text is a contract
            between your website and its users. In the event of a legal dispute,
            arbitrators will look at it to determine whether each party acted
            within their rights. Creating the best terms and conditions page
            possible will protect your business from the following:
          </Text>
        </View>

        <BulletText
          Data={
            'Abusive users: Terms and Conditions agreements allow you to establish what constitutes appropriate activity on your site or app, empowering you to remove abusive users and content that violates your guidelines.'
          }
        />
        <BulletText
          Data={
            'Intellectual property theft: Asserting your claim to the creative assets of your site in your terms and conditions will prevent ownership disputes and copyright infringement.'
          }
        />
        <BulletText
          Data={
            'Potential litigation: If a user lodges a legal complaint against your business, showing that they were presented with clear terms and conditions before they used your site will help you immensely in court.'
          }
        />
      </View>
    </View>
  );
}
