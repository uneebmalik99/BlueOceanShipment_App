import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppBackground from '../../../components/AppBackground';
import {SIZES, COLORS, SVGBackground} from '../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StickyNotes({navigation}) {
  const [notesText, setNotesText] = useState('');
  const [allNotes, setAllNotes] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemColors, setItemColors] = useState({});

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // useEffect for generating random colors
  useEffect(() => {
    const colors = {};
    {
      allNotes != null &&
        allNotes.data.records.forEach(item => {
          colors[item.id] = getRandomColor();
        });
      setItemColors(colors);
    }
  }, [allNotes]);

  // useEffect for fetching all notes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved from AsyncStorage:', token);
          try {
            const response = await fetch(
              'https://app.ecsapshipping.com/api/auth/sticknotes/view',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              },
            );

            console.log('Fetching sticky notes...');
            const data = await response.json();

            if (data.status == 'Success') {
              setAllNotes(data);
              setLoading(false);
              console.log('Notes fetched successfully');
            } else {
              console.log('Error fetching shippment');
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.error(error);
          }
        }
      } catch (error) {
        console.warn('Error while retrieving token from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [isUpdated]);

  // function for updating the notes
  const CreateNotes = async () => {
    var value = new FormData();
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token retrieved from AsyncStorage:', token);
        value.append('sticky_id', allNotes.data.sticky_id);
        value.append('notes', notesText);

        var url = 'https://app.ecsapshipping.com/api/auth/sticknotes/create';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: value,
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status == 'Success') {
              console.log('Success');
              alert('Note Added Successfully');
              setIsUpdated(!isUpdated);
              setModalVisible(false);
            } else {
              console.log('UnSuccess ', responseJson);
            }
          })
          .catch(error => {
            alert(error);
            console.warn(error);
          });
      }
    } catch (error) {
      console.warn('Error while retrieving token from AsyncStorage:', error);
    }
  };

  function renderNotes({item, index}) {
    return (
      <View style={{marginHorizontal: 5, marginVertical: 5}}>
        <View
          style={{
            backgroundColor: itemColors[item.id],
            height: SIZES.windowHeight / 5,
            width: SIZES.windowWidth / 2.2,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity>
                <EvilIcons name="minus" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity>
                <EvilIcons name="plus" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 5}}>
              <TouchableOpacity onPress={() => console.log('Note Deleted')}>
                <Entypo name="cross" size={20} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{height: 1, backgroundColor: COLORS.white, marginTop: 5}}
          />
          <View style={{marginTop: 5}}>
            <Text style={{color: COLORS.white}}>{item.notes}</Text>
          </View>
        </View>
      </View>
    );
  }
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
              Sticky Notes
            </Text>
          </View>
          <View />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.65)',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            width: '25%',
            height: '6%',
            alignSelf: 'flex-end',
            marginTop: 20,
            marginRight: 20,
          }}
          onPress={() => setModalVisible(true)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#3884AB', '#2C8FE3']}
            style={{
              flex: 1,
              borderRadius: 100,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                paddingHorizontal: 7,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}>
                  Add Notes
                </Text>
              </View>

              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Entypo name="plus" size={10} color={COLORS.white} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {allNotes != null && (
          <View style={{alignItems: 'center', marginTop: 5}}>
            <FlatList
              contentContainerStyle={{paddingBottom: '20%'}}
              data={allNotes.data.records}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={renderNotes}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {loading === true && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          </View>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <View
            style={{
              height: SIZES.windowHeight / 4,
              width: SIZES.windowWidth / 1.2,
            }}>
            <View
              style={{
                backgroundColor: '#2D87BE',
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <TouchableOpacity>
                    <EvilIcons name="minus" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <EvilIcons name="plus" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: 5}}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Entypo name="cross" size={20} color={'red'} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{height: 1, backgroundColor: COLORS.white, marginTop: 5}}
              />
              <TextInput
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  marginBottom: 10,
                  color: COLORS.white,
                }}
                value={notesText}
                onChangeText={text => setNotesText(text)}
                multiline
                placeholder="Type your note here"
              />

              <TouchableOpacity
                style={{
                  backgroundColor: '#e91e63',
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={CreateNotes}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Save Note
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
