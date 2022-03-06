import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CoinDetailedScreen from "../screens/CoinDetailedScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import AddNewAssetScreen from "../screens/AddNewAssetScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetailedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewAsset"
        component={AddNewAssetScreen}
        options={{
          title: "Add New Asset",
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#121212",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
