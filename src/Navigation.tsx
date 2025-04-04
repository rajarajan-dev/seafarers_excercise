import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ChecklistsScreen from "./screens/ChecklistsScreen";
import ViewlistsScreen from "./screens/ViewlistsScreen";
import EditlistsScreen from "./screens/EditlistsScreen";
import { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Checklists">
        <Stack.Screen name="Checklists" component={ChecklistsScreen} />
        <Stack.Screen name="Viewlists" component={ViewlistsScreen} />
        <Stack.Screen name="Editlists" component={EditlistsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
