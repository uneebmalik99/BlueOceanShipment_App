import {
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS, IMAGE_URL} from '../../../../constants/theme';
import VehicleHeader from '../../../../components/VehicleHeader';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ViewAllImages({navigation, route}) {
  const {AllImages} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [loadingStates, setLoadingStates] = useState(AllImages.map(() => true));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePress = (uri, index) => {
    setSelectedImageIndex(index);
    setSelectedImageUri(uri);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImageLoad = index => {
    setLoadingStates(prevState =>
      prevState.map((state, i) => (i === index ? false : state)),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{paddingVertical: 10}}>
        {loadingStates[index] && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'small'} color={COLORS.primary} />
          </View>
        )}
        <Image
          source={{uri: IMAGE_URL + item.name}}
          resizeMode="cover"
          onLoad={() => handleImageLoad(index)}
          onError={() => handleImageLoad(index)}
          style={{
            width: SIZES.windowWidth,
            height: !loadingStates[index] ? 200 : 0,
          }}
        />
        <TouchableOpacity
          style={{position: 'absolute', bottom: 20, right: 10}}
          onPress={() => handleImagePress(IMAGE_URL + item.name, index)}>
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
          {/* {selectedImageUri != null && ( */}
          <ImageViewer
            imageUrls={AllImages.map(item => ({url: IMAGE_URL + item.name}))}
            index={selectedImageIndex}
            enableSwipeDown={true}
            onSwipeDown={toggleModal}
            style={{flex: 1}}
          />
          {/* )} */}
        </View>
      </Modal>
    </View>
  );
}
