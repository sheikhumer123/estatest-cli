import {StyleSheet} from 'react-native';
import {wp, hp, RFS} from '../../dimensions/dimensions';

export const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 12,
    paddingHorizontal: wp(4),
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: hp(2.5),
    width: hp(2.5),
    marginHorizontal: 5,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  text: {
    color: 'white',
    fontFamily: 'Assistant-Bold',
    fontSize: RFS(13),
  },
});

export default styles;
