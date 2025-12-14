import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RatingScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      Alert.alert("Incomplete", "Please rate and leave a comment.");
      return;
    }
    Alert.alert("Thank you ❤️", "Your feedback has been submitted!");
    setRating(0);
    setComment("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rate Your Babysitter</Text>

        <Text style={styles.subtitle}>
          How satisfied were you with your babysitter?
        </Text>

        {/* ⭐ Rating Stars */}
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={36}
                color="#f1c40f"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ratingLabel}>
          {rating === 0
            ? "Tap a star to rate"
            : `You rated ${rating} ${rating === 1 ? "star" : "stars"}`}
        </Text>

        {/* 💬 Comment Input */}
        <Text style={styles.label}>Leave a Comment</Text>
        <TextInput
          placeholder="Write your feedback..."
          style={styles.commentBox}
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />

        {/* 📤 Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16a085",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  star: {
    marginHorizontal: 6,
  },
  ratingLabel: {
    color: "#16a085",
    fontSize: 15,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  commentBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: "100%",
    minHeight: 100,
    textAlignVertical: "top",
    elevation: 2,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#16a085",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
