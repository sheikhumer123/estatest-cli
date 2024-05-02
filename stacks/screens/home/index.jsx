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
} from 'react-native';
import {useTranslation} from 'react-i18next';
// import {LoaderContext} from './contexts/AppLoading';
import {Feather} from 'react-native-vector-icons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MenuDrawer from 'react-native-side-drawer';
import Animated, {FadeIn} from 'react-native-reanimated';
import {PremiumBottomSheetContent} from './premium';
import Drawer from './drawer';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StartExamBottomSheetContent} from './startExam';
import readyPic from '../../assets/images/ready.png';
import {
  getPracticeStatistics,
  getQuizStatistics,
  getUserDetails,
  updateToPremium,
  updateUserDetails,
} from '../../api/api';
import {PremiumModal} from './premiumModal';
import {PremiumModalPractice} from './premiumModalPractice';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {
  endConnection,
  getProducts,
  getSubscriptions,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestSubscription,
} from 'react-native-iap';
import {useDispatch, useSelector} from 'react-redux';
import {
  dispatchIsPremiumUser,
  dispatchUserDetails,
  dispatchPracticeStates,
  dispatchQuizStates,
} from '../../redux/actions';
import QuizPage from '../quiz';
import {LoaderContext} from '../../contexts/AppLoading';
import QuizPagePractice from '../practice';
import {ReactNativeBlobUtilFile} from 'react-native-blob-util';
import {hp} from '../../dimensions/dimensions';
import MainContext from '../../contexts/MainContext';
import Reminders from '../reminders';

// base plan id: [1m-estatestapp-39]
const items = Platform.select({
  ios: ['monthly_subs'],
  android: ['estatestapp_39_1m'],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;
function Home({navigation}) {
  const {notitfyScreen, refreshExamStates, setRefreshExamStates} =
    useContext(MainContext);

  const {userDetails, isPremiumUser, lang} = useSelector(
    state => state.userReducer,
  );
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
  const snapPoints4 = ['93%', '20%'];
  const quizPageSheet = useRef(null);
  const practiceSheet = useRef(null);
  const remainderRef = useRef(null);
  const {setLoader} = useContext(LoaderContext);

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

  // user information and token.
  const [user, setUser] = useState();
  const [userInfoAPI, setUserInfoAPI] = useState();
  const [token, setToken] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [showPageQuiz, setShowPageQuiz] = useState(true);
  const [checkQuestionLoad, setCheckQuestionLoad] = useState(true);
  const [examRemainder, setExamRemainder] = useState('');
  const [subscriptionActive, setSubscriptionActive] = useState(null);
  const [triggerPremiumModal, setTriggerPremiumModal] = useState(0);
  const [triggerPracticeModal, setTriggerPracticeModal] = useState(0);

  const openPracticeModal = () => {
    console.log('asdasd');
    setPremiumModalVisiblePractice(true);
    return;
  };

  const openQuizModal = () => {
    console.log('asdasd');
    setPremiumModalVisible(true);
    return;
  };

  useFocusEffect(
    useCallback(() => {
      const userInfoFun = async () => {
        const user = await AsyncStorage.getItem('user');
        const newUser = JSON.parse(user);
        setUser(newUser);
        const token = await AsyncStorage.getItem('token');
        setToken(token);
        const userInfo = await getUserDetails();

        dispatch(dispatchUserDetails(newUser));
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
  }, [startExamBottomSheetModalRef, navigation]);

  const handleStartExamOpenBottomSheet = () => {
    if (examRemainder == 'true') {
      quizPageSheet.current.present();
    } else {
      startExamBottomSheetModalRef.current.present();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const func = async () => {
        const firstTime = await AsyncStorage.getItem('isFirstTimeQuiz');
        const firstTimePractice = await AsyncStorage.getItem(
          'isFirstTimePractice',
        );
        setIsFirstQuiz(firstTime);
        setIsFirstPractice(firstTimePractice);
        if (isFirstQuiz === '1' && !isPremiumUser) {
          setPremiumModalVisible(true);
          return;
        }
        if (!isPremiumUser) {
          setPremiumModalVisible(true);
          return;
        }
        if (isFirstPractice === '1' && !isPremiumUser) {
          setPremiumModalVisiblePractice(true);
          return;
        }
      };
      func();
    }, [isFirstQuiz, isFirstPractice, triggerPremiumModal]),
  );

  const handlePremiumButtonClick = async () => {
    setLoader(true);
    let productId = {sku: products[0].productId};
    console.log({'productId------': productId});
    let offerToken =
      Platform.OS == 'ios'
        ? null
        : products[0]?.subscriptionOfferDetails[0]?.offerToken;
    if (!offerToken) {
      console.warn(
        `There are no subscription Offers for selected product ${productId}`,
      );
    }

    const purchased = await handleSubscription(productId, offerToken);
    console.log(
      '🚀 ~ file: index.jsx:113 ~ handlePremiumButtonClick ~ purchased:',
      purchased,
    );
    setLoader(false);
  };

  const closePremium = () => {
    bottomSheetModalRef.current.close();
  };
  // Subscriptions
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState({});

  useEffect(() => {
    purchaseListener();
  }, []);

  const purchaseListener = () => {
    purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      if (purchase) {
        dispatch(dispatchIsPremiumUser(true));
      } else {
        dispatch(dispatchIsPremiumUser(false));
      }
      console.log('purchaseUpdatedListener=============>', purchase);

      try {
      } catch (error) {
        console.log('purchaseListener ~ error:', error);
      }
    });
    purchaseErrorSubscription = purchaseErrorListener(error => {
      if (!error['responseCode'] === '2') {
        console.log('purchaseErrorListener=============>', error);
      }
    });
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
              console.log(res);
              setProducts(res);
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
    await requestSubscription({
      sku: productId?.sku,
      ...(offerToken && {
        subscriptionOffers: [{sku: productId?.sku, offerToken}],
      }),
    })
      .then(response => {
        console.log(response);
        if (response) {
        }
        return response;
      })
      .catch(error => {
        console.log(
          '🚀 ~ file: index.jsx:121 ~ handlePremiumButtonClick ~ error:',
          error,
        );
        return error;
      });
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
  return (
    <>
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#DEE6ED',
            borderBottomWidth: 2,
            paddingVertical: hp(1),
          }}>
          {isFirstQuiz !== '0' && (
            <PremiumModal
              onClickGetPremium={handlePremiumButtonClick}
              premiumModalVisible={premiumModalVisible}
              setPremiumModalVisible={setPremiumModalVisible}
              onClickModalButton={async () => {
                setPremiumModalVisible(false);
                await AsyncStorage.setItem('isFirstTimeQuiz', '2');
              }}
            />
          )}
          {/* Premium Modal after First time Quiz done. */}
          {isFirstPractice !== '0' && (
            <PremiumModalPractice
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
            onPress={() => {
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
            openQuizModal={openQuizModal}
            setTriggerPremiumModal={setTriggerPremiumModal}
            setRefreshExamStates={setRefreshExamStates}
            setCheckQuestionLoad={setCheckQuestionLoad}
            setShowPageQuiz={setShowPageQuiz}
            navigation={navigation}
            useFocusEffect={useFocusEffect}
            closeQuizPageSheet={closeQuizPageSheet}
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
          handleIndicatorStyle={{display: 'none'}}
          // handleIndicatorStyle={{ backgroundColor: '#2E99E9', width: '15%' }}>
        >
          <QuizPagePractice
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
              onClickGetPremium={handlePremiumButtonClick}
              onClose={closePremium}
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
      </View>
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
