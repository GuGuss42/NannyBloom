// navigation/ParentTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import NannyListScreen from "../screens/NannyListScreen";
import BookingScreen from "../screens/BookingScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SignupScreen from "../screens/SignupScreen";
import RatingScreen from "../screens/RatingScreen";

const Tab = createBottomTabNavigator();

export default function ParentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#16a085",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home-outline";
          else if (route.name === "Nannies") icon = "people-outline";
          else if (route.name === "Bookings") icon = "calendar-outline";
          else if (route.name === "Messages") icon = "chatbubbles-outline";
          else if (route.name === "Account") icon = "person-outline";
          else if (route.name === "Rate") icon = "star-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nannies" component={NannyListScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Account" component={SignupScreen} />
      <Tab.Screen name="Rate" component={RatingScreen} />
    </Tab.Navigator>
  );
}
