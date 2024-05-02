import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {LoaderContext} from './AppLoading';
import {otherLogin} from '../api/newApis';
import {getUserDetails} from '../api/newApisToken';
import {useTranslation} from 'react-i18next';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [notifyScreen, setNotifyScreen] = useState(false);
  const [user, setUser] = useState(null);
  // const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '285876470073-5l5a01vkeu8ru52h066ivsdom2c1s84j.apps.googleusercontent.com',
    });
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    loadUser();
  }, []);

  const signInWithApple = async (navigation, title, description) => {
    const checkContact = await AsyncStorage.getItem('isFirstContact');
    const checkPoint = Number(checkContact);
    if (Platform.OS === 'android') {
      Alert.alert(t('overAll.intoProblem'), t('overAll.onlyForAndroid'));
      return;
    } else {
      try {
        setLoader(true);
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        const {identityToken, nonce} = appleAuthRequestResponse;
        if (identityToken) {
          const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce,
          );
          const userCredential = await auth().signInWithCredential(
            appleCredential,
          );
          const data = {
            name: userCredential?.user?.displayName || '',
            email: userCredential?.user?.email,
            picture: userCredential?.user?.photoURL || '',
          };

          const response = await otherLogin(data, setLoader);
          if (response) {
            await AsyncStorage.setItem('token', response?.token);
          }
          const user = JSON.stringify(data);
          const userInfo2 = await getUserDetails();
          if (userInfo2?.name && userInfo2?.city && userInfo2?.phone) {
            if (!userInfo2?.verified) {
              const data = {
                uid: userInfo2?.uid,
                name: userInfo2?.email,
                user: user,
              };
              Alert.alert(
                `${t('overAll.notifyTitle')}`,
                `${t('overAll.confirmNotify')}`,
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('OTPScreen', {data: data}),
                  },
                ],
              );
              setLoader(false);
              return;
            }
            await AsyncStorage.setItem('user', user);
            setLoader(false);
            let checking = JSON.stringify(checkPoint + 1);
            await AsyncStorage.setItem('isFirstContact', checking);
            navigation.replace('MainStack');
          } else {
            const data2 = {
              name: userCredential?.user?.displayName || userInfo2?.name,
              email: userCredential?.user?.email,
              image: userCredential?.user?.photoURL,
              uid: userInfo2?.uid,
              verified: userInfo2?.verified,
              phone: userInfo2?.phone,
              city: userInfo2?.city,
            };
            navigation.navigate('Contact Details', {
              contactData: data2,
            });

            setLoader(false);
          }
        } else {
          console.log('Error, something went wrong...');
        }
      } catch (e) {
        setLoader(false);
        console.log('-----------', e);
      }
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithApple,
        signOut,
        setNotifyScreen,
        notifyScreen,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

//   try {
//     const nonce = Math.random().toString(36).substring(2, 10);
//     const hashedNonce = await Crypto.digestStringAsync(
//       Crypto.CryptoDigestAlgorithm.SHA256,
//       nonce,
//     );

//     const appleCredential = await AppleAuthentication.signInAsync({
//       requestedScopes: [
//         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//         AppleAuthentication.AppleAuthenticationScope.EMAIL,
//       ],
//       nonce: hashedNonce,
//     });

//     const auth = getAuth(FbApp);

//     const user = {
//       id: appleCredential.user,
//       email: appleCredential.email,
//       token: appleCredential.identityToken,
//     };

//     const provider = new OAuthProvider('apple.com');
//     provider.addScope('email');

//     const credential = provider.credential({
//       idToken: user.token,
//       rawNonce: nonce,
//     });
//     const result = await signInWithCredential(auth, credential);
//     const token = result._tokenResponse.idToken;
//     console.log(result._tokenResponse);

//     await AsyncStorage.setItem('user', JSON.stringify(user));
//     await AsyncStorage.setItem('token', token);

//     setUser(user);
//   } catch (e) {
//     console.log(e);
//   }
// };
