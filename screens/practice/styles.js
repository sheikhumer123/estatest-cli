import { StyleSheet, Dimensions } from "react-native";
import { RFS } from "../../dimensions/dimensions";

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  bgWrap: {
    width: "100%",
    height: "80%",
    position: "absolute",
    top: 0,
    // marginTop: hp(2),
  },
  questionContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: RFS(18),
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
  answer: {
    flexDirection: "row-reverse",
    minHeight: 55,
    paddingBottom: 5,
  },
  answerContainer: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  answerButton: {
    padding: 10,
    borderRadius: 100,
    maxWidth: 40,
    minWidth: 40,
    maxHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#D64242",
  },
  answerIndex: {
    fontWeight: "bold",
    color: "white",
    fontSize: RFS(16),
  },
  answerText: {
    fontSize: RFS(18),
    textAlign: "right",
    flexGrow: 1,
    paddingRight: 15,
    paddingLeft: 50,
    maxWidth: "100%",
    textAlignVertical: "center",
  },

  questionControlsButton: {
    borderWidth: 2,
    borderColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    borderRadius: 50,
    maxWidth: "50%",
  },
  nextButtonText: {
    color: "#2196F3",
    fontSize: RFS(16),
    textAlign: "center",
  },
  previousButtonText: {
    color: "#B4B4B4",
    fontSize: RFS(16),
    textAlign: "center",
  },
  resultsContainer: {
    paddingTop: 20,
  },
  resultsTitle: {
    fontSize: RFS(30),
    fontWeight: "bold",
    textAlign: "center",
    color: "#309BEA",
  },
  resultsSubtitle: {
    fontSize: RFS(20),
    textAlign: "center",
    color: "#309BEA",
  },
  resultsList: {
    marginTop: 25,
    height: "70%",
    width: "100%",
  },
  resultsQuestion: {
    textAlign: "right",
    maxWidth: Dimensions.get("window").width - 120,
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
    height: 80,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  previousButton: {
    marginLeft: 5,
    borderColor: "#B4B4B4",
  },
  timerText: {
    textAlign: "center",
    color: "#2196F3",
    fontSize: RFS(18),
    fontWeight: "bold",
  },
  timerContainer: {
    width: 95,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "center",
    borderRadius: 20,
  },
  legislationBook: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  legislationBookLabel: {
    lineHeight: 25,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bubble: {
    backgroundColor: "#d4d4d4",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeBubble: {
    backgroundColor: "#2196F3",
    borderRadius: 25,
    width: 50,
    height: 50,
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
    direction: "rtl",
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
});

export default styles;
