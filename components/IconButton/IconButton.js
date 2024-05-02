import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import style from './styles';

//imports

import doubleTick from '../../assets/images/doubleTick.png';
import btnArrow from '../../assets/images/btnArrow.png';

export const IconButton = ({text, tick, arrow, icon, onPress, disabled}) => {
  return (
    <>
      <View style={style.buttonWrapper}>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[
            style.buttonContainer,
            {backgroundColor: disabled ? 'lightblue' : '#2FA5EB'},
          ]}>
          {icon && (
            <View style={style.icon}>
              <Image
                style={style.img}
                resizeMode="contain"
                source={tick ? doubleTick : arrow ? btnArrow : ''}
              />
            </View>
          )}
          <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
