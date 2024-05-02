import {StyleSheet} from 'react-native';
import {wp, hp, RFS} from '../../dimensions/dimensions';
const styles = StyleSheet.create({
  btnWrap: {
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: '#DFDFDF',
    height: hp(7),
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapImgSocial: {
    width: wp(10),
    height: wp(10),
  },
  innerImg: {
    width: '100%',
    height: '100%',
  },
  txtInnerTxt: {
    right: wp(5),
    fontSize: RFS(14),
    fontWeight: '400',
    color: 'black',
    fontFamily: 'Assistant-Bold',
  },
  btnMediumWrap: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#DFDFDF',
    height: hp(6.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSmallWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: wp(5),
    height: hp(8),
    backgroundColor: '#3291EA',
    alignSelf: 'center',
    width: '75%',
  },
  HomePremiumButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: wp(6),
    height: hp(8),
    backgroundColor: '#3291EA',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: RFS(18),
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextHomePremium: {
    fontFamily: 'Assistant-Bold',
    textAlign: 'center',
    fontSize: RFS(20),
    color: 'white',
  },
});

export default styles;
