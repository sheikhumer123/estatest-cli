import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import PremiumAcceptModal from '../../components/premiumAcceptModal/PremiumAcceptModal';
import {
  handleEULA,
  handlePrivacy,
  handleTerms,
} from '../../utils/DefaultMethods';
import {EULA, privacyPolicy, termsOfUse} from '../../utils/defaultURLs';
import getStyles from './styles';
import TermsConditions from '../../components/termstext/TermsAndConditions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const price = '39.90';
export const PremiumModal = ({
  premiumModalVisible,
  setPremiumModalVisible,
  onClickGetPremium,
  loading,
  premiumPrice,
  restorePurchase,
}) => {
  const {t} = useTranslation();
  const {lang} = useSelector(state => state.userReducer);

  const styles = getStyles(lang);

  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const openModalFunc = () => {
    setOpenAcceptModal(true);
  };

  const onConfirm = () => {
    onClickGetPremium();
  };

  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={premiumModalVisible}
        statusBarTranslucent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Upper view complete */}
            <TouchableOpacity
              style={styles.exitContainer}
              onPress={() => setPremiumModalVisible(false)}>
              <Text style={styles.exit}>{t('overAll.exit')}</Text>
            </TouchableOpacity>
            <View style={styles.upperView1}>
              <Text style={styles.trialText}>{t('overAll.trialTest')}</Text>
            </View>
            {/* Image complete */}
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
                      key: t('premium.tagline2'),
                      image: require('../../assets/images/pen.png'),
                    },
                    {
                      key: t('premium.tagline3'),
                      image: require('../../assets/images/calculator.png'),
                    },
                    {
                      key: t('premium.tagline1'),
                      image: require('../../assets/images/clock.png'),
                    },
                    {
                      key: t('premium.tagline4'),
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
                  <Text style={styles.only}>{t('premium.only')} </Text>
                  <Text style={{fontFamily: 'Assistant-Bold'}}>
                    {premiumPrice}
                  </Text>
                  {/* <Text style={{fontFamily: 'Assistant-Bold'}}>
                    {t('premium.nis')}
                  </Text> */}
                  /<Text style={styles.only}>{t('premium.monthly')}</Text>
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
            <PremiumAcceptModal
              modalVisible={openAcceptModal}
              setModalVisible={openModalFunc}
              onCancel={() => setOpenAcceptModal(false)}
              onConfirm={onConfirm}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
