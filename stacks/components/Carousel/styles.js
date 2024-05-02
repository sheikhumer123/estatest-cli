import {StyleSheet} from 'react-native';
import {RFS, wp, hp} from '../../dimensions/dimensions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(-4),
  },
  image: {
    aspectRatio: 1,
    width: scale(230),
    height: verticalScale(230),
  },
  image1: {
    aspectRatio: 1,
    width: scale(230),
    height: verticalScale(230),
    borderRadius: 200,
    borderColor: '#155B96',
    backgroundColor: '#155B96',
    borderWidth: 8,
  },
  innerImg: {
    width: '100%',
    height: '100%',
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Assistant-Bold',
    fontSize: moderateScale(40),
    color: '#155B96',
    // fontWeight: 'bold',
  },
});

export default styles;
