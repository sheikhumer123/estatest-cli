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

export default function UpdatePassword({ navigation }) {
  const { t } = useTranslation();
  // const { signInWithApple } = useAuth();
  const { setLoader } = useContext(LoaderContext);
  // Authentication: User creation.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const forgotFunction = () => {
    navigation.navigate('LoginUser');
  };
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
          <TextInputs
            value={password}
            simpleTxtInput
            placeholder={t("overAll.password")}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <TextInputs
            value={confirmPassword}
            simpleTxtInput
            placeholder={t("overAll.passAgain")}
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <Buttons
            mediumBtn
            innerTxt={t("overAll.updatePass")}
            marginTop={"7%"}
            onPress={forgotFunction}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
