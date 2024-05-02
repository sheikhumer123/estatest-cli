import React, { useContext, useState } from "react";
// import * as AppleAuthentication from "expo-apple-authentication";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import AntDesign from "react-native-vector-icons/AntDesign";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LoaderContext } from "../../contexts/AppLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputs from "../../components/TextInputs/TextInputs";
import Buttons from "../../components/Buttons/Buttons";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 4;

export default function ForgotPasswordCode({ navigation }) {
  const { t } = useTranslation();
  // const { signInWithApple } = useAuth();
  const { setLoader } = useContext(LoaderContext);
  // Authentication: User creation.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const forgotFunction = () => {
    navigation.navigate('UpdatePassword');
  };
  // code fields
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.widthWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "flex-end" }}
          >
            <AntDesign name="arrowright" size={26} color={"black"} />
          </TouchableOpacity>
          <Text style={styles.txtConnect}>{t("overAll.forgotPassword")}</Text>
          {/* code fields */}
          <View style={{width:'90%', alignSelf: 'center'}}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          {/* Button */}
          <Buttons
            mediumBtn
            innerTxt={t("overAll.passwordReset")}
            marginTop={"7%"}
            onPress={forgotFunction}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
