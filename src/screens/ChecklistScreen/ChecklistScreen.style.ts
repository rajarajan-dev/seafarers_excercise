import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../theme";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.nav30, paddingHorizontal: 16 },
  floatingAddIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    position: "absolute",
    bottom: 30,
    right: 10,
    height: 100,
  },
  absolute: {
    flex: 1,
    backgroundColor: "transparent",
  },
  ListRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingLeft: 20,
    backgroundColor: "white",
  },
  contentPart: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowPart: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoBold,
    color: Colors.black,
    textAlign: "center",
  },

  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.grey600,
    textAlign: "center",
    marginTop: 16,
    fontFamily: Typography.fontFamily.RobotoRegular,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: Colors.grey600,
    textAlign: "center",
    marginTop: 8,
    fontFamily: Typography.fontFamily.RobotoRegular,
  },
});

export default styles;
