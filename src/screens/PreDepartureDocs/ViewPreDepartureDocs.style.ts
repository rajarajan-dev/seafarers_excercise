import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
  },
  cancelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: Typography.fontFamily.RobotoBlack,
    flex: 1,
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

  card: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
    borderBottomWidth: 0,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 24,
    marginRight: 16,
    marginTop: 2,
  },
  detailsContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoRegular,
    flexShrink: 1,
  },
  optional: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoRegular,
    color: Colors.grey700,
  },
  subText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoRegular,
    color: "black",
    marginTop: 2,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },

  absolute: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default styles;
