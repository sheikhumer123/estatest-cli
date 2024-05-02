import {useState, useRef, useEffect, useContext} from 'react';
import Carousel, {pages} from '../../components/Carousel';
import HomeWidget from '../../components/HomeWidget';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  AppState,
  TurboModuleRegistry,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';
// import {LoaderContext} from './contexts/AppLoading';
import {Feather} from 'react-native-vector-icons';
import {CommonActions} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MenuDrawer from 'react-native-side-drawer';
import Animated, {FadeIn} from 'react-native-reanimated';
import {PremiumBottomSheetContent} from './premium';
import Drawer from './drawer';
import getStyles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StartExamBottomSheetContent} from './startExam';
import messaging from '@react-native-firebase/messaging';
import {getPemium} from '../../api/api';
import {PremiumModal} from './premiumModal';
import {PremiumModalPractice} from './premiumModalPractice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback} from 'react';
import {
  endConnection,
  getProducts,
  getSubscriptions,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestSubscription,
  getAvailablePurchases,
} from 'react-native-iap';
import {useDispatch, useSelector} from 'react-redux';
import {
  dispatchIsPremiumUser,
  dispatchUserDetails,
  dispatchPracticeStates,
  dispatchQuizStates,
  dispatch_AllRemainders,
} from '../../redux/actions';
import QuizPage from '../quiz';
import {LoaderContext} from '../../contexts/AppLoading';
import QuizPagePractice from '../practice';
import {hp, iosPAD, isPAD, wp} from '../../dimensions/dimensions';
import MainContext from '../../contexts/MainContext';
import Reminders from '../reminders';
import VersionCheck from 'react-native-version-check';

import {
  enablePremiumApi,
  getNotifications,
  getPracticeStatistics,
  getQuizStatistics,
  getUserDetails,
  saveToken,
  updateLangApi,
} from '../../api/newApisToken';
import {modifyNotifications} from '../../utils/functions';

const items = Platform.select({
  ios: ['monthly_subs'],
  android: ['estatestapp_39_1m'],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

function Home({navigation}) {
  const {notitfyScreen, refreshExamStates, setRefreshExamStates} =
    useContext(MainContext);

  const {userDetails, isPremiumUser, allRemainders, termsLinks} = useSelector(
    state => state.userReducer,
  );
  const styles = getStyles();

  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(pages[1].label);
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation();
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [premiumModalVisiblePractice, setPremiumModalVisiblePractice] =
    useState(false);
  const [isFirstQuiz, setIsFirstQuiz] = useState();
  const [isFirstPractice, setIsFirstPractice] = useState();
  const bottomSheetModalRef = useRef(null);
  const startExamBottomSheetModalRef = useRef(null);
  const startQuizMain = useRef(null);
  const snapPoints = ['90%'];
  const snapPoints2 = ['90%', '93%'];
  const snapPoints3 = ['10%', '93%', '93%'];
  const quizPageSheet = useRef(null);
  const practiceSheet = useRef(null);
  const remainderRef = useRef(null);
  const {setLoader} = useContext(LoaderContext);
  const {lang} = useSelector(state => state.userReducer);

  const getFCMToken = async () => {
    try {
      await updateLangApi({lang});
      await messaging().requestPermission();
      const devicetoken = await messaging().getToken();
      if (devicetoken) {
        await saveToken({token: devicetoken});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const closeQuizStartPage = () => {
    startExamBottomSheetModalRef.current.close();
  };

  useEffect(() => {
    getFCMToken();
  }, []);

  const resetNavigationStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('login');
    dispatch(dispatchUserDetails(null));
    dispatch(dispatchQuizStates(null));
    dispatch(dispatchPracticeStates(null));
    resetNavigationStack();
  };

  const closePracticeSheet2 = () => {
    setTimeout(() => {
      Alert.alert(t('overAll.intoProblem'), t('overAll.faildToLoad'));
      practiceSheet.current.dismiss();
    }, 1000);
  };

  const closeQuestionSheet2 = () => {
    setTimeout(() => {
      Alert.alert(t('overAll.intoProblem'), t('overAll.faildToLoad'));
      quizPageSheet.current.dismiss();
    }, 1000);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenQuizPageSheet = () => {
    quizPageSheet.current.present();
  };

  useEffect(() => {
    if (navigation.getState().index != 0) {
      navigation.navigate('Home');
      if (notitfyScreen > 0) {
        practiceSheet.current.present();
      }
    } else if (navigation.getState().index == 0) {
      if (notitfyScreen > 0) {
        practiceSheet.current.present();
      }
    }
  }, [notitfyScreen]);

  const [isSelected, setIsSelected] = useState(false);
  const [showPageQuiz, setShowPageQuiz] = useState(true);
  const [checkQuestionLoad, setCheckQuestionLoad] = useState(true);
  const [examRemainder, setExamRemainder] = useState('');
  const [triggerPremiumModal, setTriggerPremiumModal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [premiumPrice, setPremiumPrice] = useState('');

  const subscriptions = ['ems', 'monthly_subs'];

  const openPracticeModal = () => {
    if (!isPremiumUser) {
      setPremiumModalVisiblePractice(true);
      return;
    }
  };

  const openQuizModal = () => {
    if (!isPremiumUser) {
      setPremiumModalVisible(true);
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const userInfoFun = async () => {
        const userInfo = await getUserDetails(logoutUser);
        if (userInfo?.premiumAccount) {
          dispatch(dispatchIsPremiumUser(true));
        } else {
          dispatch(dispatchIsPremiumUser(false));
        }
        dispatch(dispatchUserDetails(userInfo));
        const quizStates = await getQuizStatistics();
        dispatch(dispatchQuizStates(quizStates));
        const practiceStates = await getPracticeStatistics();
        dispatch(dispatchPracticeStates(practiceStates));
        const examRem = await AsyncStorage.getItem('examRemember');
        setExamRemainder(examRem);
      };
      userInfoFun();
    }, []),
  );

  const showPremiumError = () => {
    Alert.alert(t('overAll.subserrorTitle'), t('overAll.subscriptionError'));
  };

  const enablePremium = async transactionId => {
    const status = await enablePremiumApi(transactionId);
    if (status) {
      dispatch(dispatchIsPremiumUser(true));
      setPremiumModalVisible(false);
      setPremiumModalVisiblePractice(false);
      setLoading(false);
      setLoader(false);
      bottomSheetModalRef.current.dismiss();
      return;
    }
    setLoading(false);
    setLoader(false);
    showPremiumError();
  };

  useEffect(() => {
    const updateStates = async () => {
      const quizStates = await getQuizStatistics();
      dispatch(dispatchQuizStates(quizStates));
      const practiceStates = await getPracticeStatistics();
      dispatch(dispatchPracticeStates(practiceStates));
    };
    updateStates();
  }, [refreshExamStates]);

  useEffect(() => {
    const againCheck = async () => {
      const examRem = await AsyncStorage.getItem('examRemember');
      setExamRemainder(examRem);
    };
    againCheck();
  }, [startExamBottomSheetModalRef]);

  const handleStartExamOpenBottomSheet = () => {
    if (examRemainder == 'true') {
      setShowPageQuiz(true);
      quizPageSheet.current.present();
    } else {
      startExamBottomSheetModalRef.current.present();
    }
  };

  useEffect(() => {
    const func = async () => {
      const firstTime = await AsyncStorage.getItem('isFirstTimeQuiz');
      const firstTimePractice = await AsyncStorage.getItem(
        'isFirstTimePractice',
      );
      setIsFirstQuiz(firstTime);
      setIsFirstPractice(firstTimePractice);
      if (userDetails && !userDetails?.premiumAccount && !isPremiumUser) {
        setPremiumModalVisible(true);
        return;
      }
    };
    func();
  }, [isFirstPractice, isFirstQuiz]);

  const handlePremiumButtonClick = async () => {
    if (Platform.OS == 'android') {
      setLoader(true);
    } else {
      setLoading(true);
    }
    let productId = {sku: products[0].productId};
    console.log({'productId----------': productId});
    let offerToken =
      Platform.OS == 'ios'
        ? null
        : products[0]?.subscriptionOfferDetails[0]?.offerToken;

    console.log({'offerToken----------': offerToken});
    if (!offerToken) {
      console.warn(
        `There are no subscription Offers for selected product ${productId}`,
      );
    }
    const purchased = await handleSubscription(productId, offerToken);
    console.log(
      '🚀 ~ file: index.jsx:113 ~ handlePremmButtonClick ~ purchased:',
      purchased,
    );
    setLoader(false);
    setLoading(false);
  };

  const closePremium = () => {
    bottomSheetModalRef.current.close();
  };

  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState({});

  const restorePurchase = async () => {
    setLoader(true);
    const purchases = await getAvailablePurchases();
    if (purchases?.length == 0) {
      setLoading(false);
      setLoader(false);
      alert('Theres no Subscription to Restore');
      return;
    }
    const isthisAvailable = purchases
      ?.filter(item => subscriptions?.includes(item?.productId))
      .sort((a, b) => a.transactionDate - b.transactionDate)[0];
    if (isthisAvailable) {
      const transactionId = isthisAvailable?.transactionId;
      const currentDate = new Date();
      const timeDifference =
        currentDate.getTime() -
        new Date(isthisAvailable?.transactionDate).getTime();
      const passedDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      if (passedDays > 30) {
        setLoader(false);
        alert('Subscription is Expired');
        return false;
      } else {
        const status = await enablePremiumApi(transactionId);
        if (status) {
          dispatch(dispatchIsPremiumUser(true));
          setPremiumModalVisible(false);
          setPremiumModalVisiblePractice(false);
          setLoader(false);
          bottomSheetModalRef.current.dismiss();

          return;
        }
        showPremiumError();
        setLoader(false);
        return true;
      }
    } else {
      alert('Theres no Active Subscription to Restore');
      setLoader(false);
    }
  };

  useEffect(() => {
    const getSubscriptionsOnLoad = async () => {
      initConnection()
        .catch(error => {
          console.log('Error connecting to store...', error);
        })
        .then(async () => {
          await getSubscriptions({skus: items})
            .catch(error => {
              console.log(
                '🚀 ~ file: index.jsx:120 ~ useEffect ~ error:',
                error,
              );
            })
            .then(res => {
              setProducts(res);
              if (Platform.OS === 'android') {
                setPremiumPrice(
                  res[0].subscriptionOfferDetails[0].pricingPhases
                    .pricingPhaseList[0].formattedPrice,
                );
              } else {
                setPremiumPrice(res[0].localizedPrice);
                setProducts(res);
              }
            });
        });

      purchaseErrorSubscription = purchaseErrorListener(error => {
        if (!(error['responseCode'] === '2')) {
          console.log(
            'Error',
            'There has been an error with your purchase ' + error['code'],
          );
        }
      });
      purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
        setPurchased(true);
      });

      return () => {
        try {
          purchaseUpdateSubscription.remove();
        } catch (error) {}
        try {
          purchaseErrorSubscription.remove();
        } catch (error) {}
        try {
          endConnection();
        } catch (error) {}
      };
    };
    getSubscriptionsOnLoad();
  }, []);

  const handleSubscription = async (productId, offerToken) => {
    const check = false;
    if (!check) {
      await requestSubscription({
        sku: productId?.sku,
        ...(offerToken && {
          subscriptionOffers: [{sku: productId?.sku, offerToken}],
        }),
      })
        .then(response => {
          const transactionId = response?.transactionId;
          if (transactionId) enablePremium(transactionId);
          return response;
        })
        .catch(error => {
          console.log(
            '🚀 ~ file: index.jsx:121 ~ handlePremiumButtonClick ~ error:',
            error,
            error?.message,
            error?.response,
          );
          setLoader(false);
          setLoading(false);
          return error;
        });
    } else {
      Alert.alert(
        'Estatest',
        'You Already Have Purchased this Product in your Apple ID',
      );
      return;
    }
  };

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current.present();
  };
  const closeQuizPageSheet = () => {
    quizPageSheet.current.dismiss();
  };

  const openPracticeSheet = () => {
    practiceSheet.current.present();
  };
  const closePracticeSheet = () => {
    practiceSheet.current.dismiss();
  };

  const openRemainder = () => {
    remainderRef.current.present();
  };

  const closeRemainderScreen = () => {
    remainderRef.current.dismiss();
  };

  useEffect(() => {
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        Alert.alert(
          t('overAll.updateTitle'),
          t('overAll.alertToupdate'),
          [
            {
              text: t('overAll.udpatebtn'),
              onPress: () => Linking.openURL(res.storeUrl),
            },
          ],
          {cancelable: false},
        );
        Linking.openURL(res.storeUrl);
        return;
      }
    });
  }, [focused]);

  return (
    <>
      <Animated.View
        entering={FadeIn.duration(350).delay(0)}
        style={{height: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#DEE6ED',
            borderBottomWidth: 2,
            ...(!iosPAD && {paddingVertical: hp(1)}),

            justifyContent: 'center',
          }}>
          {isFirstQuiz !== '0' && (
            <PremiumModal
              premiumPrice={premiumPrice}
              loading={loading}
              onClickGetPremium={handlePremiumButtonClick}
              premiumModalVisible={premiumModalVisible}
              setPremiumModalVisible={setPremiumModalVisible}
              restorePurchase={restorePurchase}
              onClickModalButton={async () => {
                setPremiumModalVisible(false);
                await AsyncStorage.setItem('isFirstTimeQuiz', '2');
              }}
            />
          )}
          {isFirstPractice !== '0' && (
            <PremiumModalPractice
              premiumPrice={premiumPrice}
              loading={loading}
              restorePurchase={restorePurchase}
              onClickGetPremium={handlePremiumButtonClick}
              premiumModalVisible={premiumModalVisiblePractice}
              setPremiumModalVisiblePractice={setPremiumModalVisiblePractice}
              onClickModalButton={async () => {
                setPremiumModalVisiblePractice(false);
                await AsyncStorage.setItem('isFirstTimePractice', '2');
              }}
            />
          )}
          <Image
            source={require('../../assets/images/houseBg.png')}
            style={styles.bgWrap}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.settings}
            onPress={async () => {
              toggleOpen();
            }}>
            <View style={styles.wrapIconImg}>
              <Image
                source={require('../../assets/images/menuIcon.png')}
                resizeMode="contain"
                style={{
                  ...styles.innerImg,
                  tintColor: isOpen ? 'white' : '#2FA2EB',
                }}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.hello}>
            {userDetails?.name === null || userDetails?.name === undefined
              ? t('home.hello') + '!'
              : t('home.hello') + ' ' + `${userDetails?.name}!`}
          </Text>
          <Text style={styles.ready}>{t('home.ready')}</Text>
          <Carousel
            setShowPageQuiz={setShowPageQuiz}
            openRemainder={openRemainder}
            examRemainder={examRemainder}
            openPracticeSheet={openPracticeSheet}
            handleOpenQuizPageSheet={handleOpenQuizPageSheet}
            navigation={navigation}
            onSwipe={setCurrentPage}
            onQuizClick={handleStartExamOpenBottomSheet}
            currentPage={currentPage}
          />
        </View>
        <View style={{flex: 1}}>
          <HomeWidget
            loading={loading}
            bottomSheetHandler={handleOpenBottomSheet}
            type={currentPage}
            setIsSelected={setIsSelected}
            isSelected={isSelected}
            isPremiumUser={isPremiumUser}></HomeWidget>
        </View>

        <BottomSheetModal
          ref={startExamBottomSheetModalRef}
          index={1}
          snapPoints={snapPoints2}
          enablePanDownToClose={true}
          animateOnMount={true}
          enableOverDrag={true}
          enableHandlePanningGesture={true}
          style={styles.quizStyle}
          backgroundStyle={{
            borderRadius: 30,
          }}
          handleStyle={{height: 0}}
          handleIndicatorStyle={{height: 0}}>
          <StartExamBottomSheetContent
            setExamRemainder={setExamRemainder}
            navigation={navigation}
            onClickButton={() => {
              startExamBottomSheetModalRef.current.close();
              setTimeout(() => {
                setCheckQuestionLoad(true);
                setShowPageQuiz(true);
                quizPageSheet.current.present();
              }, 50);
            }}
            onPressClose={() => startExamBottomSheetModalRef.current.close()}
          />
        </BottomSheetModal>

        <BottomSheetModal
          overDragResistanceFactor={10}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          enableOverDrag={false}
          draggable={false}
          ref={quizPageSheet}
          index={1}
          snapPoints={snapPoints3}
          enablePanDownToClose={checkQuestionLoad ? false : true}
          animateOnMount={true}
          style={{
            display: showPageQuiz ? 'block' : 'none',
            paddingHorizontal: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}
          backgroundStyle={{
            borderRadius: 30,
          }}
          handleIndicatorStyle={{display: 'none'}}
          // handleIndicatorStyle={{ backgroundColor: '#2E99E9', width: '15%' }}
        >
          <QuizPage
            closeQuestionSheet2={closeQuestionSheet2}
            openQuizModal={openQuizModal}
            setTriggerPremiumModal={setTriggerPremiumModal}
            setRefreshExamStates={setRefreshExamStates}
            setCheckQuestionLoad={setCheckQuestionLoad}
            setShowPageQuiz={setShowPageQuiz}
            navigation={navigation}
            useFocusEffect={useFocusEffect}
            closeQuizPageSheet={closeQuizPageSheet}
            closeQuizStartPage={closeQuizStartPage}
          />
        </BottomSheetModal>

        <BottomSheetModal
          overDragResistanceFactor={10}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          enableOverDrag={false}
          draggable={false}
          ref={practiceSheet}
          index={1}
          snapPoints={snapPoints3}
          enablePanDownToClose={checkQuestionLoad ? false : true}
          animateOnMount={true}
          style={{
            paddingHorizontal: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}
          backgroundStyle={{
            borderRadius: 30,
          }}
          handleIndicatorStyle={{display: 'none'}}>
          <QuizPagePractice
            closePracticeSheet2={closePracticeSheet2}
            openPracticeModal={openPracticeModal}
            setTriggerPremiumModal={setTriggerPremiumModal}
            setRefreshExamStates={setRefreshExamStates}
            closePracticeSheet={closePracticeSheet}
            setCheckQuestionLoad={setCheckQuestionLoad}
            navigation={navigation}
          />
        </BottomSheetModal>

        <BottomSheetModal
          ref={remainderRef}
          index={1}
          snapPoints={snapPoints3}
          enablePanDownToClose={true}
          animateOnMount={true}
          enableOverDrag={true}
          enableHandlePanningGesture={true}
          style={{
            paddingHorizontal: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}
          backgroundStyle={{
            borderRadius: 30,
          }}
          handleIndicatorStyle={{
            backgroundColor: '#2E99E9',
            width: '15%',
          }}>
          <Reminders
            closeRemainderScreen={closeRemainderScreen}
            navigation={navigation}
          />
        </BottomSheetModal>

        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            animateOnMount={true}
            enableOverDrag={true}
            enableHandlePanningGesture={true}
            style={styles.premiumBottomStyle}
            backgroundStyle={{
              borderRadius: 30,
            }}
            handleIndicatorStyle={{
              width: '0%',
              height: '0%',
            }}>
            <PremiumBottomSheetContent
              setLoader={setLoader}
              premiumPrice={premiumPrice}
              loading={loading}
              onClickGetPremium={handlePremiumButtonClick}
              onClose={closePremium}
              restorePurchase={handlePremiumButtonClick}
            />
          </BottomSheetModal>
        </BottomSheetModalProvider>
        {/* Drawer open button */}
        {isOpen && (
          <TouchableWithoutFeedback onPress={toggleOpen}>
            <Animated.View
              entering={FadeIn.duration(250)}
              style={styles.overlay}
            />
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
      <MenuDrawer
        style={{width: '100%'}}
        open={isOpen}
        position={'right'}
        drawerContent={
          <>
            <Drawer
              userDetails={userDetails}
              navigation={navigation}
              toggleOpen={toggleOpen}
              name={userDetails?.name}
            />
          </>
        }
        drawerPercentage={55}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      />
    </>
  );
}

export default Home;
