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

const BulletText = ({Number, Question, Answer}) => {
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <Text style={{fontSize: 14, color: 'black'}}>
            {Number} {` `}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              flexShrink: 1,
              fontWeight: 'bold',
            }}>
            {Question}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.primary,
              flexShrink: 1,
              marginTop: 5,
            }}>
            {Answer}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default function FAQs({navigation}) {
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
          <Text style={{color: COLORS.white, fontSize: 18}}>FAQs</Text>
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
            Frequently Asked Questions
          </Text>
        </View>

        <BulletText
          Question={'What platforms do you develop for?'}
          Number={'1. '}
          Answer={
            'We can help you reach a wider target audience by developing apps for iPhone and Android.'
          }
        />
        <BulletText
          Question={'Can I see examples of your work?'}
          Number={'2. '}
          Answer={
            'Of course. We can provide you with  we have developed, apart from the feedback from some of our clients'
          }
        />
        <BulletText
          Question={'How long does it take to have an app developed?'}
          Number={'3. '}
          Answer={
            'The time taken to develop an app depends on the complexities involved in programming as well as the team size. We can work well within deadlines and produce quick turnarounds.'
          }
        />
      </View>
    </View>
  );
}
