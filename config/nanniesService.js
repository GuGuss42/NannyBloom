import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Fetch all nannies from Firestore
 */
export async function fetchNannies() {
  try {
    const snapshot = await getDocs(collection(db, "nannies"));

    const nannies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return nannies;
  } catch (error) {
    console.error("❌ Error fetching nannies:", error);
    return [];
  }
}
