import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './Style';
import {hp} from '../../dimensions/dimensions';

const TextInputs = props => {
  const {lang} = useSelector(state => state.userReducer);
  const {
    simpleTxtInput,
    label,
    value,
    onChangeText,
    secureTextEntry,
    placeholder,
    maxLength,
    keyboardType,
    onClear,
    editable,
    required,
    showError,
    error,
    onBlurFunction,
  } = props;

  const showCustomPlaceholder = value.length < 1;

  const textStyle = lang == 'he' ? {right: 15} : {left: 15};

  return (
    <>
      {simpleTxtInput ? (
        <>
          <View
            style={{
              marginTop: hp(3),
              position: 'relative',
              justifyContent: 'center',
            }}>
            <TextInput
              autoCapitalize="none"
              allowFontScaling={false}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              onBlur={onBlurFunction}
              placeholderTextColor="#404B52"
              style={{
                ...styles.txtInp,
                textAlign: lang === 'he' ? 'right' : 'left',
              }}
              maxLength={maxLength}
              placeholder={!required ? placeholder : ''}
              autoCorrect={false}
              keyboardType={keyboardType}
              editable={editable}
            />
            {showCustomPlaceholder && required && (
              <View
                style={[
                  textStyle,
                  {
                    position: 'absolute',
                    color: 'gray',
                    fontSize: 16,
                    pointerEvents: 'none',
                  },
                ]}>
                <Text style={{color: 'black'}}>
                  {placeholder}
                  <Text style={{color: 'red', fontFamily: 'Assistant-Bold'}}>
                    {' '}
                    *
                  </Text>
                </Text>
              </View>
            )}
          </View>
          {showError && (
            <Text
              style={[
                {
                  color: 'red',
                  marginTop: 5,
                  right: 0,
                  textAlign: lang == 'he' ? 'right' : 'left',
                },
              ]}>
              {error}
            </Text>
          )}
        </>
      ) : null}
    </>
  );
};

export default TextInputs;
