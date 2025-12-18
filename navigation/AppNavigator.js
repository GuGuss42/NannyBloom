// navigation/AppNavigator.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthStack from "./AuthStack";
import ParentTabs from "./ParentsTabs";
import NannyStack from "./NannyStack";

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const session = await AsyncStorage.getItem("userSession");
      setUser(session ? JSON.parse(session) : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {!user && <AuthStack onLogin={checkSession} />}

      {user?.role === "parent" && <ParentTabs />}

      {user?.role === "babysitter" && (
        <NannyStack onLogout={checkSession} />
      )}
    </NavigationContainer>
  );
}
