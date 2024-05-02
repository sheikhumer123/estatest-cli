import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

export const uploadMultipleImages = async uriArray => {
  const imagesUrlPromises = uriArray.map(async uri => {
    const match = uri?.path.match(/\/([^/]+)\.(jpg|jpeg|png)$/i);
    const fileName = Platform.select({
      ios: uri?.filename,
      android: match[1],
    });
    const ref = storage().ref('UserImages').child(fileName);
    await ref.putFile(uri?.path);
    return ref.getDownloadURL();
  });
  try {
    const imagesUrl = await Promise.all(imagesUrlPromises);
    return imagesUrl;
  } catch (error) {
    console.error('Error uploading images:', error);
    return [];
  }
};
