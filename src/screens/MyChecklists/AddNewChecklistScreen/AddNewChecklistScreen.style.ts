import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000CC", // Dark Transparent Background
  },
  insideContainer: {
    marginHorizontal: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleContainer: {
    marginLeft: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    marginRight: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  titleInputBox: {
    backgroundColor: "white",
    borderRadius: 10,
    minHeight: 80,
    marginTop: 50,
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 15,
  },
});
