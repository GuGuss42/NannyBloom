import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

export default function FilterBar({ onFilterChange }) {
  const filters = [
    "All",
    "Nearby",
    "Price < 20€/h",
    "3+ Years Exp",
    "English",
    "French",
  ];

  const [active, setActive] = useState("All");

  const handlePress = (filter) => {
    setActive(filter);
    onFilterChange && onFilterChange(filter);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = active === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => handlePress(filter)}
            style={({ pressed }) => [
              styles.filter,
              isActive && styles.activeFilter,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.text,
                isActive && styles.activeText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },

  filter: {
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#16a085",
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
