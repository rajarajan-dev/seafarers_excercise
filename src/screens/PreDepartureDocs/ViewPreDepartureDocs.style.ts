import { StyleSheet } from "react-native";

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
    backgroundColor: "#d0e7f9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    borderColor: "#4a90e2",
    borderWidth: 1,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 24,
    marginRight: 8,
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
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
  optional: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  subText: {
    fontSize: 12,
    color: "#333",
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
});

export default styles;
