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
} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {RFS, hp} from '../../dimensions/dimensions';
import {
  examDates,
  examRegistration,
  privacyPolicy,
  termsOfUse,
} from '../../utils/defaultURLs';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import {useLanguage} from '../../contexts/LanguageContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const flag = require('../../assets/images/flag.png');
const engFlag = require('../../assets/images/english.jpg');
export default Drawer = ({toggleOpen, navigation, name, userDetails}) => {
  const insets = useSafeAreaInsets();
  const bottomBar = insets.top;

  const {t} = useTranslation();
  const {language, onChangeLanguage} = useLanguage();

  return (
    <View
      onPress={toggleOpen}
      style={[styles.animatedBox, {height: hp(100) + bottomBar}]}>
      {/* SideNavImage */}
      <ImageBackground
        source={require('../../assets/images/backgrounds/menuwave.png')}
        style={{flex: 0.45}}>
        <View style={styles.menuContainer}></View>
      </ImageBackground>
      <View style={{opacity: 0.2}}></View>
      {/* SideNavContentView */}
      <View
        style={{
          height: '70%',
          width: '100%',
          position: 'absolute',
          bottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        {/* ContentViewTOP */}

        <View>
          <Text style={styles.menuText}>
            {name === null || name === undefined
              ? t('home.hello') + '!'
              : t('home.hello') + ' ' + `${name}!`}
          </Text>
          <View style={styles.flagContainer}>
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
        {/* ContentViewTOP */}

        {/* SideNavCenterSection */}

        <View style={styles.menuItems}>
          <FlatList
            scrollEnabled={false}
            data={[
              {
                key: t('sidebar.examDates'),
                icon: require('../../assets/images/calendar.png'),
                onPress: () => {
                  Linking.openURL(examDates);
                },
              },
              {
                key: t('sidebar.registration'),
                icon: require('../../assets/images/link.png'),
                onPress: () => {
                  Linking.openURL(examRegistration);
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

        {/* SideNavCenterSection */}

        {/* SideNavBottomSection */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                handlePrivacy(privacyPolicy);
              }}>
              <Text style={styles.termsConditions}>{t('overAll.privacy')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                handleTerms(termsOfUse);
              }}>
              <Text style={styles.termsConditions}>{t('overAll.terms')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* SideNavBottomSection */}
      </View>
    </View>
  );
};
