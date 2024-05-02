import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Linking,
  Image,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import getStyles from './styles';
import {RFS, hp, iosPAD, isPAD, wp} from '../../dimensions/dimensions';
import {
  EULA,
  examDates,
  examRegistration,
  privacyPolicy,
  termsOfUse,
} from '../../utils/defaultURLs';
import {
  handleEULA,
  handlePrivacy,
  handleTerms,
  openWhatsapp,
} from '../../utils/DefaultMethods';
import {useLanguage} from '../../contexts/LanguageContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const flag = require('../../assets/images/flag.png');
const whtsapp = require('../../assets/images/whatsapp.png');
const engFlag = require('../../assets/images/english.jpg');
export default Drawer = ({toggleOpen, navigation, name, userDetails}) => {
  const insets = useSafeAreaInsets();
  const bottomBar = insets.top;
  const {termsLinks, examlinks} = useSelector(state => state.userReducer);
  const {t} = useTranslation();
  const styles = getStyles();
  const {language, onChangeLanguage} = useLanguage();

  const topstyle = {
    height: hp(100),
  };

  const androidStyle = {
    height: hp(100) + bottomBar,
  };

  return (
    <>
      <View
        style={[
          styles.animatedBox,
          Platform.OS == 'ios' ? topstyle : androidStyle,
        ]}>
        <View style={{flex: 0.45}}>
          <ImageBackground
            source={require('../../assets/images/backgrounds/menuwave.png')}
            style={{height: '100%'}}
            {...(isPAD && {resizeMode: 'stretch'})}></ImageBackground>

          <Text
            style={[
              styles.menuText,
              {position: 'absolute', bottom: iosPAD ? hp(12) : hp(7), right: 0},
            ]}>
            {name === null || name === undefined
              ? t('home.hello') + '!'
              : t('home.hello') + ' ' + `${name}!`}
          </Text>
          <View
            style={[
              styles.flagContainer,
              {
                position: 'absolute',
                bottom: iosPAD ? hp(8) : hp(4),
                right: wp(5),
              },
            ]}>
            <Text style={styles.valueText}>
              {language === 'en' ? t('overAll.english') : t('overAll.hebrew')}
            </Text>
            <Image
              source={language === 'en' ? engFlag : flag}
              style={styles.flagImage}
              resizeMode="cover"
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.55,
            position: 'relative',
            justifyContent: 'space-between',
          }}>
          <View style={styles.menuItems}>
            <FlatList
              scrollEnabled={false}
              data={[
                {
                  key: t('sidebar.examDates'),
                  icon: require('../../assets/images/calendar.png'),
                  onPress: () => {
                    Linking.openURL(examlinks.examDate);
                  },
                },
                {
                  key: t('sidebar.registration'),
                  icon: require('../../assets/images/link.png'),
                  onPress: () => {
                    Linking.openURL(examlinks.examRegisteration);
                  },
                },
                {
                  key: t('sidebar.appSettings'),
                  icon: require('../../assets/images/settings.png'),
                  onPress: () => {
                    navigation.navigate('Settings', {contactData: userDetails});
                  },
                },
              ]}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={[styles.premiumFeatureList, {marginBottom: hp(2)}]}
                      onPress={item.onPress}>
                      <View style={styles.imageStyle}>
                        <Image
                          source={item?.icon}
                          style={styles.innerImg}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.txtKey}>{item.key}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <View
              style={{
                marginBottom: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: 'Assistant-Light', color: 'black'}}>
                {t('overAll.encouter')}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={whtsapp}
                  resizeMode="contain"
                  style={{height: hp(2), width: hp(2)}}
                />
                <TouchableOpacity onPress={openWhatsapp}>
                  <Text
                    style={{fontFamily: 'Assistant-SemiBold', color: 'black'}}>
                    {t('overAll.talktoUs')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: hp(4),
              }}>
              <TouchableOpacity
                onPress={() => {
                  handlePrivacy(termsLinks.policy);
                }}>
                <Text style={styles.termsConditions}>
                  {t('overAll.privacy')}
                </Text>
              </TouchableOpacity>
              <View style={styles.line1} />
              <TouchableOpacity
                onPress={() => {
                  handleEULA(termsLinks.eula);
                }}>
                <Text style={styles.termsConditions}>{t('overAll.EULA')}</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  handleTerms(termsLinks.terms);
                }}>
                <Text style={styles.termsConditions}>{t('overAll.terms')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
