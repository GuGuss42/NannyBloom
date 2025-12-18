// App.js
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import * as ScreenOrientation from "expo-screen-orientation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { seedUsers } from "./Functions/seed";
import { seedNannies } from "./Functions/seedNannies";

export default function App() {
  // 🔒 Lock portrait mode
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }, []);

  // 🌱 Seed data ONCE
  useEffect(() => {
    const seedOnce = async () => {
      try {
        const alreadySeeded = await AsyncStorage.getItem("seeded");

        if (!alreadySeeded) {
          await seedUsers();
          await seedNannies();
          await AsyncStorage.setItem("seeded", "true");
          console.log("🌱 Data seeded once");
        } else {
          console.log("✅ Data already seeded");
        }
      } catch (error) {
        console.error("❌ Seeding error:", error);
      }
    };

    seedOnce();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
