import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ServiceCard = ({ title, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 6,
    alignItems: "center",
    elevation: 3,
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#16a085",
    textAlign: "center",
  },
});
