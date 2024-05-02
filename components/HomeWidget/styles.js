import {Platform, StyleSheet} from 'react-native';
import {RFS, wp, hp} from '../../dimensions/dimensions';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: RFS(45),
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  titleTop: {
    fontSize: RFS(65),
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },

  titleGreen: {
    color: '#09A719',
    color: '#9ddca3',
    // color: "rgba(9, 167, 25, 1)",
  },
  titleBlue: {
    // color: "#3392EA",
    color: '#add3f7',
  },
  titleRed: {
    color: '#D20000',
  },
  subtitle: {
    fontSize: RFS(14),
    fontWeight: 'bold',
    // color: "#155B96",
    color: '#a1bdd5',
    textAlign: 'center',
    bottom: hp(2),
    fontFamily: 'Assistant',
    // position: 'absolute',
  },
  minutes: {
    fontSize: RFS(20),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Platform.OS == 'ios' ? hp(2) : hp(0),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 30,
    width: wp(60),
    height: hp(8),
    backgroundColor: '#3291EA',
    alignSelf: 'center',
  },
  alarmContainer: {
    marginTop: hp(4),
    alignSelf: 'center',
    flexDirection: 'row',
    height: 60,
    width: 200,
    borderRadius: 55,
    borderColor: '#3388E9',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmImage: {
    height: hp(3),
    width: hp(3),
  },
  timer: {
    fontSize: RFS(20),
    marginLeft: hp(1),
    color: '#2FA2EB',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Assistant-Regular',
  },
  repeatContainer: {
    marginTop: hp(2),
    paddingHorizontal: hp(2),
  },
  repeat: {
    fontSize: RFS(15),
    marginLeft: hp(1),
    color: '#2FA2EB',
    fontWeight: '500',
    textAlign: 'right',
    fontFamily: 'Assistant-Regular',
  },
  daysContainer: {
    marginTop: hp(2),
    alignSelf: 'center',
  },
  dayStyleActive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(6),
    width: hp(6),
    borderWidth: 1,
    borderColor: '#3389E9',
    backgroundColor: '#3389E9',
    borderRadius: hp(5),
    marginLeft: hp(1),
  },
  dayStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(6),
    width: hp(6),
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: hp(5),
    marginLeft: hp(1),
  },
  dayText: {
    fontSize: RFS(13),
    color: '#2FA2EB',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Assistant-Regular',
  },
  reminderButton: {
    backgroundColor: '#0A84FF',
    height: hp(5),
    width: wp(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  reminderText: {
    fontSize: RFS(16),
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Assistant-Regular',
  },
  alarmText: {
    fontFamily: 'Assistant-Regular',
    fontSize: RFS(15),
    textAlign: 'center',
    fontWeight: '700',
    color: '#2FA2EB',
    marginBottom: 10,
  },
  daysSelectedContainer: {
    marginVertical: hp(2),
    paddingHorizontal: hp(2),
  },
  daysText: {
    fontSize: RFS(15),
    marginLeft: hp(1),
    color: '#2FA2EB',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Assistant-Regular',
  },
  daysContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  width: {
    marginTop: hp(1),
  },
});

export default styles;