import {useRef, useState} from 'react';
import {
  Platform,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
// import PDFView from 'react-native-pdf-lib';
import CenteredButton from '../../components/CenteredButton';
import styles from './styles';
import {hp} from '../../dimensions/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Pdf from 'react-native-pdf';

export default function Resources({isInExam, navigation}) {
  const {t} = useTranslation();
  const exam1 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part1.pdf';
  const exam2 =
    'https://www.gov.il/BlobFolder/generalpage/studymaterial/he/part2.pdf';

  const source = {
    uri: selected,
    cache: true,
  };
  const [selected, setSelected] = useState(isInExam ? exam1 : '');
  const resourceRef = useRef(null);
  const resourceSnapPoints = ['89%'];
  // Handle Exam Preparation Book
  const handlePartOnePress = () => {
    setSelected(exam1);
    resourceRef.current.present();
  };
  const handlePartTwoPress = () => {
    setSelected(exam2);
    resourceRef.current.present();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/houseBg.png')}
        style={styles.bgWrap}
        resizeMode="contain">
        <View style={styles.widthWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrow}>
            <AntDesign name="arrowright" size={26} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <CenteredButton
            title={t('overAll.partOne')}
            onPress={handlePartOnePress}
          />
          <CenteredButton
            title={t('overAll.partTwo')}
            onPress={handlePartTwoPress}
          />
        </View>
      </ImageBackground>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={resourceRef}
          index={0}
          snapPoints={resourceSnapPoints}
          enablePanDownToClose={true}
          style={styles.bottomSheetModal}
          backgroundStyle={styles.border}
          handleIndicatorStyle={styles.indicatorStyle}>
          {Platform.OS == 'ios' ? (
            <View style={{flex: 1}}>
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                useWebKit={true}
                style={{flex: 1}}
                nestedScrollEnabled={true}
                source={{
                  uri: selected,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Pdf
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                }}
                source={{
                  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
              />
            </View>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}
