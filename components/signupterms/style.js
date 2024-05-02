import {Platform, StyleSheet, StatusBar} from 'react-native';
import {wp, hp, RFS, isPAD, iosPAD} from '../../dimensions/dimensions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
const height = StatusBar.currentHeight;
export const styles = lang =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    bgWrap: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    wrap2: {
      marginTop: hp(3),
    },
    settings: {
      top: isPAD ? hp(2) : hp(0),
      right: isPAD ? wp(3) : wp(5),
      alignSelf: 'flex-end',
      zIndex: 999,
      marginTop: hp(1),
    },
    wrapIconImg: {
      width: iosPAD ? wp(7) : wp(10),
      height: iosPAD ? hp(7) : wp(10),
    },
    innerImg: {
      width: '100%',
      height: '100%',
    },
    hello: {
      fontSize: iosPAD ? RFS(30) : RFS(28),
      textAlign: 'center',
      color: '#2FA2EB',
      fontFamily: 'Assistant-Bold',
      marginTop: iosPAD ? hp(0) : hp(2),
    },
    ready: {
      fontSize: RFS(20),
      textAlign: 'center',
      color: '#83C1E5',
      fontFamily: 'GveretLevinAlefAlefAlef-Regular',
      fontStyle: 'italic',
      marginTop: hp(0),
    },
    readyImg: {
      height: hp(5),
      width: wp(15),
      alignSelf: 'center',
    },
    separator: {
      marginTop: hp(1),
      height: 2,
      backgroundColor: '#DEE6ED',
    },
    exitButton: {
      alignSelf: 'flex-end',
      paddingRight: wp(5),
      position: 'absolute',
      top: 0,
      zIndex: 99,
    },
    exitText: {
      fontSize: moderateScale(13),
      // fontWeight: '700',
      color: '#CA3839',
      fontFamily: 'Assistant',
    },
    exitContainer: {
      alignSelf: 'flex-end',
      paddingTop: hp(2),
      paddingRight: wp(5),
    },
    exit: {
      fontSize: RFS(12),
      fontWeight: '500',
      color: '#CA3839',
      fontFamily: 'Assistant-Bold',
    },
    testInHand: {
      fontSize: moderateScale(10),
      // fontWeight: '500',
      color: '#155B96',
      fontFamily: 'Assistant-Bold',
      textAlign: 'center',
      marginTop: hp(-1),
    },
    threeText: {
      paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2),
      paddingHorizontal: 20,
      alignSelf: 'center',
    },
    brokerTest: {
      fontSize: iosPAD ? moderateScale(28) : moderateScale(24),
      fontWeight: '400',
      color: '#155B96',
      fontFamily: 'GveretLevin-Regular',
      textAlign: 'center',
      marginBottom: Platform.OS === 'ios' ? hp(2) : hp(2),
      marginTop: hp(2),
    },
    normalText1: {
      fontSize: iosPAD
        ? moderateScale(15)
        : Platform.OS === 'android'
        ? moderateScale(15)
        : moderateScale(14),
      fontWeight: '400',
      color: '#155B96',
      fontFamily: 'Assistant-Bold',
      textAlign: 'center',
      marginBottom: hp(1),
      marginTop: hp(0),
    },
    normalText2: {
      fontSize: iosPAD
        ? moderateScale(15)
        : Platform.OS === 'android'
        ? moderateScale(15)
        : moderateScale(14),
      fontWeight: '400',
      color: '#155B96',
      fontFamily: 'Assistant-Bold',
      textAlign: 'center',
      marginBottom: hp(1),
      marginTop: hp(2),
    },
    normalText3: {
      fontSize: iosPAD
        ? moderateScale(15)
        : Platform.OS === 'android'
        ? moderateScale(12)
        : moderateScale(14),
      fontWeight: '400',
      color: '#155B96',
      fontFamily: 'Assistant-Bold',
      textAlign: 'center',
      marginBottom: wp(1),
      marginTop: hp(1),
    },
    premiumBanner: {
      width: iosPAD ? scale(160) : scale(140),
      alignSelf: 'center',
      height: iosPAD ? verticalScale(180) : verticalScale(150),
      resizeMode: 'contain',
      marginBottom: 5,
      marginTop: hp(5),
    },
    premiumBanner1: {
      width: isPAD ? wp(70) : wp(100),
      alignSelf: 'center',
      height: isPAD ? hp(35) : lang == 'he' ? hp(37) : hp(30),
      resizeMode: 'contain',
      marginBottom: 5,
    },
    premiumContentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButton: {
      borderRadius: 100,
      paddingHorizontal: wp(0),
      marginTop: hp(1),
      backgroundColor: '#3291EA',
      alignSelf: 'center',
      width: '70%',
    },
    submitButtonPremium: {
      borderRadius: 100,
      marginTop: hp(1),
      backgroundColor: '#3291EA',
      alignSelf: 'center',
      paddingVertical: hp(2),
      paddingHorizontal: wp(5),
      // width: '70%',
    },
    quizStartButton: {
      borderRadius: 100,
      paddingHorizontal: iosPAD ? wp(5) : wp(2),
      marginTop: hp(5),
      backgroundColor: '#3291EA',
      alignSelf: 'center',
      ...(iosPAD && {paddingVertical: hp(1)}),
    },
    submitButton1: {
      borderRadius: 100,
      paddingHorizontal: iosPAD ? wp(5) : wp(2),
      ...(iosPAD && {paddingVertical: hp(1)}),
      marginTop: hp(1),
      backgroundColor: '#3291EA',
      alignSelf: 'center',
    },
    submitButtonText: {
      textAlign: 'center',
      fontSize: moderateScale(20),
      padding: 15,
      color: 'white',
      fontWeight: 'bold',
    },
    submitButtonTextPremiumScreen: {
      textAlign: 'center',
      fontSize: RFS(19),
      color: 'white',
      fontWeight: 'bold',
    },
    submitButtonText1: {
      textAlign: 'center',
      fontSize: Platform.OS === 'android' ? RFS(20) : RFS(18),
      padding: 15,
      color: 'white',
      fontWeight: 'bold',
    },
    premiumFeatureList: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginBottom: 5,
    },
    monthlyAmount: {
      textAlign: 'center',
      color: '#155B96',
      fontFamily: 'Assistant-Regular',
      fontSize: RFS(16),
      // fontWeight: '700',
    },
    only: {
      color: '#155B96',
      fontFamily: 'Assistant',
      fontSize: RFS(16),
      // fontWeight: '500',
    },
    taglineText: {
      fontSize: isPAD ? RFS(12) : RFS(15),
      fontWeight: '700',
      fontFamily: 'Assistant-Regular',
      marginRight: wp(2),
      color: '#155B96',
    },
    taglineText1: {
      fontSize: RFS(12),
      fontWeight: '700',
      fontFamily: 'Assistant-Regular',
      marginRight: wp(2),
      color: '#155B96',
    },
    animatedBox: {
      backgroundColor: 'white',
      zIndex: 0,
      position: 'relative',
    },
    menuContainer: {
      marginTop: hp(0),
    },
    imageStyle: {
      height: hp(3),
      width: hp(3),
    },
    innerImg: {
      width: '100%',
      height: '100%',
    },
    menuText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: iosPAD ? RFS(27) : Platform.OS === 'ios' ? RFS(20) : RFS(24),
      textAlign: 'right',
      paddingHorizontal: 20,
      fontFamily: 'Assistant-Regular',
    },
    txtKey: {
      fontSize: RFS(13),
      // marginRight: 8,
      color: 'black',
      fontFamily: 'Assistant-Regular',
      width: wp('35'),
      textAlign: 'right',
      left: wp('3%'),
    },
    menuItems: {
      paddingHorizontal: 10,
      marginTop: hp(3),
    },
    restoreButton: {
      textAlign: 'center',
      fontSize: RFS(16),
      color: '#3291EA',
      marginTop: 30,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#F2F2F2A0',
      // backgroundColor: "#FFFFFF0",
    },
    quizStyle: {
      paddingHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    premiumBottomStyle: {
      backgroundColor: '#00000000',
      paddingHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    termsConditionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 10 : 70,
      // marginLeft: hp(1),
      // right: Platform.OS === 'android' ? 30 : 25,
      // backgroundColor: "red",
    },
    termsConditionContainer1: {
      marginVertical: hp(1),
      alignSelf: 'center',
      width: '95%',
    },
    termsConditions: {
      color: '#0A84FF',
      fontSize: RFS(10),
      lineHeight: 20,
      fontFamily: 'Assistant-Regular',
      // marginTop: 5,
      alignSelf: 'center',
    },
    termsConditions1: {
      color: 'black',
      fontSize: lang == 'en' ? RFS(9.5) : RFS(10),
      lineHeight: lang == 'en' ? 0 : 20,
      fontFamily: 'Assistant-Regular',
      textAlign: 'center',
      // marginTop: 5,
    },
    termsConditions2: {
      color: 'black',
      fontSize: RFS(12),
      lineHeight: 20,
      fontFamily: 'Assistant-Regular',
      textAlign: 'center',
      // marginTop: 5,
    },
    line: {
      height: hp(2),
      width: wp(0.3),
      backgroundColor: '#0A84FF',
      marginHorizontal: wp(2),
    },
    line1: {
      height: hp(2),
      width: wp(0.3),
      backgroundColor: '#3292E9',
      marginHorizontal: wp(2),
    },
    startShow: {
      fontSize: iosPAD ? RFS(14) : RFS(13),
      // fontWeight: '500',
      color: '#17629F',
      fontFamily: 'Assistant',
      textAlign: 'center',
      marginTop: hp(1),
      // marginBottom: 20
    },
    upperView: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    upperText: {
      color: '#3292E9',
      fontSize: RFS(13),
      // fontWeight: '500',
      fontFamily: 'Assistant',
    },
    flatImage: {
      height: hp(3),
      width: hp(3),
      resizeMode: 'contain',
    },
    dream: {
      fontSize: RFS(22),
      // fontWeight: '400',
      color: '#155B96',
      fontFamily: 'GveretLevinAlefAlefAlef-Regular',
      textAlign: 'center',
      paddingBottom: hp(1),
    },
    premiumPageText: {
      height: hp(6),
      width: wp('60%'),
      alignSelf: 'center',
    },
    modalContainer: {
      flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#00000030',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 25,
      alignSelf: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: hp(80),
      width: wp(85),
    },
    upperView1: {
      alignSelf: 'center',
      marginTop: hp(1),
      width: '100%',
    },
    txt1: {
      height: hp(5),
      alignSelf: 'center',
      width: wp(60),
    },

    trialText: {
      fontSize: iosPAD
        ? RFS(24)
        : Platform.OS === 'android'
        ? RFS(19)
        : RFS(19),
      fontWeight: '400',
      color: '#155B96',
      fontFamily: 'GveretLevinAlefAlefAlef-Regular',
      textAlign: 'center',
      fontStyle: 'italic',
      paddingBottom: hp(0.5),
    },
    firstQuiz: {
      width: wp(100),
      alignSelf: 'center',
      height: hp(27),
      resizeMode: 'contain',
    },
    modalBgWrap: {
      width: '100%',
      height: '90%',
    },
    flatListContainer: {
      paddingVertical: hp(1),
      paddingRight: wp(5),
    },
    whyJoin: {
      fontSize: RFS(20),
      fontWeight: '400',
      color: '#155B96',
      fontFamily: 'GveretLevinAlefAlefAlef-Regular',
      textAlign: 'center',
      fontStyle: 'italic',
      paddingBottom: hp(0.5),
    },
    flagContainer: {
      marginTop: hp(1),
      flexDirection: 'row-reverse',
      alignItems: 'center',
      // justifyContent: 'center',
      // backgroundColor: 'red',
      // paddingBottom: 70,
      // paddingHorizontal: 28,
    },
    valueText: {
      color: 'white',
      fontSize: iosPAD ? RFS(18) : RFS(16),
      ...(!iosPAD && {lineHeight: 20}),
      fontFamily: 'Assistant-Regular',
      textAlign: 'right',
    },
    flagImage: {
      height: hp(2),
      width: hp(2),
      marginRight: 5,
      borderRadius: 10,
    },
    flatlistContainerFourPoints: {
      paddingTop: 15,
      paddingBottom: 5,
      paddingRight: 20,
    },
  });

export default styles;
