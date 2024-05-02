import {PermissionsAndroid, Alert, Linking, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
// Location Permission

// Camera Permission
export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      else {
        console.log('asdasdasx');
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      else {
        Alert.alert(
          t('overAll.storageAccess'),
          t('overAll.storageAccessLong'),
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};
