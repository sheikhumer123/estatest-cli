import {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {wp} from '../../dimensions/dimensions';
import premiumTextImage from '../../assets/images/premiumPage.png';
import {useSelector} from 'react-redux';
import PremiumAcceptModal from '../../components/premiumAcceptModal/PremiumAcceptModal';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import {privacyPolicy, termsOfUse} from '../../utils/defaultURLs';

const price = '39.90';
export const PremiumBottomSheetContent = ({onClickGetPremium, onClose}) => {
  const {t} = useTranslation();
  const {lang} = useSelector(state => state.userReducer);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const openModalFunc = () => {
    setOpenAcceptModal(true);
  };
  const onConfirm = () => {
    setOpenAcceptModal(false);
    onClickGetPremium();
  };

  return (
    <ScrollView style={{flex: 1.1}}>
      {/* Top buttons container */}
      <View style={styles.upperView}>
        <TouchableOpacity>
          <Text style={styles.upperText}>{t('overAll.purchase')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.upperText}>{t('pages.back')}</Text>
        </TouchableOpacity>
      </View>
      {/* Main image */}
      <Image
        source={require('../../assets/images/premium.png')}
        style={styles.premiumBanner1}
      />
      <Text style={styles.testInHand}>{t('overAll.testInHand')}</Text>
      {/* FlatList in image background Container */}
      <ImageBackground source={require('../../assets/images/houseBg.png')}>
        <View style={styles.flatlistContainerFourPoints}>
          <FlatList
            data={[
              {
                key: t('premium.tagline1'),
                image: require('../../assets/images/clock.png'),
              },
              {
                key: t('premium.tagline2'),
                image: require('../../assets/images/pen.png'),
              },
              {
                key: t('premium.tagline3'),
                image: require('../../assets/images/calculator.png'),
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
                  <Text style={styles.taglineText}>{item.key}</Text>
                </View>
              );
            }}
          />
        </View>
        <View>
          <Text style={styles.dream}>{t('overAll.dream')}</Text>
          <Text style={styles.monthlyAmount}>
            <Text style={styles.only}>{t('premium.only')} </Text>
            <Text style={{fontFamily: 'Assistant-Bold'}}>{price}</Text>
            <Text style={{fontFamily: 'Assistant-Bold'}}>
              {t('premium.nis')}
            </Text>
            /<Text style={styles.only}>{t('premium.monthly')}</Text>
          </Text>
          <TouchableOpacity
            style={styles.submitButtonPremium}
            onPress={onClickGetPremium}>
            <Text style={styles.submitButtonTextPremiumScreen}>
              {t('premium.cta')}
            </Text>
          </TouchableOpacity>
          <View style={styles.termsConditionContainer1}>
            <TouchableOpacity
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
                handleTerms(termsOfUse);
              }}>
              <Text style={styles.termsConditions1}>{t('overAll.terms')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* <PremiumAcceptModal
        modalVisible={openAcceptModal}
        setModalVisible={openModalFunc}
        onCancel={() => setOpenAcceptModal(false)}
        onConfirm={onConfirm}
      /> */}
    </ScrollView>
  );
};
