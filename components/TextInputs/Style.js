import {StyleSheet} from 'react-native';
import {wp, hp, RFS, isPAD, iosPAD} from '../../dimensions/dimensions';

const styles = StyleSheet.create({
  txtInp: {
    backgroundColor: '#F8FAFC',
    width: '100%',
    height: iosPAD ? hp(7) : hp(7),
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    color: 'black',
    fontSize: RFS(13),
  },
});

export default styles;
