import {StyleSheet} from 'react-native';
import {wp, hp, RFS} from '../../dimensions/dimensions';

const styles = StyleSheet.create({
  txtInp: {
    backgroundColor: '#F8FAFC',
    width: '100%',
    marginTop: hp(3),
    height: hp(7),
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    color: 'black',
    fontSize: RFS(13),
  },
});

export default styles;
