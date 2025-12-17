import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from "react-native";

export default function SignupScreen({ navigation }) {
  // États pour les champs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation de l'email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation du formulaire
  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre nom complet");
      return false;
    }

    if (!email.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre email");
      return false;
    }

    if (!isValidEmail(email.trim())) {
      Alert.alert("Erreur", "Veuillez entrer un email valide");
      return false;
    }

    if (!password.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un mot de passe");
      return false;
    }

    if (password.trim().length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    return true;
  };

  // Fonction d'inscription
  const handleRegister = async () => {
    // Valider le formulaire
    if (!validateForm()) {
      return;
    }

    // Activer le chargement
    setLoading(true);

    try {
      // Simulation d'un appel API (remplacez par votre logique réelle)
      console.log("Tentative d'inscription :", { fullName, email });

      // Attente simulée de 2 secondes
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Succès
      Alert.alert(
        "Succès !", 
        "Compte créé avec succès !",
        [
          {
            text: "OK",
            onPress: () => {
              // Réinitialiser les champs
              setFullName("");
              setEmail("");
              setPassword("");
              
              // Naviguer vers l'écran d'accueil (modifiez selon votre navigation)
              if (navigation && navigation.navigate) {
                navigation.navigate("Home");
              }
            }
          }
        ]
      );

    } catch (error) {
      // Erreur
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
      console.error("Erreur d'inscription :", error);
    } finally {
      // Désactiver le chargement
      setLoading(false);
    }
  };

  // Vérifier si le formulaire est valide (pour désactiver le bouton)
  const isFormValid = () => {
    return (
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      isValidEmail(email.trim()) &&
      password.trim().length >= 6
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create Parent Account</Text>
          
          {/* Champ Nom Complet */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              placeholder="Enter your full name"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
              autoCapitalize="words"
            />
          </View>

          {/* Champ Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Champ Mot de Passe */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password *</Text>
            <TextInput
              placeholder="Enter your password (min. 6 characters)"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
            <Text style={styles.hint}>
              Le mot de passe doit contenir au moins 6 caractères
            </Text>
          </View>

          {/* Bouton d'inscription */}
          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid() || loading) && styles.disabledButton
            ]}
            onPress={handleRegister}
            disabled={!isFormValid() || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f9f9f9" 
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: { 
    flexGrow: 1,
    justifyContent: "center",
    padding: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "700", 
    color: "#16a085", 
    marginBottom: 30, 
    textAlign: "center" 
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e5e9",
    fontSize: 16,
    color: "#333",
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#16a085",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#16a085",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#8dd7c6",
    opacity: 0.7,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600" 
  }
});