import {
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientProgressBar from "../../components/molecules/GradientProgressBar";
import HorizontalList from "../../components/atoms/HorizontalList";
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
} from "../../components/organisms/SwipeablePreDepartureSectionRow";
import {
  DocumentItem,
  DocumentStatus,
} from "../../types/PreDepartureDocsTypes";

import IconPending from "../../assets/icons/iconExclamation.svg";
import IconDocument from "../../assets/icons/iconDocument.svg";
import IconDone from "../../assets/icons/iconDoneBlue.svg";
import IconSkipped from "../../assets/icons/iconSkip.svg";
import IconPendingApproval from "../../assets/icons/iconApprovalPending.svg";

import {
  formatDate,
  formatDateToDDMMYY,
} from "../../helper/formatDateToDDMMYY";
import LineSeparator from "../../components/atoms/LineSeparator";
import { Colors, Typography } from "../../theme";
import ConfirmationDialog from "../../components/molecules/ConfirmationDialog";
import { BlurView } from "@react-native-community/blur";
import withLoading from "../../hoc/withLoading";
import { useLoading } from "../../context/LoadingContext";

type ViewPreDepartureDocsProp = StackNavigationProp<
  RootStackParamList,
  "PreDepartureDocs"
>;

const ViewPreDepartureDocs = () => {
  const navigation = useNavigation<ViewPreDepartureDocsProp>();
  const dispatch = useDispatch();
  const data = useAppSelector(selectAllDocuments);

  const { showLoading, hideLoading } = useLoading();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<{
    id: string;
    newStatus: DocumentStatus;
  } | null>(null);

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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const submitPendingDocument = () => {
    showLoading();
    currentItem &&
      dispatch(
        updateDocumentStatus({
          id: currentItem.id,
          newStatus: currentItem.newStatus,
        })
      );
    timerRef.current = setTimeout(() => {
      hideLoading();
    }, 2000);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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

  const renderItem = ({
    item,
    section,
  }: {
    item: DocumentItem;
    section: { title: string };
  }) => {
    const handleStatusChange = (newStatus: DocumentItem["status"]) => {
      if (newStatus === "Submitted") {
        setCurrentItem({ id: item.id, newStatus });
        setModalVisible(true);
      } else {
        dispatch(updateDocumentStatus({ id: item.id, newStatus }));
      }
    };

    const renderStatusIcon = () => {
      if (item.type == "AttentionRequired" && item.status === "Todo") {
        return <IconPending width={24} height={24} />;
      }

      if (item.type == "AttentionRequired" && item.status === "Submitted") {
        return <IconPendingApproval width={24} height={24} />;
      }

      switch (item.status) {
        case "Done":
          return <IconDone width={24} height={24} />;
        case "Skipped":
          return <IconSkipped width={24} height={24} />;
        default:
          return <IconDocument width={24} height={24} />;
      }
    };

    // Determine if this item is in the completed section
    const isCompleted = section.title === "Completed";

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
                <Text
                  style={[
                    styles.title,
                    isCompleted && { color: Colors.grey600 },
                  ]}
                >
                  {item.name}
                </Text>
                {item.type === "Optional" && (
                  <Text
                    style={[
                      styles.optional,
                      isCompleted && { color: Colors.grey600 },
                    ]}
                  >
                    (Optional)
                  </Text>
                )}
              </View>
              {item.nationality && item.docNumber ? (
                <Text
                  style={[
                    styles.subText,
                    isCompleted && { color: Colors.grey600 },
                  ]}
                >
                  {item.nationality}, {item.docNumber}
                </Text>
              ) : null}
              <View style={styles.dateRow}>
                <Text
                  style={[
                    styles.optional,
                    isCompleted && { color: Colors.grey600 },
                  ]}
                >
                  Issue date: {formatDate(item.issueDate)}
                </Text>
                <Text
                  style={[
                    styles.optional,
                    isCompleted && { color: Colors.grey600 },
                  ]}
                >
                  Exp. date: {formatDate(item.expiryDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SwipeablePreDepartureSectionRow>
    );
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && currentItem) {
      submitPendingDocument();
    }
    // Close the modal regardless of confirmation
    setModalVisible(false);
    setCurrentItem(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
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
          <View style={{ marginTop: 20 }}>
            <GradientProgressBar progress={progress} height={8} />
          </View>
          <HorizontalList />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.nav30,
          }}
        >
          <Text
            style={{
              margin: 16,
              marginLeft: 24,
              fontFamily: Typography.fontFamily.RobotoItalic,
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            Items should only be ticked off once the corresponding original
            paper document has been added to your Blue Pouch in preparation for
            departure.
          </Text>

          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={isScrollEnabled}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={{
                  fontFamily: Typography.fontFamily.RobotoBold,
                  fontSize: 14,
                  marginLeft: 24,
                  marginTop: 10,
                  marginBottom: 8, // Add some bottom margin
                  backgroundColor: Colors.nav30, // Match background
                  zIndex: 1, // Ensure header stays above items
                }}
              >
                {title}
              </Text>
            )}
            contentContainerStyle={{
              paddingBottom: 30, // Increased padding
              paddingTop: 8, // Add some top padding
            }}
            ListFooterComponent={() => (
              <View style={{ height: 60 }} /> // Footer spacer
            )}
            ItemSeparatorComponent={() => <LineSeparator />}
            ListEmptyComponent={
              showEmptyState ? (
                <Text style={styles.emptyText}>No items found</Text>
              ) : null
            }
            stickySectionHeadersEnabled={false}
            style={{ flex: 1 }} // Ensure SectionList takes full height
          />
        </View>
      </View>
      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.absolute}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <ConfirmationDialog handleConfirmation={handleConfirmation} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default withLoading(ViewPreDepartureDocs);
