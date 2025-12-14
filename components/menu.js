// 📁 components/MenuPopup.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { getRole } from '../Functions/Checkstatu';

export default function MenuPopup({ visible, onClose, onNavigate }) {

  const [isBabysitter, setIsBabysitter] = useState(false);

  // Load role on open
  useEffect(() => {
    async function loadRole() {
      const roleCheck = await getRole();  // returns true/false
      setIsBabysitter(roleCheck);
    }
    loadRole();
  }, []);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Menu</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate("Home")}>
            <Text style={styles.menuText}>🏠 Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate("Nannies")}>
            <Text style={styles.menuText}>👩‍🍼 Nannies</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate("Account")}>
            <Text style={styles.menuText}>🥷 Account</Text>
          </TouchableOpacity>

          {/* ROLE-BASED RENDERING */}
          {isBabysitter && (
            <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate("Modpro")}>
              <Text style={styles.menuText}>🎛️ Adjust</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.menuItem, { marginTop: 15 }]} onPress={onClose}>
            <Text style={[styles.menuText, { color: '#e74c3c' }]}>❌ Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16a085',
    marginBottom: 15,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
});
