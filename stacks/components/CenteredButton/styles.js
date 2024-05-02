import {StyleSheet} from 'react-native';
import {RFS, hp, wp} from '../../dimensions/dimensions';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    marginTop: 20,
    backgroundColor: '#0A84FF',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: RFS(15),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default styles;
