import { StyleSheet } from "react-native";
import { Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: Colors.primary,
    textAlign: "center",
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
  list: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  itemInput: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 8,
    borderBottomWidth: 0,
    borderBottomColor: Colors.borderLight,
  },
  disabledButton: {
    opacity: 0.6,
  },
});