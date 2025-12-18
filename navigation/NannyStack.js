// navigation/NannyStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NannyHome from "../screens/NannyHome";

const Stack = createNativeStackNavigator();

export default function NannyStack({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NannyHome">
        {(props) => <NannyHome {...props} onLogout={onLogout} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
