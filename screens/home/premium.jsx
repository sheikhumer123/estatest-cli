import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LoaderContext} from '../../contexts/AppLoading';
import getStyles from './styles';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import TermsConditions from '../../components/termstext/TermsAndConditions';

export const PremiumBottomSheetContent = ({
  onClickGetPremium,
  onClose,
  premiumPrice,
  restorePurchase,
}) => {
  const {t} = useTranslation();
  const {lang, termsLinks} = useSelector(state => state.userReducer);
  const styles = getStyles(lang);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const {setLoader} = useContext(LoaderContext);

  console.log(termsLinks);

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
        <TouchableOpacity onPress={restorePurchase}>
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
            <Text style={{fontFamily: 'Assistant-Bold'}}>{premiumPrice}</Text>/
            <Text style={styles.only}>{t('premium.monthly')}</Text>
          </Text>
          <TouchableOpacity
            style={styles.submitButtonPremium}
            onPress={() => {
              setLoader(true);
              onClickGetPremium();
            }}>
            <Text style={styles.submitButtonTextPremiumScreen}>
              {t('premium.cta')}
            </Text>
          </TouchableOpacity>
          <TermsConditions />
          {/* <View style={styles.termsConditionContainer1}>
            <Text style={styles.termsConditions1}>
              {t('overAll.premiumTerms')}
              {lang == 'en' && (
                <Text
                  style={{fontFamily: 'Assistant-Bold'}}
                  onPress={() => handlePrivacy(termsLinks.policy)}>
                  {' '}
                  {t('overAll.privacy')}{' '}
                </Text>
              )}
              {lang == 'en' && <Text>{t('overAll.and')} </Text>}
              {lang == 'en' && (
                <Text
                  style={{fontFamily: 'Assistant-Bold'}}
                  onPress={() => handleTerms(termsLinks.terms)}>
                  {t('overAll.terms')}{' '}
                </Text>
              )}
            </Text>
            {lang == 'he' && (
              <View style={{flexDirection: 'row'}}>
                <Text>.Estatest </Text>
                <Text
                  onPress={() => handleTerms(termsLinks.terms)}
                  style={{fontFamily: 'Assistant-Bold'}}>
                  {t('overAll.terms')}
                </Text>
                <Text style={styles.termsConditions1}>{t('overAll.and')}</Text>
                <Text
                  onPress={() => handlePrivacy(termsLinks.policy)}
                  style={{fontFamily: 'Assistant-Bold'}}>
                  {t('overAll.policy')}
                </Text>
                <Text style={styles.termsConditions1}>
                  {t('overAll.consent')}
                </Text>
              </View>
            )}
          </View> */}
          {/* <View style={styles.termsConditionContainer1}>
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
                handleEULA(EULA);
              }}>
              <Text style={styles.termsConditions1}>{t('overAll.EULA')}</Text>
            </TouchableOpacity>
            <View style={styles.line1} />
            <TouchableOpacity
              onPress={() => {
                handleTerms(termsOfUse);
              }}>
              <Text style={styles.termsConditions1}>{t('overAll.terms')}</Text>
            </TouchableOpacity>
          </View> */}
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
