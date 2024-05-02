import { StyleSheet } from "react-native";
import { wp, hp, RFS } from "../../dimensions/dimensions";
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalView: {
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    height: hp(17),
    width: wp(75),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  upperPart: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(12),
    borderBottomColor: "#3C3C4336",
    borderBottomWidth: 1,
  },
  lowerPart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  wrapImgSocial: {
    width: hp(7),
    height: hp(7),
    alignSelf: "center",
    marginTop: hp(2),
    margin: wp(2),
  },
  innerImg: {
    width: "100%",
    height: "100%",
  },
  faceIDText: {
    fontSize: RFS(14),
    // fontWeight: "700",
    fontFamily: "Assistant",
    marginTop: hp(1),
    color: 'black',
  },
  faceIDTextTop: {
    fontSize: RFS(15),
    // fontWeight: "700",
    fontFamily: "Assistant-Light",
    marginTop: hp(1),
    color: 'black',
  },
  cancelText: {
    fontSize: RFS(15),
    fontWeight: "700",
    fontFamily: "Assistant-Bold",
    color: "#CA3E3E",
  },
  confirmText: {
    fontSize: RFS(15),
    fontWeight: "700",
    fontFamily: "Assistant-Bold",
    color: "#007AFF",
  },
  line: {
    width: 1,
    height: hp(5),
    borderLeftColor: "#3C3C4336",
    borderLeftWidth: 1,
  },
});

export default styles;
