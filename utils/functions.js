import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
const days = [
  {day: 'Sat', id: 6, isSelectedDay: false, label: 'Sat'},
  {day: 'Fri', id: 5, isSelectedDay: false, label: 'Fri'},
  {day: 'Thurs', id: 4, isSelectedDay: false, label: 'Thurs'},
  {day: 'Wed', id: 3, isSelectedDay: false, label: 'Wed'},
  {day: 'Tues', id: 2, isSelectedDay: false, label: 'Tues'},
  {day: 'Mon', id: 1, isSelectedDay: false, label: 'Mon'},
  {day: 'Sun', id: 0, isSelectedDay: false, label: 'Sun'},
];
const deviceTimeZone = RNLocalize.getTimeZone();

export const modifyNotifications = object => {
  let newTime = moment
    .tz(object.date, deviceTimeZone)
    .format('YYYY-MM-DD HH:mm');

  const modifiedDays = days.map(item => ({
    ...item,
    isSelectedDay: object.days.includes(item.id),
  }));

  const newArray = modifiedDays.filter(item => item.isSelectedDay);
  const newAllDays = newArray.map(item => item.id);

  const newObject = {
    selectedArray: newArray,
    days: modifiedDays,
    Alldays: newAllDays,
    time: newTime,
    uid: object.uid,
  };

  return newObject;
};
