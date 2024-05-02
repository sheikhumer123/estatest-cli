import React, {useRef, useCallback, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  ImageBackground,
  StatusBar,
  NativeModules,
  Dimensions,
  Button,
} from 'react-native';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {hp, wp, RFS, width} from '../../dimensions/dimensions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {dispatchTutorial} from '../../redux/actions';

const TutorialScreen = ({navigation}) => {
  const {t} = useTranslation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const dismissTutorial = async () => {
    dispatch(dispatchTutorial(false));
    navigation.navigate('Login');
  };

  const [dot, setDot] = useState(0);

  const slides = [
    {
      key: '1',
      title: t('tutorial.progression.title'),
      title1: t('tutorial.progression.title1'),
      description: t('tutorial.progression.description'),
      image: require('../../assets/images/backgrounds/backgroundIcons.png'),
      screenImage: require('../../assets/images/logoBgWhite.png'),
    },
    {
      key: '2',
      title: t('tutorial.study.title'),
      title1: t('tutorial.study.title1'),
      description: t('tutorial.study.description'),
      bolddescrptiopn: t('tutorial.study.boldDescription'),
      image: require('../../assets/images/backgrounds/backgroundIcons.png'),
      screenImage: require('../../assets/images/pdfBgWhite.png'),
    },
    {
      key: '3',
      title: t('tutorial.time.title'),
      title1: t('tutorial.time.title1'),
      description: t('tutorial.time.description'),
      image: require('../../assets/images/backgrounds/backgroundIcons.png'),
      screenImage: require('../../assets/images/calanderBgWhite.png'),
    },
  ];
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = event => {
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    })(event);

    const scrollPosition = event.nativeEvent.contentOffset.x;
    // console.log({"scrollPostition": scrollPosition,screenWidth});
    const index = scrollPosition / screenWidth;
    setDot(Math.round(index));
    // console.log(Math.round(index))
  };
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const keyExtractor = useCallback(item => item.key, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.imgStyle}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="stretch"
            source={item.image}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: index == 2 ? hp(-6) : hp(2),
            height: hp('92%'),
            width: wp(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: wp(80), height: hp(index == 2 ? hp(5) : hp(5))}}
            resizeMode="contain"
            source={item.screenImage}
          />
          <Text style={styles.title}>
            {item.title}
            <Text
              style={{
                fontSize: RFS(28),
                color: 'yellow',
                textAlign: 'center',
                padding: 8,
                color: 'white',
                fontWeight: 'bold',
                width: wp(90),
                fontFamily: 'Assistant-Bold',
                textDecorationLine: index === 1 ? 'underline' : 'none',
              }}>
              {item.title1}
            </Text>
          </Text>

          <Text style={styles.description}>
            {item.description}
            <Text style={{fontWeight: 'bold'}}> {item.bolddescrptiopn}</Text>
          </Text>

          <View
            style={{
              position: 'absolute',
              bottom: index == 2 ? hp(-4) : hp(-5),
              width: '100%',
            }}>
            {index === slides.length - 1 && (
              <View
                style={{
                  height: 10,
                  width: '100%',
                  zIndex: 999,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: hp(1),
                    width: hp(1.1),
                    borderRadius: 50,
                    backgroundColor: 'black',
                    margin: hp(0.8),
                  }}></View>
                <View
                  style={{
                    height: hp(1.1),
                    width: hp(1.1),
                    borderRadius: 50,
                    backgroundColor: 'white',
                    margin: hp(0.8),
                  }}></View>
                <View
                  style={{
                    height: hp(1.1),
                    width: hp(1.1),
                    borderRadius: 50,
                    backgroundColor: 'white',
                    margin: hp(0.8),
                  }}></View>
              </View>
            )}
            <View>
              {index === slides.length - 1 && (
                <TouchableOpacity
                  style={styles.bgImgBtn}
                  onPress={() => {
                    dismissTutorial();
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/btnStart.png')}
                    resizeMode="contain"
                    style={styles.innerBg}>
                    <Text style={{...styles.submitButtonText, bottom: 5}}>
                      {t('tutorial.submit')}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <ImageBackground
        style={{flex: 1, backgroundColor: 'red'}}
        source={require('../../assets/images/backgrounds/backgroundIcons.png')}>
        <FlatList
          inverted={true}
          data={slides}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          pagingEnabled
          horizontal
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
        />

        {dot !== 2 && (
          <View
            style={{
              height: '5%',
              width: '100%',
            }}>
            <ExpandingDot
              data={slides}
              expandingDotWidth={10}
              scrollX={scrollX}
              inActiveDotOpacity={1}
              inActiveDotColor={'#FFFFFF'}
              activeDotColor={'#15325B'}
              dotStyle={{
                width: hp(1),
                height: hp(1),
                borderRadius: 5,
                marginHorizontal: 5,
              }}
              containerStyle={{
                bottom: 15,
                transform: [{scaleX: -1}],
              }}
            />
          </View>
        )}
      </ImageBackground>
    </>
  );
};

export default TutorialScreen;
