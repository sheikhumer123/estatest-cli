import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import getStyles from './styles';
const price = '39.90';
export const StartExamBottomSheetContent = ({
  onClickButton,
  onPressClose,
  setExamRemainder,
}) => {
  const remainderExam = async () => {
    setExamRemainder('true');
    await AsyncStorage.setItem('examRemember', 'true');
    onClickButton();
  };
  const {t} = useTranslation();
  const styles = getStyles();
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <TouchableOpacity onPress={onPressClose} style={styles.exitButton}>
          <Text style={styles.exitText}>{t('overAll.exit')}</Text>
        </TouchableOpacity>

        <View>
          <Image
            source={require('../../assets/images/premium.png')}
            style={styles.premiumBanner}
          />
          <Text style={styles.testInHand}>{t('overAll.testInHand')}</Text>
          <ImageBackground
            source={require('../../assets/images/houseBg.png')}
            resizeMode="contain">
            <View style={styles.threeText}>
              <Text style={styles.brokerTest}>{t('overAll.brokerTest')}</Text>
              <Text style={styles.normalText1}>
                {t('overAll.firstInstruction')}
              </Text>
              <Text style={styles.normalText2}>
                {t('overAll.secondInstruction')}
              </Text>
              <Text style={styles.normalText3}>
                {t('overAll.thirdInstruction')}
              </Text>
            </View>
            {/* Button */}
            <View>
              <TouchableOpacity
                style={styles.quizStartButton}
                onPress={() => {
                  // Close Rb Sheets button to check functionality, modify it afterwards.
                  onClickButton();
                }}>
                <Text style={styles.submitButtonText}>
                  {t('overAll.startTest')}
                </Text>
              </TouchableOpacity>
              <Text onPress={remainderExam} style={styles.startShow}>
                {t('overAll.startShow')}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </>
  );
};
