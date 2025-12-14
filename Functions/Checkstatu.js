import { doc, getDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

export async function getRole() {
  if (!auth.currentUser) return null;

  const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
  return snap.exists() ? snap.data().role : null;
}
