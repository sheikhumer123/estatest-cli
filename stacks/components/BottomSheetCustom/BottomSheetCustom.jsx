import react, {useMemo, useEffect, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import {View} from 'react-native';
import {hp} from '../../dimensions/dimensions';

const BottomSheetCustom = props => {
  useEffect(() => {
    setUpdateSnap(props.startingSnap);
    console.log(props.startingSnap, updateSnap);
  }, [props.startingSnap]);

  const [updateSnap, setUpdateSnap] = useState();
  // const snapPoints = [
  //   '20%',
  //   updateSnap,
  //   '30%',
  //   '35%',
  //   '40%',
  //   '45%',
  //   updateSnap,
  //   '60%',
  //   '65%',
  //   '70%',
  //   '75%',
  //   '80%',
  //   '85%',
  //   '90%',
  //   '95%',
  // ];

  const snapPoints = [
    '20%',

    updateSnap ? updateSnap : '40%',
    '60%',
    '65%',
    '70%',
    '75%',
    '80%',
    '85%',
    '90%',
    '95%',
  ];

  // const snapPoints = ['20%', updateSnap ? updateSnap : '50%', '100%'];

  return (
    <>
      <BottomSheet
        handleIndicatorStyle={{backgroundColor: '#2E99E9', width: '15%'}}
        style={{
          shadowColor: '#00000050',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 5,
          paddingHorizontal: 10,
        }}
        ref={props.reference}
        index={1}
        snapPoints={snapPoints}>
        <View style={{marginTop: hp(4.3), paddingRight: 10}}>
          {props.component}
        </View>
      </BottomSheet>
    </>
  );
};
export default BottomSheetCustom;
