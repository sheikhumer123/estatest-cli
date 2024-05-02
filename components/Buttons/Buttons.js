/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './Style';
import {useSelector} from 'react-redux';
function Buttons(props) {
  const {
    label,
    onPress,
    marginTop,
    imgSource,
    innerTxt,
    btnSocial,
    mediumBtn,
    smallBtn,
    homePremiumBtn,
    appleButton,
    disabled,
  } = props;
  const {lang} = useSelector(state => state.userReducer);
  return (
    <>
      {btnSocial ? (
        <TouchableOpacity
          style={{
            ...styles.btnWrap,
            flexDirection: lang === 'en' ? 'row-reverse' : 'row',
          }}
          onPress={onPress}>
          <Text style={styles.txtInnerTxt}>{innerTxt}</Text>
          <View style={styles.wrapImgSocial}>
            <Image
              style={styles.innerImg}
              resizeMode="contain"
              source={imgSource}
            />
          </View>
        </TouchableOpacity>
      ) : smallBtn ? (
        <TouchableOpacity
          style={{
            ...styles.btnSmallWrap,
            marginTop: marginTop,
          }}
          onPress={onPress}>
          <Text
            style={{
              ...styles.buttonText,
              color: 'white',
              right: 0,
              fontWeight: '600',
            }}>
            {innerTxt}
          </Text>
        </TouchableOpacity>
      ) : mediumBtn ? (
        <TouchableOpacity
          disabled={disabled}
          style={{
            ...styles.btnMediumWrap,
            marginTop: marginTop,
            backgroundColor: '#000000',
            opacity: disabled ? 0.5 : 1,
          }}
          onPress={onPress}>
          <Text
            style={{
              ...styles.txtInnerTxt,
              color: 'white',
              right: 0,
              fontWeight: '600',
            }}>
            {innerTxt}
          </Text>
        </TouchableOpacity>
      ) : homePremiumBtn ? (
        <TouchableOpacity
          style={{
            ...styles.HomePremiumButton,
            marginTop: marginTop,
          }}
          onPress={onPress}>
          <Text
            style={{
              ...styles.buttonTextHomePremium,
              color: 'white',
              right: 0,
              fontWeight: '600',
            }}>
            {innerTxt}
          </Text>
        </TouchableOpacity>
      ) : appleButton ? (
        <TouchableOpacity
          style={{
            ...styles.appleWrap,
          }}
          onPress={onPress}>
          <View
            style={{
              flexDirection: lang === 'en' ? 'row' : 'row-reverse',
              alignItems: 'center',
            }}>
            <View style={styles.appleWrapSocialImage}>
              <Image
                style={styles.innerImg}
                resizeMode="contain"
                source={imgSource}
              />
            </View>
            <Text style={styles.appleTxtInnerTxt}>{innerTxt}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
}
export default Buttons;
