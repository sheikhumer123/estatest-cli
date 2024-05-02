import React from "react";
import { TextInput } from "react-native";
import {useSelector} from 'react-redux';
import styles from "./Style";
const TextInputs = (props) => {
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
    autoCapitalize,
    onClear,
    editable,
  } = props;
  return (
    <>
      {simpleTxtInput ? (
        <TextInput
          allowFontScaling={false}
          label={label}
          value={value}
          placeholderTextColor={"#404B52"}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={{ ...styles.txtInp,textAlign: lang == "he" ? "right": "left" }}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          keyboardType={keyboardType}
          editable={editable}
          onClear={onClear}
        />
      ) : null}
    </>
  );
};
export default TextInputs;
