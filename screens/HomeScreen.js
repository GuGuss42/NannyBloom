import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import NannyCard from "../components/NannyCard";
import { fetchNannies } from "../config/nanniesService";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [topNannies, setTopNannies] = useState([]);

  useEffect(() => {
    async function loadTopNannies() {
      const nannies = await fetchNannies();

      const sorted = [...nannies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      setTopNannies(sorted);
    }

    loadTopNannies();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Header title="Welcome Parents 👋" />

        {/* SEARCH */}
        <TextInput
          style={styles.search}
          placeholder="Search by name or location..."
          value={search}
          onChangeText={setSearch}
        />

        {/* TOP NANNIES */}
        <Text style={styles.sectionTitle}>⭐ Top Rated Nannies</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topNannies.map((nanny) => (
            <NannyCard
              key={nanny.id}
              name={nanny.name}
              rating={nanny.rating}
              experience={`${nanny.experience} yrs experience`}
              image={nanny.photoUrl}
            />
          ))}
        </ScrollView>

        {topNannies.length === 0 && (
          <Text style={styles.empty}>No nannies available</Text>
        )}

        {/* INFO */}
        <Text style={styles.sectionTitle}>Book Your Session Easily 📅</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Browse available nannies, read reviews, and book instantly.
          </Text>
        </View>

        {/* ABOUT */}
        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>Who We Are</Text>
          <Text style={styles.aboutText}>
            We connect parents with trusted, experienced nannies. Our mission is
            to make childcare simple, safe, and reliable.
          </Text>
        </View>

        {/* FEATURES */}
        <Text style={styles.sectionTitle}>Why Choose Us</Text>

        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>⭐</Text>
          <Text style={styles.featureTitle}>Trusted Nannies</Text>
          <Text style={styles.featureText}>
            Only verified and well-rated caregivers.
          </Text>
        </View>

        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>⏱️</Text>
          <Text style={styles.featureTitle}>Fast Booking</Text>
          <Text style={styles.featureText}>
            Find and schedule in just a few taps.
          </Text>
        </View>

        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>💬</Text>
          <Text style={styles.featureTitle}>Easy Chat</Text>
          <Text style={styles.featureText}>
            Message your nanny instantly and safely.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { flex: 1, padding: 16 },

  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16a085",
    marginVertical: 10,
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 10,
  },

  infoText: { color: "#333", fontSize: 15 },

  aboutBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    elevation: 2,
    marginBottom: 10,
  },

  aboutTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a085",
    marginBottom: 6,
  },

  aboutText: { fontSize: 15, color: "#444", lineHeight: 20 },

  featureBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    elevation: 2,
    marginBottom: 12,
  },

  featureIcon: { fontSize: 26, marginBottom: 6 },

  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a085",
    marginBottom: 4,
  },

  featureText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 18,
  },

  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
  },
});
