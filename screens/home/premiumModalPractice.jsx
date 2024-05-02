import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TermsConditions from '../../components/termstext/TermsAndConditions';
import {LoaderContext} from '../../contexts/AppLoading';
import getStyles from './styles';
import {useSelector} from 'react-redux';

export const PremiumModalPractice = ({
  premiumModalVisible,
  setPremiumModalVisiblePractice,
  onClickGetPremium,
  loading,
  premiumPrice,
  restorePurchase,
}) => {
  const {t} = useTranslation();
  const {setLoader} = useContext(LoaderContext);
  const {lang} = useSelector(state => state.userReducer);

  const styles = getStyles(lang);

  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={premiumModalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setPremiumModalVisiblePractice(!premiumModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.exitContainer}
              onPress={() =>
                setPremiumModalVisiblePractice(!premiumModalVisible)
              }>
              <Text style={styles.exit}>{t('overAll.exit')}</Text>
            </TouchableOpacity>
            <View style={styles.upperView1}>
              <Text style={styles.trialText}>
                {t('overAll.trialTestPractice')}
              </Text>
            </View>

            <Image
              source={require('../../assets/images/firstQuiz.png')}
              style={styles.firstQuiz}
            />
            <ImageBackground
              source={require('../../assets/images/houseBg.png')}
              style={styles.modalBgWrap}>
              <Text style={styles.whyJoin}>{t('overAll.whyJoin')}</Text>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={[
                    {
                      key: t('premium.tagline1practice'),
                      image: require('../../assets/images/calculator.png'),
                    },
                    {
                      key: t('premium.tagline2practice'),
                      image: require('../../assets/images/pen.png'),
                    },
                    {
                      key: t('premium.tagline3practice'),
                      image: require('../../assets/images/clock.png'),
                    },
                    {
                      key: t('premium.tagline4practice'),
                      image: require('../../assets/images/graph.png'),
                    },
                  ]}
                  scrollEnabled={false}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.premiumFeatureList}>
                        <Image source={item.image} style={styles.flatImage} />
                        <Text style={styles.taglineText1}>{item.key}</Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View>
                <Text style={styles.monthlyAmount}>
                  <Text style={styles.only}>{t('premium.only')}</Text>
                  <Text style={{fontWeight: 'bold'}}> {premiumPrice}</Text>/
                  <Text style={styles.only}>{t('premium.monthly')}</Text>
                </Text>
                <TouchableOpacity
                  style={styles.submitButton1}
                  onPress={() => {
                    onClickGetPremium();
                  }}>
                  <Text style={styles.submitButtonText1}>
                    {Platform.OS == 'android'
                      ? t('premium.cta')
                      : !loading && t('premium.cta')}
                  </Text>
                  <ActivityIndicator
                    animating={Platform.OS == 'ios' ? loading : false}
                    style={[
                      styles.submitButtonText1,
                      {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                    ]}
                    color={'white'}
                  />
                </TouchableOpacity>
                <TermsConditions modal />
                <View>
                  {/* <Text style={styles.termsConditions1}>
                    {t('overAll.premiumTerms')}
                  </Text> */}
                  {/* <TouchableOpacity
                    onPress={() => {
                      handlePrivacy(privacyPolicy);
                    }}>
                    <Text style={styles.termsConditions1}>
                      {t('overAll.privacy')}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.line1} />
                  <TouchableOpacity
                    onPress={() => {
                      handleEULA(EULA);
                    }}>
                    <Text style={styles.termsConditions1}>
                      {t('overAll.EULA')}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.line1} />
                  <TouchableOpacity
                    onPress={() => {
                      handleTerms(termsOfUse);
                    }}>
                    <Text style={styles.termsConditions1}>
                      {t('overAll.terms')}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </Modal>
    </View>
  );
};
