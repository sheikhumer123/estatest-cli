import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RFS, hp, wp} from '../../dimensions/dimensions';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  bgWrap: {
    width: '100%',
    height: '80%',
  },
  bgWrap2: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    top: hp(-5),
    left: wp(-3),
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'space-between',
    // overflow: "hidden"
    paddingBottom: hp(5),
  },
  cancelContainer: {
    marginTop: hp(2),
    paddingHorizontal: hp(2),
    alignItems: 'flex-end',
    top: 5,
  },
  cancelText: {
    fontSize: moderateScale(13),
    color: 'red',
  },
  mainTextContainer: {
    marginTop: hp(1),
    paddingHorizontal: hp(2),
  },
  textOne: {
    fontSize: moderateScale(24),
    lineHeight: 32,
    color: '#155B96',
    // fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'GveretLevinAlefAlefAlef-Regular',
  },
  textTwo: {
    marginTop: hp(2),
    fontSize: moderateScale(16),
    lineHeight: 20,
    color: '#2FA2EB',
    // fontWeight: "600",
    textAlign: 'center',
    fontFamily: 'Assistant',
  },
  textThree: {
    color: '#83C1E5',
    marginTop: hp(2),
    fontSize: moderateScale(25),
    textAlign: 'center',
    fontFamily: 'GveretLevinAlefAlefAlef-Regular',
  },
  line: {
    backgroundColor: '#EEEEEE',
    height: 2,
    width: wp(90),
    alignSelf: 'center',
    marginVertical: Platform.OS === 'ios' ? hp(2.5) : hp(2.5),
  },
  recommendSetting: {
    fontSize: RFS(15),
    lineHeight: 20,
    color: '#2FA2EB',
    // fontWeight: "500",
    textAlign: 'center',
    fontFamily: 'Assistant',
    paddingHorizontal: 10,
  },
  recommendContainer: {},
  alarmContainer: {
    marginTop: hp(4),
    alignSelf: 'center',
    flexDirection: 'row',

    borderRadius: 55,
    borderColor: '#E1F1FF',
    borderWidth: 2,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(25),
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
    marginTop: hp(0),
    paddingHorizontal: hp(2),
  },
  repeat: {
    fontSize: RFS(15),
    marginLeft: hp(1),
    color: '#2FA2EB',
    // fontWeight: "500",
    textAlign: 'right',
    fontFamily: 'Assistant',
    marginBottom: hp(1),
  },
  daysContainer: {
    marginVertical: hp(2),
    paddingHorizontal: hp(0),
    alignItems: 'center',
  },
  dayStyleActive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    width: hp(5),
    borderWidth: 1,
    borderColor: '#3389E9',
    backgroundColor: '#3389E9',
    borderRadius: hp(5),
    marginLeft: hp(1),
  },
  dayStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    width: hp(5),
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: hp(5),
    marginLeft: hp(1),
  },
  dayText: {
    fontSize: RFS(12),
    color: '#2FA2EB',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Assistant-Regular',
  },
  reminderButton: {
    backgroundColor: '#0A84FF',
    height: hp(5.5),
    // width: wp(35),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    // marginTop: hp(10)
  },
  reminderButtonDisabled: {
    backgroundColor: '#84C1FF',
    height: hp(5.5),
    width: wp(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },

  delReminderButton: {
    backgroundColor: '#EEEEEE',
    height: hp(5),
    // width: wp(30),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: hp(3),
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    // paddingBottom: 30,
  },
  reminderText: {
    fontSize: RFS(16),
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Assistant-Regular',
  },
  delReminder: {
    fontSize: RFS(16),
    color: '#0A84FF',
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
    marginBottom: 5,
  },
  daysContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default styles;
