// App.js
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import * as ScreenOrientation from "expo-screen-orientation";

import { seedUsers } from "./Functions/seed";
import { seedNannies } from "./Functions/seedNannies";

export default function App() {
  useEffect(() => {
    // Lock portrait mode
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    // Seed data once
    seedUsers(); 
    seedNannies();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
