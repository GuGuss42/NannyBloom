import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";


export default function BookingScreen({ route }) { // removed async
  const selectedNanny = route?.params?.nanny || { id: "", name: "" };

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hours, setHours] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const parentId = "demoarent"; // constant for now

  const isFormValid = useMemo(() => {
    return selectedNanny?.id && Number(hours) > 0 && address.trim().length >= 5;
  }, [hours, address, selectedNanny]);

  const onChangeDate = (_, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleBooking = async () => {
    if (!isFormValid) {
      Alert.alert("Incomplete form", "Please fill all fields correctly");
      return;
    }

    if (date < new Date()) {
      Alert.alert("Invalid date", "Please choose a future date");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "bookings"), {
        parentId,
        nannyId: selectedNanny.id,
        nannyName: selectedNanny.name,
        date: Timestamp.fromDate(date),
        hours: Number(hours),
        address: address.trim(),
        status: "pending",
        createdAt: Timestamp.now(),
      });

      Alert.alert("✅ Booking confirmed", "Your booking has been saved!");

      // Reset form
      setHours("");
      setAddress("");
      setDate(new Date());
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("❌ Error", "Could not create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            Book {selectedNanny.name || "a Babysitter"}
          </Text>

          {/* Date */}
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate}
            />
          )}

          {/* Hours */}
          <Text style={styles.label}>Number of Hours</Text>
          <TextInput
            placeholder="e.g. 3"
            keyboardType="numeric"
            style={styles.input}
            value={hours}
            onChangeText={setHours}
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Enter full address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid || loading) && styles.buttonDisabled,
            ]}
            disabled={!isFormValid || loading}
            onPress={handleBooking}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Booking</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16a085",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  dateText: {
    fontSize: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#16a085",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#9fd3c7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
