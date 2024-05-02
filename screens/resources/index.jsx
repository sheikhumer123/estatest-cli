import {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import Pdf from 'react-native-pdf';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CenteredButton from '../../components/CenteredButton';
import styles from './styles';

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
  const [isLoading, setIsLoading] = useState(true);
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
  const disableLoader = () => {
    setIsLoading(false);
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
          handleIndicatorStyle={styles.indicatorStyle}
          enableContentPanningGesture={false}>
          {Platform.OS == 'ios' ? (
            <View
              style={{
                flex: 1,
              }}>
              {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

              <WebView
                onLoad={disableLoader}
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
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{flex: 1}}>
              <Pdf
                trustAllCerts={false}
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                }}
                source={{
                  uri: selected,
                }}
                onLoadComplete={(numberOfPages, filePath) => {}}
                onPageChanged={(page, numberOfPages) => {}}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
              />
            </ScrollView>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}
