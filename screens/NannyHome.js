import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function NannyHome({ onLogout }) {
  const [userName, setUserName] = useState("");

  // Profile fields (UI only)
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState("");

  // Offers popup
  const [showOffers, setShowOffers] = useState(false);
  const [offers, setOffers] = useState([
    {
      id: "1",
      parent: "Sarah M.",
      date: "Today - 18:00",
      hours: 3,
      city: "Sousse",
    },
    {
      id: "2",
      parent: "Amine K.",
      date: "Tomorrow - 14:00",
      hours: 4,
      city: "Tunis",
    },
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const session = await AsyncStorage.getItem("userSession");
      if (session) {
        const user = JSON.parse(session);
        setUserName(user.name);
      }
    } catch (e) {
      console.log("Load error:", e);
    }
  };

  // ❌ Fake save (UI only)
  const handleSaveProfile = () => {
    if (!city || !price) {
      Alert.alert("Missing info", "City and price are required");
      return;
    }

    Alert.alert("✅ Success", "Profile saved successfully!");
  };

  // ✅ Real Firebase logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userSession");
      console.log("✅ Logged out");
      onLogout();
    } catch (e) {
      Alert.alert("Error", "Could not logout");
    }
  };

  const handleAccept = (id) => {
    Alert.alert("✅ Accepted", "You accepted the offer");
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const handleDecline = (id) => {
    Alert.alert("❌ Declined", "You declined the offer");
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {userName || "Nanny"} 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Price per hour"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Languages (Arabic, French...)"
        value={languages}
        onChangeText={setLanguages}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Experience"
        multiline
        value={experience}
        onChangeText={setExperience}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      {/* OFFERS BUTTON */}
      <TouchableOpacity
        style={styles.offerButton}
        onPress={() => setShowOffers(true)}
      >
        <Text style={styles.buttonText}>Offers</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* OFFERS MODAL */}
      <Modal visible={showOffers} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Offers</Text>

            {offers.length === 0 ? (
              <Text style={{ textAlign: "center", color: "#555" }}>
                No pending offers
              </Text>
            ) : (
              <FlatList
                data={offers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.offerCard}>
                    <Text style={styles.offerText}>📍 {item.city}</Text>
                    <Text style={styles.offerText}>
                      🕒 {item.date} ({item.hours}h)
                    </Text>
                    <Text style={styles.offerText}>
                      👤 Parent: {item.parent}
                    </Text>
                     <Text style={styles.offerText}>
                      💰 paying: 10$/h
                    </Text>

                    <View style={styles.offerActions}>
                      <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handleAccept(item.id)}
                      >
                        <Text style={styles.actionText}>Accept</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.declineBtn}
                        onPress={() => handleDecline(item.id)}
                      >
                        <Text style={styles.actionText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowOffers(false)}
            >
              <Text style={styles.actionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#16a085",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#16a085",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  offerButton: {
    backgroundColor: "#2980b9",
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
  },
  logoutButton: {
    backgroundColor: "#c0392b",
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color: "#16a085",
  },
  offerCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  offerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  offerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptBtn: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  declineBtn: {
    backgroundColor: "#c0392b",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  actionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  closeBtn: {
    backgroundColor: "#7f8c8d",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
});
