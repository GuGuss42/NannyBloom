import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export async function addRating(nannyId, rating, comment) {
  await addDoc(collection(db, "ratings"), {
    nannyId,
    rating,
    comment,
  });
}
