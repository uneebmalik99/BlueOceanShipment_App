import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const COLORS = {
  // base colors
  primary: '#1B7ADE', // blue
  secondary: '#CDCDD2', // gray

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',

  // dashboard colors
  pickedup: '#CADCF3',
  ontheway: '#E9C9CA',
  onhand: '#C8DFE6',
  manifest: '#88ADD1',
  shipped: '#F6D9B8',
  arrived: '#CEBFED',
  container: '#EFCDCD',
  accounting: '#82D1E4',

  //drawer colors
  draweritems: '#1E8AE1',

  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  transparent: 'transparent',
  darkgray: '#898C95',

  //button gradients
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  windowWidth,
  windowHeight,
};

export const TEXT = {
  title: 'Blue Ocean Shipping',
};

// export const FONTS = {
//     largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
//     h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
//     h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
//     h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
//     h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
//     body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
//     body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
//     body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
//     body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
//     body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
// };

// const appTheme = {COLORS, SIZES, FONTS};

export const SVGBackground = `<svg viewBox="0 0 430 173" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="386" cy="65" r="108" fill="#85B4EB" fill-opacity="0.32"/>
<circle cx="409" cy="65" r="76" fill="#85B4EB" fill-opacity="0.32"/>
<circle cx="-13.5" cy="42.5" r="70.5" fill="#85B4EB" fill-opacity="0.32"/>
</svg>`;

export const SVGVehicle = `<svg width="311" height="655" viewBox="0 0 311 655" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="-12.5" cy="327.5" rx="321.5" ry="327.5" fill="#85B4EB" fill-opacity="0.19"/>
<circle cx="258.5" cy="504.5" r="52.5" fill="#BDDAFB" fill-opacity="0.46"/>
</svg>`;

var asset_url = 'https://app.ecsapshipping.com/public/';
export const IMAGE_URL = asset_url;

export default {COLORS, SIZES, TEXT, SVGBackground, SVGVehicle, IMAGE_URL};
