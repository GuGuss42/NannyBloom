import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NannyCard = ({ name, rating, experience, image, onPress }) => {
  // Animation scale
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: image }} style={styles.image} />

        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.experience} numberOfLines={1}>
          {experience}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" color="#f1c40f" size={18} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default NannyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    marginVertical: 6,
    alignItems: "center",
    width: 140,

    // ANDROID elevation
    elevation: 6,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },

  name: {
    fontWeight: "600",
    color: "#333",
    fontSize: 14,
  },

  experience: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  ratingText: {
    marginLeft: 4,
    color: "#333",
    fontSize: 13,
    fontWeight: "500",
  },
});
