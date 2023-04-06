import {View, Image, FlatList, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS, IMAGE_URL} from '../../../../constants/theme';
import VehicleHeader from '../../../../components/VehicleHeader';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ViewAllImages({navigation, route}) {
  const {AllImages} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleImagePress = uri => {
    setSelectedImageUri(uri);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({item}) => {
    return (
      <View style={{paddingVertical: 10}}>
        <Image
          source={{uri: IMAGE_URL + item.name}}
          resizeMode="cover"
          style={{width: SIZES.windowWidth, height: 200}}
        />
        <TouchableOpacity
          style={{position: 'absolute', bottom: 20, right: 10}}
          onPress={() => handleImagePress(IMAGE_URL + item.name)}>
          <MaterialCommunity
            name="image-filter-center-focus"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: '15%'}}>
        <FlatList
          data={AllImages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <VehicleHeader
        HeaderTitle={'All Images'}
        GoBack={() => navigation.goBack()}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
          <TouchableOpacity
            onPress={toggleModal}
            style={{position: 'absolute', zIndex: 999, left: 10, top: 10}}>
            <Entypo name="cross" size={25} color="red" />
          </TouchableOpacity>
          {selectedImageUri != null && (
            <Image
              source={{uri: selectedImageUri}}
              resizeMode="contain"
              style={{flex: 1}}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
