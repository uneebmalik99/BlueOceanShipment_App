import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import AppBackground from '../../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {Calendar} from 'react-native-calendars';

export default function CreateNotifications({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const editorRef = useRef();

  return (
    <View style={{flex: 1}}>
      {/* complete screen background */}
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

      <View style={{paddingTop: 20, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <IonIcons
              name="arrow-back-circle-sharp"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
              Create Notifications
            </Text>
          </View>
          <View />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 20,
        }}>
        <ScrollView style={{marginTop: 20, paddingHorizontal: 20}}>
          <View>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              Assign to Customers
            </Text>
          </View>

          {/* view for holding assigned customers list */}
          <View
            style={{
              height: SIZES.windowHeight / 6,
              width: '100%',
              marginTop: 10,
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#5DADEA', 'rgba(26, 114, 222, 0.2)']}
                style={{
                  borderRadius: 15,
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}></LinearGradient> */}

            <View style={{height: '40%', paddingHorizontal: 10, width: '100%'}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
                style={{
                  borderRadius: 15,
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={{color: COLORS.white}}>Customer Name</Text>
                  </View>
                  <View>
                    <CheckBox
                      value={isSelected}
                      onValueChange={() => setSelection(!isSelected)}
                      tintColors={{true: COLORS.primary, false: 'black'}}
                    />
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
          {/* view for holding subject input */}
          <View style={{marginTop: 20}}>
            <View>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                Subject
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <TextInput
                placeholder="Write subject..."
                placeholderTextColor={'grey'}
                multiline
                style={{
                  height: SIZES.windowHeight / 8,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                  borderRadius: 10,
                  alignSelf: 'flex-start',
                  color: 'black',
                  textAlignVertical: 'top',
                  paddingLeft: 10,
                }}
              />
            </View>
          </View>

          {/* view for message text editor */}
          <View style={{marginTop: 20}}>
            <View>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                Message
              </Text>
            </View>
            <RichToolbar
              editor={editorRef}
              iconTint={COLORS.white}
              selectedIconTint={COLORS.black}
              actions={[
                actions.undo,
                actions.redo,
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.setStrikethrough,
                actions.insertImage,
              ]}
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: COLORS.primary,
                marginTop: 10,
              }}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                // borderBottomLeftRadius: 10,
                // borderBottomRightRadius: 10,
              }}>
              <RichEditor
                ref={editorRef}
                placeholder="Write message"
                useContainer={false}
                style={{height: 200, borderWidth: 1, borderColor: '#ccc'}}
                onChange={setEditorContent}
                editorStyle={{placeholderColor: 'grey', color: COLORS.black}}
                containerStyle={{borderColor: COLORS.primary}}
              />
            </View>
          </View>

          {/* view for calender and expiry date */}
          <View style={{marginTop: 20}}>
            <View>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                Expire Date
              </Text>
            </View>

            <View
              style={{
                height: SIZES.windowHeight / 16,
                paddingHorizontal: 10,
                width: '100%',
                marginTop: 10,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1A72DE', 'rgba(35, 111, 204, 0.19)']}
                style={{
                  borderRadius: 15,
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => setShowCalendar(!showCalendar)}>
                      <Entypo name="calendar" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                  <View style={{left: '60%'}}>
                    <Text style={{color: COLORS.white}}>
                      {selectedDate == null ? 'Expiry Date' : selectedDate}
                    </Text>
                  </View>
                </View>
                {showCalendar && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: '120%',
                    }}>
                    <Calendar
                      enableSwipeMonths={true}
                      markedDates={markedDates}
                      theme={{
                        textSectionTitleColor: 'yellow',
                        todayTextColor: COLORS.primary,
                        arrowColor: COLORS.white,
                        monthTextColor: COLORS.white,
                        selectedDotColor: COLORS.primary,
                        dayTextColor: COLORS.black,
                      }}
                      onDayPress={day => {
                        setSelectedDate(day.dateString);
                        // setShowCalendar(!showCalendar);
                        setMarkedDates({
                          //   ...markedDates,
                          [day.dateString]: {
                            selected: true,
                            selectedColor: COLORS.primary,
                          },
                        });
                      }}
                      style={{
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        elevation: 5,
                      }}
                      headerStyle={{
                        backgroundColor: COLORS.primary,
                        borderRadius: 15,
                        width: '100%',
                        marginTop: '2%',
                      }}
                    />
                  </View>
                )}
              </LinearGradient>
            </View>
          </View>

          {/* button for sending notifications */}
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: SIZES.windowHeight / 20,
                backgroundColor: COLORS.primary,
                width: SIZES.windowWidth / 1.8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => console.log('Send Notification Pressed')}>
              <Text style={{color: COLORS.white}}>Send Notification</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
