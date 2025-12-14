import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export async function signup(email, password, name, role, city) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    role,
    city,
  });
}

export async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
