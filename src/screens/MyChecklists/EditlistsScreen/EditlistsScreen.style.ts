import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Typography.fontFamily.RobotoBold,
    fontSize: 18,
    marginBottom: 20,
    color: "#000000DE",
    textAlign: "left",
  },
  addItemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    gap: 8,
  },
  addItemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.white,
    fontSize: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  saveButton: {
    borderRadius: 8,
    flex: 1,
  },
  cancelButton: {
    borderRadius: 8,
    flex: 1,
  },

  disabledButton: {
    opacity: 0.6,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    fontFamily: Typography.fontFamily.RobotoRegular,
    fontSize: 14,
  },
  circleContainer: {
    marginLeft: 10,
  },
});
