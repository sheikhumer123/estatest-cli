import react from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {View,StyleSheet,Text} from 'react-native';
// import {hp} from '../../dimensions/dimensions';

const BottomSheetScrollable = (props) => {
  const snapPoints = ['90%', "5%"];
  return (
    <>
      <BottomSheet
      backgroundStyle={{backgroundColor: "red"}}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 3.84,
        }}
        ref={props.reference}
        snapPoints={snapPoints}>
          <View style={{height: "100%",flex: 1}}>
               <Text>asdad</Text>

        </View>

      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({

    contentContainer: {
      backgroundColor: 'white',
    },
    
  });
  
export default BottomSheetScrollable;
