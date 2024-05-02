import {StyleSheet} from 'react-native';
import {wp, hp, RFS, isPAD, iosPAD} from '../../dimensions/dimensions';
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    height: iosPAD ? hp(20) : hp(17),
    width: wp(80),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  upperPart: {
    alignItems: 'center',
    justifyContent: 'center',
    height: iosPAD ? hp(13) : hp(12),
    borderBottomColor: '#3C3C4336',
    borderBottomWidth: 1,
  },
  lowerPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  wrapImgSocial: {
    width: hp(7),
    height: hp(7),
    alignSelf: 'center',
    marginTop: hp(2),
    margin: wp(2),
  },
  innerImg: {
    width: '100%',
    height: '100%',
  },
  faceIDText: {
    fontSize: iosPAD ? RFS(18) : RFS(16),
    fontFamily: 'Assistant-Bold',
    marginTop: hp(1),
    color: 'black',
  },
  faceIDText2: {
    fontSize: iosPAD ? RFS(15) : RFS(16),
    fontFamily: 'Assistant',
    marginTop: hp(1),
    color: 'black',
  },
  cancelText: {
    fontSize: iosPAD ? RFS(17) : RFS(15),
    fontWeight: '700',
    fontFamily: 'Assistant-Bold',
    color: 'red',
  },
  confirmText: {
    fontSize: iosPAD ? RFS(17) : RFS(15),
    fontWeight: '700',
    fontFamily: 'Assistant-Bold',
    // color: '#007AFF',
  },
  line: {
    width: 1,
    height: hp(5),
    borderLeftColor: '#3C3C4336',
    borderLeftWidth: 1,
  },
});

export default styles;
