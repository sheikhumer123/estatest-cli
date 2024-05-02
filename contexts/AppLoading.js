import React, {useState, createContext} from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {hp} from '../dimensions/dimensions';
export const LoaderContext = createContext();
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const AppLoading = ({children}) => {
  const [loader, setLoader] = useState(false);
  const {lang} = useSelector(state => state.userReducer);
  const extrastyle = lang == 'he' ? {height: hp(10), width: hp(10)} : {};
  return (
    <LoaderContext.Provider
      value={{
        loader,
        setLoader,
      }}>
      <View>
        <Modal
          statusBarTranslucent={true}
          transparent={true}
          onRequestClose={() => null}
          visible={loader}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00000050',
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                ...extrastyle,
              }}>
              <ActivityIndicator size={35} color={'#3283e6'} />
              <Text
                style={{
                  fontSize: 16,
                  color: '#3283e6',
                  fontWeight: '500',
                  marginTop: hp(1),
                }}>
                {lang == 'en' ? 'Loading...' : 'טוען...'}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
      {children}
    </LoaderContext.Provider>
  );
};
export default AppLoading;
