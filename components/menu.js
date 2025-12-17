// 📁 components/MenuPopup.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuPopup({ visible, onClose, onNavigate }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function loadUserData() {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const userData = JSON.parse(userSession);
          setUserName(userData.name);
        }
      } catch (error) {
        console.error("Error loading user data in menu:", error);
      }
    }

    if (visible) loadUserData();
  }, [visible]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userSession");
              console.log("✅ User logged out successfully");
              onClose();
              onNavigate("Login"); // navigate back to Login screen
            } catch (error) {
              console.error("❌ Logout error:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={styles.popup}>
            <Text style={styles.title}>Menu</Text>
            {userName ? <Text style={styles.welcomeText}>Welcome, {userName}!</Text> : null}

            {/* LOGOUT BUTTON */}
            <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
              <Text style={[styles.menuText, { color: '#e74c3c', fontWeight: 'bold' }]}>
                🚪 Logout
              </Text>
            </TouchableOpacity>

            {/* CLOSE BUTTON */}
            <TouchableOpacity style={[styles.menuItem, { marginTop: 10 }]} onPress={onClose}>
              <Text style={[styles.menuText, { color: '#95a5a6' }]}>❌ Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  popup: { backgroundColor: '#fff', width: '85%', maxWidth: 400, borderRadius: 20, padding: 20, alignItems: 'center', elevation: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#16a085', marginBottom: 5 },
  welcomeText: { fontSize: 14, color: '#7f8c8d', marginBottom: 20, fontStyle: 'italic' },
  menuItem: { paddingVertical: 12, width: '100%', alignItems: 'center', borderRadius: 8 },
  menuText: { fontSize: 17, color: '#2c3e50' },
  logoutButton: { marginTop: 15, borderTopWidth: 1, borderTopColor: '#ecf0f1', paddingTop: 20 },
});
