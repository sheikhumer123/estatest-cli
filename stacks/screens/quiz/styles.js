import { StyleSheet, Dimensions, Platform } from "react-native";
import { RFS, hp, wp } from "../../dimensions/dimensions";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  questionContainer: {
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "column",
    // justifyContent: "space-between",
    // marginTop: hp(5),
    backgroundColor: "white",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    elevation: 10,
    // marginTop: hp(7),
  },
  replace: {
    paddingVertical: hp(2),
  },
  endOfTest: {
    alignItems: "flex-end",
    marginRight: wp(5),
    marginBottom: hp(2),
  },
  topMargin: {
    marginTop: hp(2),
  },
  cancelText: {
    color: "#CA3839",
    fontSize: RFS(13),
    fontFamily: "Assistant",
  },
  bgWrap: {
    width: "100%",
    height: "80%",
    position: "absolute",
    top: 0,
  },
  questionText: {
    fontSize: RFS(13),
    textAlign: "right",
    // fontWeight: '600',
    paddingHorizontal: wp(6),
    marginBottom: hp(2),
    fontFamily: "Assistant-Bold",
    color: "black",
    letterSpacing: 0.5,
  },
  answerText1: {
    fontSize: RFS(16),
    textAlign: "right",
    // fontWeight: 'bold',
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
    fontFamily: "Assistant-Regular",
    color: "black",
  },
  answer: {
    flexDirection: "row-reverse",
    minHeight: 55,
    paddingBottom: 5,
    paddingHorizontal: wp(7),
    marginVertical: hp(1),
  },
  answer1: {
    flexDirection: "row-reverse",
    minHeight: 55,
    paddingBottom: 5,
    marginVertical: 3,
  },
  answerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  answersBottomSheetContent: {
    backgroundColor: "#00000000",
    paddingHorizontal: 5,
    shadowColor: "#00000050",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  answerButton: {
    borderRadius: 50,
    height: hp(5),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  answerButton1: {
    borderRadius: 100,
    height: hp(5),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4D4D4",
  },
  answerIndex: {
    fontWeight: "bold",
    color: "white",
    fontSize: RFS(15),
    fontFamily: "Assistant-Regular",
  },
  answerIndex1: {
    fontWeight: "bold",
    color: "white",
    fontSize: RFS(16),
    fontFamily: "Assistant-Regular",
    // paddingHorizontal: wp(5),
    // marginBottom: hp(2),
  },
  answerText: {
    fontSize: RFS(14),
    fontWeight: "600",
    textAlign: "right",
    flexGrow: 1,
    paddingRight: 15,
    paddingLeft: 50,
    maxWidth: "100%",
    textAlignVertical: "center",
    fontFamily: "Assistant-Regular",
    color: "black",
  },

  questionControlsButton: {
    borderWidth: 2,
    borderColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    // width: Platform.OS === 'android' ? '35%' : '35%',
    borderRadius: 50,
    maxWidth: "35%",
    marginHorizontal: 15,
  },
  questionControlsButtonQuiz: {
    borderWidth: 2,
    borderColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    // width: Platform.OS === 'android' ? '35%' : '35%',
    borderRadius: 50,
    marginHorizontal: 10,
    flex: 1,
  },
  questionControlsButtonQuizSingle: {
    borderWidth: 2,
    borderColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    width: Platform.OS === "android" ? "35%" : "35%",
    borderRadius: 50,
    marginHorizontal: 10,
  },

  questionControlsButton2: {
    borderWidth: 2,
    borderColor: "#2196F3",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    width: Platform.OS === "android" ? "35%" : "35%",
    borderRadius: 50,
    maxWidth: "35%",
  },
  questionControlsButton2Result: {
    borderWidth: 2,
    borderColor: "#C5C8CA",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    width: Platform.OS === "android" ? "35%" : "35%",
    borderRadius: 50,
    maxWidth: "35%",
  },
  nextButtonText: {
    // color: "#2196F3",
    color: "#155B96",
    fontSize: RFS(14),
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Assistant-Regular",
  },
  nextButtonText2: {
    // color: "#2196F3",
    color: "#C5C8CA",
    fontSize: RFS(14),
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Assistant-Regular",
  },
  previousButtonText: {
    color: "#C5C8CA",
    fontSize: RFS(14),
    fontFamily: "Assistant-Regular",
    textAlign: "center",
    fontWeight: "700",
  },
  resultsContainer: {
    marginTop: hp(1),
    display: "flex",
    flex: 1,
  },
  resultsTitle: {
    fontSize: RFS(25),
    fontWeight: "bold",
    textAlign: "center",
    color: "#309BEA",
    fontFamily: "Assistant-Regular",
  },
  resultsTitleMini: {
    marginTop: hp(1),
    fontSize: RFS(20),
    fontWeight: "700",
    textAlign: "center",
    color: "#309BEA",
    fontFamily: "Assistant-Regular",
  },
  resultsSubtitle: {
    marginTop: hp(0),
    fontSize: RFS(20),
    fontFamily: "Assistant-Regular",
    textAlign: "center",
    color: "#309BEA",
  },
  resultsList: {},
  resultsQuestion: {
    textAlign: "right",
    maxWidth: Dimensions.get("window").width - 120,
  },
  resultsQuestion1: {
    textAlign: "right",
    maxWidth: Dimensions.get("window").width - 120,
    // backgroundColor:'red',
  },
  resultEnterQuestionIcon: {
    marginTop: 7,
    position: "absolute",
    right: 30,
  },
  separator: {
    marginVertical: 0,
    height: 2,
    width: "100%",
    backgroundColor: "#DEE6ED",
  },
  questionControls: {
    paddingVertical: hp(3),
    flexDirection: "row",
    paddingHorizontal: wp(2),
    alignItems: "center",
    justifyContent: "space-evenly",
    width: wp("100%"),
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  previousButton: {
    marginLeft: 5,
    borderColor: "#C5C8CA",
  },
  timerText: {
    textAlign: "center",
    color: "#2196F3",
    fontSize: RFS(20),
    fontFamily: "Assistant-Bold",
    letterSpacing: 2,
  },
  timerContainer: {
    width: "100%",
    paddingVertical: hp(2),
    paddingHorizontal: 10,
    alignSelf: "center",
    borderRadius: 20,
    // backgroundColor: 'red'
  },
  legislationBook: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  legislationBookLabel: {
    fontSize: RFS(9),
    lineHeight: 15,
    color: "#2196F3",
    fontWeight: "bold",
  },
  questionNumber: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFS(18),
    marginBottom: 15,
  },
  scrollViewContainer: {
    flexDirection: "row-reverse",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // marginTop: 20,
    // backgroundColor: "red",
    paddingStart: wp(44),
    alignContent: "center",
  },
  bubble: {
    backgroundColor: "#d4d4d4",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeBubble: {
    backgroundColor: "#2196F3",
    borderRadius: 25,
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  text: {
    color: "white",
    fontSize: RFS(18),
  },
  activeText: {
    color: "white",
    fontSize: RFS(18),
    fontWeight: "bold",
  },
  navbar: {
    marginBottom: 5,
    direction: "ltr",
    height: 70,
  },
  collapseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  collapseButtonText: {
    fontSize: RFS(16),
    color: "#888888",
    paddingLeft: 5,
    paddingBottom: 6,
  },
  collapseButtonIcon: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  imageStyle: {
    height: hp(4),
    width: hp(4),
  },
  bubbleContainer: {
    width: 55,
    alignItems: "center",
    justifyContent: "flex-end",
    // marginRight: wp(50)
  },
  line: {
    marginTop: hp(1),
    height: 2,
    width: 55,
  },
  line1: {
    marginTop: hp(1),
    height: 2,
    width: 55,
    backgroundColor: "#D4D4D450",
  },
  tickContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#2196F320",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  tickImage: {
    height: 20,
    width: 20,
  },
  mainContainerAnswers: {
    width: wp(85),
    paddingHorizontal: 10,
    marginVertical: hp(1),
    borderBottomColor: "#D4D4D450",
    borderBottomWidth: 1,
    alignSelf: "center",
    paddingBottom: 10,
  },
  answerContainerStyle: {
    flexDirection: "row-reverse",
    minHeight: 55,
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  arrowUpImageStyle: {
    height: hp(2),
    width: hp(2),
    alignSelf: "center",
  },
  navigationContainerDistance: {
    marginTop: 10,
  },
  pdf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default styles;
