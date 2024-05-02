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
import {wp, hp, RFS} from '../../dimensions/dimensions';

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
}) {
  const {width} = Dimensions.get('window');
  const {t} = useTranslation();
  return (
    <Carousel
      defaultIndex={1}
      width={width}
      loop={false}
      height={width - 180}
      mode="parallax"
      data={pages}
      onSnapToItem={index => {
        onSwipe(pages[index].label);
        // startBounceAnimation();
      }}
      scrollAnimationDuration={100}
      // withAnimation={bouncyAnimation}
      modeConfig={{
        parallaxScrollingScale: 0.58,
        parallaxScrollingOffset: 220,
        parallaxAdjacentItemScale: 0.38,
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
