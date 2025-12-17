import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuPopup from "./menu";

const Header = ({ title, navigation, onLogout }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  

  return (
    <SafeAreaView>
      <View style={styles.header}>
        
        {/* 🍔 MENU BUTTON */}
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.title}>{title}</Text>

        {/* 🔔 Notifications */}
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#16a085" />
        </TouchableOpacity>
      </View>

      {/* POPUP MENU */}
      <MenuPopup
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigate={(screen) => {
          setMenuVisible(false);
          navigation.navigate(screen);
        }}
        onLogout={onLogout}   // 🔥 NEW
      />
    </SafeAreaView>
  );
};

export default Header;


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  menuButton: {
    backgroundColor: "#16a085",
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16a085",
  },
});