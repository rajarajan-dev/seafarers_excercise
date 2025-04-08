import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { DocumentItem, DocumentStatus } from "../types/PreDepartureDocsTypes";
import { updateDocumentStatus } from "../store/preDepartureDocSlice"; // adjust path if needed

import IconPending from "../assets/icons/iconExclamation.svg";
import IconDocument from "../assets/icons/iconDocument.svg";
import IconDone from "../assets/icons/iconDoneBlue.svg";
import IconSkipped from "../assets/icons/iconSkip.svg";

interface Props {
  item: DocumentItem;
  categoryId: string;
}

export const DocumentRow: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();

  const handleAction = (newStatus: DocumentStatus) => {
    dispatch(updateDocumentStatus({ id: item.id, newStatus }));
  };

  const renderStatusIcon = () => {
    switch (item.status) {
      case "Pending":
        return <IconPending width={20} height={20} />;
      case "Done":
        return <IconDone width={20} height={20} />;
      case "Skipped":
        return <IconSkipped width={20} height={20} />;
      default:
        return <IconDocument width={20} height={20} />;
    }
  };

  const renderAction = () => {
    const { type, status } = item;

    if (status === "Todo") {
      if (type === "Mandatory") {
        return <Button title="Done" onPress={() => handleAction("Done")} />;
      }

      if (type === "Optional") {
        return (
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button title="Done" onPress={() => handleAction("Done")} />
            <Button title="Skipped" onPress={() => handleAction("Skipped")} />
          </View>
        );
      }

      if (type === "AttentionRequired") {
        return (
          <Button title="Submitted" onPress={() => handleAction("Submitted")} />
        );
      }
    }

    if (status === "Submitted" && type === "AttentionRequired") {
      return (
        <Text style={{ color: "#aaa", fontStyle: "italic" }}>
          No action available
        </Text>
      );
    }

    if (status === "Done" || status === "Skipped") {
      if (type === "Mandatory" || type === "Optional") {
        return <Button title="Uncheck" onPress={() => handleAction("Todo")} />;
      }
    }

    return null;
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <View style={styles.iconContainer}>{renderStatusIcon()}</View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.name}</Text>
            {item.type === "Optional" && (
              <Text style={styles.optional}>(Optional)</Text>
            )}
          </View>
          <Text style={styles.subText}>
            {item.nationality}, {item.docNumber}
          </Text>
        </View>
      </View>

      <View style={styles.dateRow}>
        <Text style={styles.subText}>
          Issue date: {formatDate(item.issueDate)}
        </Text>
        <Text style={styles.subText}>
          Exp. date: {formatDate(item.expiryDate)}
        </Text>
      </View>

      <View>{renderAction()}</View>
    </View>
  );
};

// Utility to format date as DD.MM.YYYY
const formatDate = (date?: string) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}.${String(
    d.getMonth() + 1
  ).padStart(2, "0")}.${d.getFullYear()}`;
};

const styles = StyleSheet.create({
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
});
