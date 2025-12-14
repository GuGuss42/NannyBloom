import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const nanniesData = [
  {
    name: "Sofia Karim",
    rating: 4.7,
    experience: "2 yrs exp, speaks French & English",
    languages: ["French", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    city: "Tunis",
    pricePerHour: 20,
  },
  {
    name: "Emma Brown",
    rating: 4.5,
    experience: "3 yrs exp, speaks Arabic & French",
    languages: ["Arabic", "French"],
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    city: "Sousse",
    pricePerHour: 18,
  },
  {
    name: "Sarah Johnson",
    rating: 4.8,
    experience: "4 yrs exp, speaks French & English",
    languages: ["French", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    city: "Monastir",
    pricePerHour: 22,
  },
  {
    name: "Olivia Smith",
    rating: 4.6,
    experience: "2 yrs exp, speaks English & Arabic",
    languages: ["English", "Arabic"],
    photoUrl: "https://randomuser.me/api/portraits/women/47.jpg",
    city: "Sfax",
    pricePerHour: 19,
  },
  {
    name: "Sophia Lee",
    rating: 4.9,
    experience: "5 yrs exp, speaks French & English",
    languages: ["French", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/55.jpg",
    city: "Tunis",
    pricePerHour: 25,
  },
  {
    name: "Isabella Davis",
    rating: 4.4,
    experience: "1 yr exp, speaks Arabic & French",
    languages: ["Arabic", "French"],
    photoUrl: "https://randomuser.me/api/portraits/women/59.jpg",
    city: "Sousse",
    pricePerHour: 17,
  },
  {
    name: "Mia Wilson",
    rating: 4.7,
    experience: "3 yrs exp, speaks English & French",
    languages: ["English", "French"],
    photoUrl: "https://randomuser.me/api/portraits/women/61.jpg",
    city: "Monastir",
    pricePerHour: 21,
  },
];

export async function seedNannies() {
  try {
    for (let i = 0; i < nanniesData.length; i++) {
      const nanny = nanniesData[i];
      // Use name as doc id for simplicity (or generate unique id)
      await setDoc(doc(db, "nannies", nanny.name.replace(/\s/g, "_")), nanny);
    }
    console.log("🔥 Nannies seeded successfully!");
  } catch (error) {
    console.error("Error seeding nannies:", error);
  }
}
