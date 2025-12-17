import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import NannyHome from "../screens/NannyHome";

// Navigators
import ParentTabs from "./ParentsTabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Check stored session
  const checkUserSession = async () => {
    try {
      const session = await AsyncStorage.getItem("userSession");

      if (session) {
        const user = JSON.parse(session);
        setUserRole(user.role);
        setIsLoggedIn(true);
        console.log("✅ Session found:", user);
      } else {
        setUserRole(null);
        setIsLoggedIn(false);
        console.log("❌ No session found");
      }
    } catch (error) {
      console.error("❌ Session check error:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 🔐 NOT LOGGED IN */}
        {!isLoggedIn && (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} onLogin={checkUserSession} />
              )}
            </Stack.Screen>

            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}

        {/* 👨‍👩‍👧 PARENT FLOW */}
        {isLoggedIn && userRole === "parent" && (
          <Stack.Screen name="ParentTabs" component={ParentTabs} />
        )}

        {/* 👶 NANNY FLOW */}
        {isLoggedIn && userRole === "babysitter" && (
          <Stack.Screen name="NannyHome">
            {(props) => (
              <NannyHome {...props} onLogout={checkUserSession} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
