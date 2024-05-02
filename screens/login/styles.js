import {StyleSheet} from 'react-native';
import {wp, hp, RFS} from '../../dimensions/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  widthWrap: {
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(12),
  },
  wrapBtn: {marginTop: hp(5)},

  txtConnect: {
    color: '#2FA5EB',
    // fontWeight: "700",
    fontSize: RFS(48),
    textAlign: 'center',
    marginTop: hp(5),
    fontFamily: 'Assistant-Bold',
  },
  bgWrap: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    // zIndex: 999,
    marginTop: hp(2),
  },

  signInButton: {
    flexDirection: 'row',
    width: wp(50),
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000010',
    margin: 5,
    borderRadius: 50,
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: RFS(16),
    fontWeight: '500',
    marginLeft: hp(1),
  },
  title: {
    fontSize: RFS(20),
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(25.1),
    width: hp(25.1),
    borderRadius: 15,
    marginBottom: 25,
  },
  txtDontHave: {
    color: 'black',
    fontSize: RFS(15),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  txtRememberMe: {
    color: '#327DE5',
    left: 5,
    fontSize: RFS(15),
  },
  txtDontHave2: {
    color: '#404B52',
    fontSize: RFS(15),
    textAlign: 'center',
    marginLeft: 5,
  },
});

export default styles;
