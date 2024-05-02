import {Dimensions, StyleSheet} from 'react-native';
import {RFS, hp, wp} from '../../dimensions/dimensions';
const screenDimensions = Dimensions.get('screen');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  slidesContainer: {
    flex: 1,
  },
  imgStyle: {
    width: screenDimensions.width,
    backgroundColor: 'white',
  },
  overlayContainer: {
    position: 'absolute',
    top: 10,
    height: '95%',
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFS(26),
    textAlign: 'center',
    padding: 8,
    color: 'white',
    fontWeight: '100',
    width: wp(90),
    fontFamily: 'Assistant',
    marginTop: hp(2),
    lineHeight: hp(4),
  },
  title1: {
    fontSize: RFS(28),
    // color: "white",
    color: 'yellow',
    textAlign: 'center',
    padding: 8,
    color: 'white',
    fontWeight: 'bold',
    width: wp(90),
    fontFamily: 'Assistant-Bold',
  },
  description: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFS(16),
    padding: 8,
    width: wp(90),
    fontFamily: 'Assistant',
  },
  submitButton: {
    borderRadius: 50,
    width: wp(50),
    marginTop: hp(1.2),
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  submitButtonText: {
    fontFamily: 'Assistant-Bold',
    textAlign: 'center',
    fontSize: RFS(20),
    color: 'white',
  },
  bgImgBtn: {
    // position: "absolute",
    // bottom: 0,
    width: wp(60),
    height: hp(9),
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.2,
    opacity: 1,
  },
});

export default styles;
