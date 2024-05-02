import {StyleSheet, Dimensions} from 'react-native';
import {RFS, hp, wp} from '../../dimensions/dimensions';

export const styles = lang =>
  StyleSheet.create({
    imgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpImage: {
      height: hp(36),
      width: hp(36),
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      height: '100%',
      width: '100%',
    },
    sec: {
      flex: 1.1,
      justifyContent: 'flex-end',
      paddingLeft: wp(5),
    },
    bgWrap2: {
      width: '100%',
      height: '80%',
      position: 'absolute',
      marginTop: hp(-2),
    },
    sec2: {
      flex: 0.9,
      alignItems: 'flex-end',
      paddingRight: wp(5),
    },
    selectorSec: {
      flex: 1,
      flexDirection: lang == 'he' ? 'row' : 'row-reverse',
    },
    title1: {
      fontSize: lang == 'he' ? RFS(18) : RFS(16),
      fontFamily: 'Assistant-Bold',
      textAlign: 'right',
    },
    title2: {
      fontSize: lang == 'he' ? RFS(13) : RFS(11),
      fontFamily: 'Assistant',
      marginTop: 3,
    },
    title3: {
      fontSize: RFS(11),
      fontFamily: 'Assistant-SemiBold',
      marginTop: 3,
      color: '#2FA5EB',
    },
    phone: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dots: {
      fontSize: RFS(14),
      marginLeft: 2,
      fontFamily: 'Assistant-Regular',
    },
    number: {
      fontSize: RFS(14),
      fontFamily: 'Assistant-Regular',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: hp(3.5),
      color: 'black',
      gap: 10,
      paddingHorizontal: wp(5),
    },
    otpInput: {
      flex: 1,
      height: hp(7),
      fontSize: 20,
      textAlign: 'center',
      color: 'black',
      borderBottomColor: '#2FA5EB',
      borderBottomWidth: 2,
    },
    wrongCode: {
      color: '#E65D5D',
      fontFamily: 'Assistant-SemiBold',
      marginTop: hp(1.5),
      textAlign: lang == 'he' ? 'right' : 'left',
    },
    errorContainer: {
      paddingHorizontal: wp(4),
    },
    sendAgainContainer: {
      flexDirection: lang == 'he' ? 'row-reverse' : 'row',
      gap: 5,
      justifyContent: 'center',
      marginTop: hp(3),
      alignItems: 'center',
    },
    sendAgain: {
      color: '#50707E',
      fontFamily: 'Assistant-Bold',
      fontSize: RFS(13),
    },
    didntGet: {
      color: 'black',
      fontFamily: 'Assistant',
      fontSize: RFS(13),
    },
    Timer: {
      backgroundColor: '#ECEDED',
      height: hp(3),
      borderRadius: 100,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerText: {
      fontSize: RFS(10),
      color: '#50707E',
      fontFamily: 'Assistant-Bold',
    },
    submitBtn: {
      alignItems: 'center',
      marginTop: hp(2),
    },
  });

export default styles;
