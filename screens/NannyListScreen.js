import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import FilterBar from "../components/FilterBar";
import NannyCard from "../components/NannyCard";
import { fetchNannies } from "../config/nanniesService";
import { useNavigation } from "@react-navigation/native";

export default function NannyListScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [allNannies, setAllNannies] = useState([]);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // 🔥 Fetch nannies once
  useEffect(() => {
    async function load() {
      const data = await fetchNannies();
      setAllNannies(data);
      setFilteredNannies(data);
    }
    load();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activeFilter, search, allNannies]);

  const applyFilters = () => {
    let result = [...allNannies];

    if (search.trim()) {
      result = result.filter((n) =>
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.city?.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (activeFilter) {
      case "Price < 20€/h":
        result = result.filter((n) => n.pricePerHour < 20);
        break;
      case "3+ Years Exp":
        result = result.filter((n) => n.experience >= 3);
        break;
      case "English":
        result = result.filter((n) => n.languages?.includes("English"));
        break;
      case "French":
        result = result.filter((n) => n.languages?.includes("French"));
        break;
      case "Nearby":
        result = result.filter((n) => n.city === "Tunis");
        break;
      default:
        break;
    }

    setFilteredNannies(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Nannies</Text>

      <TextInput
        placeholder="Search nanny or city..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <FilterBar onFilterChange={setActiveFilter} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredNannies.map((nanny) => (
          <NannyCard
            key={nanny.id}
            name={nanny.name}
            rating={nanny.rating}
            experience={`${nanny.experience} yrs exp`}
            image={nanny.photoUrl}
            onPress={() => navigation.navigate("Bookings", { nanny })}
          />
        ))}

        {filteredNannies.length === 0 && (
          <Text style={styles.empty}>No nannies found 😢</Text>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 20, fontWeight: "bold", color: "#16a085", marginBottom: 10 },
  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
});
