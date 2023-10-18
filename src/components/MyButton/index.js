import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { fonts, windowWidth, } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils';

export default function MyButton({
  title,
  warna = colors.secondary,
  onPress,
  Icons,
  radius = 30,
  colorText = colors.white,
  fontWeight = 'normal',
  iconColor = colors.white,
  borderSize = 0,
  kiri = true,
  borderColor = colors.primary,
}) {
  return (
    <TouchableOpacity
      style={styles(warna, radius, borderSize, borderColor).btn}
      onPress={onPress}>
      {kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={windowWidth / 35} />}
      <Text
        style={{
          color: colorText,
          fontSize: windowWidth / 35,
          marginLeft: kiri ? 5 : 0,
          marginRight: !kiri ? 5 : 0,
          fontSize: windowWidth / 28,
          fontFamily: fonts.primary[600],
          // fontWeight: fontWeight,
        }}>
        {title}
      </Text>
      {!kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={windowWidth / 35} />}
    </TouchableOpacity>
  );
}

const styles = (warna, radius, borderSize, borderColor) =>
  StyleSheet.create({
    btn: {
      height: 50,
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: warna,
      borderWidth: borderSize,
      borderColor: borderColor,
      flexDirection: 'row',
    },
  });
