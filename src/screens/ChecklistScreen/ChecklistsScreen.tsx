import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Modal,
  StyleSheet,
  Text,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import CustomHeader from "../../components/atoms/CustomHeader";
import styles from "./ChecklistScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleAndSubtitleSection from "../../components/atoms/TitleAndSubtitleSection";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/stateManagementHooks";
import IconAdd from "../../assets/icons/iconAdd.svg";
import ChecklistItemRenderer from "../../components/organisms/ChecklistItemRenderer";
import AddNewChecklistScreen from "../MyChecklists/AddNewChecklistScreen/AddNewChecklistScreen";
import { BlurView } from "@react-native-community/blur";
import {
  removeCheckListCategory,
  selectMyCheckList,
} from "../../store/mychecklistSlice";
import { Colors } from "../../theme";
import IconArrow from "../../assets/icons/iconArrow.svg";
import IconDocument from "../../assets/icons/iconDocument.svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  initializeIfEmpty,
  selectAllDocuments,
} from "../../store/preDepartureDocSlice";
import { useLoading } from "../../context/LoadingContext";
import withLoading from "../../hoc/withLoading";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef<FlatList>(null);
  const scrollRef = useRef<boolean>(true);

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectMyCheckList);

  const preDapartureData = useAppSelector(selectAllDocuments);

  const doneCount = preDapartureData.filter(
    (doc) => doc.status === "Done" || doc.status === "Skipped"
  ).length;

  const progress =
    preDapartureData.length > 0
      ? Math.round((doneCount / preDapartureData.length) * 100)
      : 0;

  const handleDelete = (id: string) => {
    dispatch(removeCheckListCategory({ titleId: id }));
  };

  const circularRef = useRef<AnimatedCircularProgress>(null);

  useEffect(() => {
    circularRef.current?.animate(progress, 1000); // 1000ms = 1 second
  }, [progress]);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    dispatch(initializeIfEmpty());
    showLoading();
    const timer = setTimeout(() => {
      hideLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={"Checklists"} showBackButton />
      <TitleAndSubtitleSection
        title="Pre-Departure Documents List"
        subTitle="List of all required documents for your upcoming assignment"
        style={{ marginTop: 38 }}
      />

      <TouchableOpacity onPress={() => navigation.navigate("PreDepartureDocs")}>
        <View style={{ height: 80, marginTop: 12 }}>
          <View style={styles.ListRow}>
            <View style={styles.contentPart}>
              <AnimatedCircularProgress
                ref={circularRef}
                size={41}
                width={5}
                fill={progress}
                tintColor={Colors.marlowBlue}
                backgroundColor="transparent"
                rotation={0}
                lineCap="square"
                duration={1000}
                onAnimationComplete={() => {}}
              >
                {(fill: number) => {
                  return (
                    <Text style={styles.progressText}>{Math.round(fill)}%</Text>
                  );
                }}
              </AnimatedCircularProgress>
              <Text style={{ marginLeft: 12 }}>Review List </Text>
            </View>
            <View style={styles.arrowPart}>
              <IconArrow width={15} height={15} fill={Colors.grey600} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TitleAndSubtitleSection
        title="My Checklists"
        subTitle="Create your own personal checklist"
        style={{ marginTop: 24 }}
      />
      {data && (
        <FlatList
          data={data.data}
          keyExtractor={(title) => title.titleId}
          style={{ marginTop: 10 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 12,
                backgroundColor: "transparent",
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <IconDocument width={48} height={48} fill={Colors.grey600} />
              <Text style={styles.emptyStateText}>
                No checklists created yet
              </Text>
              <Text style={styles.emptyStateSubText}>
                Tap the + button to create your first checklist
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ChecklistItemRenderer
              checkListCategory={item}
              onDelete={handleDelete}
              setScrolling={(enabled) => {
                scrollRef.current = enabled;
                listRef.current?.setNativeProps({ scrollEnabled: enabled });
              }}
            />
          )}
          ref={listRef}
        />
      )}

      {/* Floating Button to Open Modal */}
      <TouchableOpacity
        style={styles.floatingAddIcon}
        onPress={() => setModalVisible(true)}
      >
        <IconAdd width={70} height={70} />
      </TouchableOpacity>

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
          <AddNewChecklistScreen setModalVisible={setModalVisible} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default withLoading(ChecklistsScreen);
