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
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    height: hp(17),
    width: hp(17),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: RFS(15),
    // fontWeight: "700",
    fontFamily: "Assistant-Bold",
    marginTop: hp(1),
  },
});

export default styles;
