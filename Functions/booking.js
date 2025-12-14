import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export async function createBooking(parentId, nannyId, date) {
  await addDoc(collection(db, "bookings"), {
    parentId,
    nannyId,
    date,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
