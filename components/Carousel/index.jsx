import * as React from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {wp, hp, RFS, isPAD, iosPAD} from '../../dimensions/dimensions';
import {scale, verticalScale} from 'react-native-size-matters';

export const pages = [
  {
    label: 'Resources',
    uri: require('../../assets/images/resources.png'),
    selectedUri: require('../../assets/images/resourcesSelected.png'),
  },
  {
    label: 'Practice',
    uri: require('../../assets/images/practice.png'),
    selectedUri: require('../../assets/images/practiceSelected.png'),
  },
  {
    label: 'Quiz',
    uri: require('../../assets/images/quiz.png'),
    selectedUri: require('../../assets/images/quizSelected.png'),
  },
  {
    label: 'Reminders',
    uri: require('../../assets/images/reminders.png'),
    selectedUri: require('../../assets/images/remindersSelected.png'),
  },
];
function CustomCarousel({
  examRemainder,
  openRemainder,
  navigation,
  onSwipe,
  onQuizClick,
  currentPage,
  openPracticeSheet,
  setShowPageQuiz,
}) {
  const {width} = Dimensions.get('window');
  const {t} = useTranslation();
  return (
    <Carousel
      defaultIndex={1}
      width={width}
      loop={false}
      height={isPAD ? hp(35) : width - 150}
      mode="parallax"
      data={pages}
      style={{alignSelf: 'center'}}
      onSnapToItem={index => {
        onSwipe(pages[index].label);
      }}
      scrollAnimationDuration={100}
      modeConfig={{
        parallaxScrollingScale: iosPAD ? scale(0.26) : 0.58,
        parallaxScrollingOffset: iosPAD ? wp(55) : 220,
        parallaxAdjacentItemScale: iosPAD ? scale(0.17) : 0.38,
      }}
      renderItem={({item, index}) => {
        return (
          <View style={styles.root}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (item.label === 'Quiz') {
                  onQuizClick();
                  return;
                } else if (item.label === 'Practice') {
                  openPracticeSheet();
                } else if (item.label === 'Reminders') {
                  openRemainder();
                } else {
                  navigation.navigate(item.label);
                }
              }}>
              <View>
                <View
                  style={
                    currentPage === item?.label ? styles.image1 : styles.image
                  }>
                  <Image
                    style={styles.innerImg}
                    source={item?.uri}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.label}>
                  {t(`pages.${item.label.toLowerCase()}`)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      }}
    />
  );
}

export default CustomCarousel;
