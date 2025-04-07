import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  backgroundBar: {
    ...StyleSheet.absoluteFillObject,
  },
  animatedBar: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  percentageContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default styles;
