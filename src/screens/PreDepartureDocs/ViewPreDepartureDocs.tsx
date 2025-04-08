import { SectionList, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientProgressBar from "../../components/GradientProgressBar";
import HorizontalList from "../../components/HorizontalList";
import styles from "./ViewPreDepartureDocs.style";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import IconBack from "../../assets/icons/iconBack.svg";

import {
  initializeIfEmpty,
  selectAllDocuments,
  updateDocumentStatus,
} from "../../store/preDepartureDocSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/stateManagementHooks";
import SwipeablePreDepartureSectionRow, {
  SwipeablePreDepartureSectionRowRef,
} from "../../components/SwipeablePreDepartureSectionRow";
import { DocumentItem } from "../../types/PreDepartureDocsTypes";

import IconPending from "../../assets/icons/iconExclamation.svg";
import IconDocument from "../../assets/icons/iconDocument.svg";
import IconDone from "../../assets/icons/iconDoneBlue.svg";
import IconSkipped from "../../assets/icons/iconSkip.svg";
import { formatDateToDDMMYY } from "../../helper/formatDateToDDMMYY";
import LineSeparator from "../../components/LineSeparator";

type ViewPreDepartureDocsProp = StackNavigationProp<
  RootStackParamList,
  "PreDepartureDocs"
>;

const ViewPreDepartureDocs = () => {
  const navigation = useNavigation<ViewPreDepartureDocsProp>();
  const dispatch = useDispatch();
  const data = useAppSelector(selectAllDocuments);

  const doneCount = data.filter(
    (doc) => doc.status === "Done" || doc.status === "Skipped"
  ).length;

  const progress =
    data.length > 0 ? Math.round((doneCount / data.length) * 100) : 0;

  const pendingStatuses = ["Submitted", "Pending", "Todo"];
  const doneStatuses = ["Done", "Skipped"];

  const pendingDocs = data.filter((doc) =>
    pendingStatuses.includes(doc.status)
  );
  const completedDocs = data.filter((doc) => doneStatuses.includes(doc.status));

  const [isScrollEnabled, setScrollEnabled] = useState(true);
  const rowRefs = useRef(new Map<string, SwipeablePreDepartureSectionRowRef>());
  const scrollRef = useRef<boolean>(true);

  const sections = [
    {
      title: "Pending",
      data: pendingDocs,
    },
    {
      title: "Completed",
      data: completedDocs,
    },
  ];

  const showEmptyState = sections.length === 0;

  useEffect(() => {
    dispatch(initializeIfEmpty());
  }, [dispatch]);

  const renderItem = ({ item }: { item: DocumentItem }) => {
    const handleStatusChange = (newStatus: DocumentItem["status"]) => {
      dispatch(updateDocumentStatus({ id: item.id, newStatus }));
    };

    const renderStatusIcon = () => {
      if (item.type == "AttentionRequired") {
        return <IconPending width={20} height={20} />;
      }

      switch (item.status) {
        case "Done":
          return <IconDone width={20} height={20} />;
        case "Skipped":
          return <IconSkipped width={20} height={20} />;
        default:
          return <IconDocument width={20} height={20} />;
      }
    };

    return (
      <SwipeablePreDepartureSectionRow
        key={item.id + item.status}
        ref={(ref) => {
          if (ref) {
            rowRefs.current.set(item.id, ref);
          } else {
            rowRefs.current.delete(item.id);
          }
        }}
        setScrolling={(enabled) => {
          scrollRef.current = enabled;
          setScrollEnabled(enabled);
        }}
        item={item}
        onStatusChange={handleStatusChange}
      >
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
              Issue date: {formatDateToDDMMYY(item.issueDate)}
            </Text>
            <Text style={styles.subText}>
              Exp. date: {formatDateToDDMMYY(item.expiryDate)}
            </Text>
          </View>
        </View>
      </SwipeablePreDepartureSectionRow>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ flex: 1 }}
          >
            <View style={styles.cancelContainer}>
              <IconBack height={25} width={25} />
              <Text style={styles.headerText}>
                Pre-Departure Documents List
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <GradientProgressBar progress={progress} height={10} />
        <HorizontalList />
        <Text style={{ marginVertical: 10 }}>
          Items should only be ticked off once the corresponding original paper
          document has been added to your Blue Pouch in preparation for
          departure.
        </Text>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={isScrollEnabled}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
              {title}
            </Text>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={() => <LineSeparator />}
          ItemSeparatorComponent={() => <LineSeparator />}
          ListEmptyComponent={
            showEmptyState ? (
              <Text style={styles.emptyText}>No items found</Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPreDepartureDocs;
