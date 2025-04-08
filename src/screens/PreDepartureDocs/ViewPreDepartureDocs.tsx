import { SectionList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientProgressBar from "../../components/GradientProgressBar";
import HorizontalList from "../../components/HorizontalList";
import styles from "./ViewPreDepartureDocs.style";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import IconBack from "../../assets/icons/iconBack.svg";
import { DocumentRow } from "../../components/DocumentRow";
import PreDepartureDocList from "../../mocks/PreDepartureDocList";
import {
  initializeIfEmpty,
  selectAllDocuments,
} from "../../store/preDepartureDocSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/stateManagementHooks";

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

  useEffect(() => {
    dispatch(initializeIfEmpty());
  }, [dispatch]);

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
          renderItem={({ item }) => (
            <DocumentRow item={item} categoryId={"pre-departure"} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
              {title}
            </Text>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPreDepartureDocs;
