import { StyleSheet } from "react-native";
import { wp, hp, RFS } from "../../dimensions/dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    flexDirection: "row",
    width: wp(50),
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000010",
    margin: 5,
    borderRadius: 50,
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: RFS(16),
    fontWeight: "500",
    marginLeft: hp(1),
  },
  title: {
    fontSize: RFS(20),
    fontWeight: "bold",
    marginBottom: 16,
  },
  logo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: hp(25.1),
    width: hp(25.1),
    borderRadius: 15,
    marginBottom: 25,
  },
});

export default styles;
