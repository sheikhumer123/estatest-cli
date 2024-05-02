import {StyleSheet} from 'react-native';
import {RFS, wp, hp, iosPAD} from '../../dimensions/dimensions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  root: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: iosPAD ? hp(0) : hp(0),
  },
  image: {
    aspectRatio: 1,
    width: iosPAD ? scale(250) : scale(230),
    height: iosPAD ? verticalScale(250) : verticalScale(230),
  },
  image1: {
    aspectRatio: 1,
    width: iosPAD ? scale(235) : scale(230),
    height: iosPAD ? verticalScale(235) : verticalScale(230),
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
    fontSize: iosPAD ? moderateScale(30) : moderateScale(40),
    color: '#155B96',
  },
});

export default styles;
