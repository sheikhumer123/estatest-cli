import { StyleSheet } from "react-native";
import { wp, hp, RFS } from "../../dimensions/dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  signInButton: {
    flexDirection: "row",
    width: wp(90),
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3389e9",
    marginTop: hp(5),
    borderRadius: 50,
  },
  txtConnect: {
    color: "#0A0615",
    fontWeight: "700",
    fontSize: RFS(32),
    textAlign: "center",
    marginTop: hp(3),
  },
  widthWrap: {
    width: "90%",
    alignSelf: "center",
    marginTop: hp(12),
  },
  wrapImgSocial: {
    width: wp(10),
    height: wp(10),
    alignSelf: "center",
    marginTop: hp(2),
    margin: wp(2),
  },
  innerImg: {
    width: "100%",
    height: "100%",
  },

  flexRow: {
    flexDirection: "row",
    alignSelf: "center",
  },

  signInStyle: {
    color: "white",
    fontSize: RFS(16),
  },
  dontHaveStyle: {
    color: "black",
    fontSize: RFS(14),
  },
  buttonText: {
    fontSize: RFS(16),
    fontWeight: "bold",
    marginLeft: hp(1),
  },
  title: {
    fontSize: RFS(20),
    fontWeight: "bold",
    marginBottom: 16,
  },
  logo: {
    flexDirection: "column",
    height: hp(20),
    width: hp(20),
    borderRadius: 15,
    marginBottom: 25,
  },
  inputStyle: {
    height: hp(5),
    width: wp(90),
    color: "black",
    borderColor: "#3389e9",
    borderWidth: 1,
    paddingHorizontal: hp(2),
    borderRadius: 30,
    marginTop: hp(2),
    fontSize: RFS(12),
  },
  signUpButton: {
    marginTop: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    marginLeft: hp(0.5),
    color: "#3389e9",
    fontSize: RFS(14),
  },
});

export default styles;
