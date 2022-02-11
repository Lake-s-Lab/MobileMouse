import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    // backgroundColor: "green"
  },
  titleArea: {
    flex: 2,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 8,
    // backgroundColor: "blue",
    // justifyContent: "center",
    // alignItems: "center",
  },
  ipInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    padding: 10,
    margin: 10,
  },
  mousePad: {
    alignItems: "center",
    backgroundColor: "grey",
    width: "100%",
    height: "100%",
    marginBottom: 20,
    justifyContent: "center",
  },
  options: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  }
});
