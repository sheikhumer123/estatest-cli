import {StyleSheet} from 'react-native';
import {hp} from '../../dimensions/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgWrap: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    top: 0,
  },
  widthWrap: {
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(3),
  },
  arrow: {
    alignSelf: 'flex-end',
    zIndex: 999,
    marginTop: hp(4),
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetModal: {
    backgroundColor: '#00000000',
    paddingHorizontal: 5,
    shadowColor: '#00000050',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  border: {
    borderRadius: 30,
  },
  indicatorStyle: {
    backgroundColor: '#96CAFF',
    width: '10%',
    marginVertical: 10,
  },
});

export default styles;
