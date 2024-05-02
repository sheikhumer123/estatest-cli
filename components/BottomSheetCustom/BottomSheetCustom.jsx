import react, {useMemo, useEffect, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import {View, Platform} from 'react-native';
import {hp} from '../../dimensions/dimensions';

const BottomSheetCustom = props => {
  useEffect(() => {
    setNewState(props.startingSnap);
  }, [props.startingSnap]);

  const [newState, setNewState] = useState(props.startingSnap);

  const snapPoints = Platform.select({
    ios: [
      '20%',
      '25%',
      '30%',
      '35%',
      '40%',
      newState && `${newState}`,
      '45%',
      '50%',
      '55%',
      '60%',
      '65%',
      '70%',
      '75%',
      '80%',
      '85%',
      '90%',
      '95%',
      '100%',
    ],
    android: [
      '20%',
      '25%',
      '30%',
      '35%',
      '40%',
      newState && `${newState}`,
      '45%',
      '50%',
      '55%',
      '60%',
      '65%',
      '70%',
      '75%',
      '80%',
      '85%',
      '90%',
      '95%',
      '100%',
    ],
  });

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
