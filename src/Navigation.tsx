import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ChecklistsScreen from "./screens/ChecklistScreen/ChecklistsScreen";
import ViewlistsScreen from "./screens/MyChecklists/ViewlistScreen/ViewlistsScreen";
import EditlistsScreen from "./screens/MyChecklists/EditlistsScreen/EditlistsScreen";
import { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Checklists">
        <Stack.Screen
          name="Checklists"
          component={ChecklistsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Viewlists"
          component={ViewlistsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editlists"
          component={EditlistsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
