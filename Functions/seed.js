// Functions/seed.js
import { db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";

const users = [
  { id: "parent1", name: "Emma Parent", email: "parent1@test.com", password: "parent123", role: "parent", city: "Tunis" },
  { id: "parent2", name: "Lina Parent", email: "parent2@test.com", password: "parent123", role: "parent", city: "Sousse" },
  { id: "parent3", name: "Sara Parent", email: "parent3@test.com", password: "parent123", role: "parent", city: "Monastir" },
  { id: "nanny1", name: "Sofia Karim", email: "sofia@test.com", password: "nanny123", role: "babysitter", city: "Tunis" },
  { id: "nanny2", name: "Olivia Smith", email: "olivia@test.com", password: "nanny123", role: "babysitter", city: "Sfax" },
  { id: "nanny3", name: "Sarah Johnson", email: "sarah@test.com", password: "nanny123", role: "babysitter", city: "Monastir" },
  { id: "nanny4", name: "Emma Brown", email: "emma@test.com", password: "nanny123", role: "babysitter", city: "Sousse" },
];

export async function seedUsers() {
  for (let u of users) {
    await setDoc(doc(db, "users", u.id), u);
  }
  console.log("🔥 Users with password seeded successfully!");
}
