import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nav30,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.RobotoBold,
    marginTop: 15,
    marginBottom: 20,
    flexShrink: 1,
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: "#4A6FA5",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  completedItemText: {
    color: Colors.grey600,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.RobotoMedium,
    marginRight: 8,
  },
  sectionCountText: {
    fontSize: 14,
    color: "#666",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
  itemText: {
    flex: 1,
    marginRight: 16,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 8,
    borderBottomWidth: 0,
    marginLeft: 18,
    fontFamily: Typography.fontFamily.RobotoRegular,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
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
  circle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: Colors.marlowBlue,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
