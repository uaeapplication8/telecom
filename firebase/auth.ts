import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User,
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { AppUser } from "@/types";

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
  phone?: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });

  const userDoc: AppUser = {
    uid: cred.user.uid,
    email,
    displayName,
    phone: phone || "",
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "users", cred.user.uid), {
    ...userDoc,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logout() {
  await signOut(auth);
}

export async function getUserProfile(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as AppUser;
}

/**
 * OTP Authentication (Phone) using Firebase Phone Auth.
 * Call setupRecaptcha() once on the page that hosts the OTP form,
 * referencing a container element with id="recaptcha-container".
 */
export function setupRecaptcha(containerId = "recaptcha-container") {
  if (typeof window === "undefined") return null;
  // @ts-expect-error - attach to window to avoid re-initialization
  if (!window.recaptchaVerifier) {
    // @ts-expect-error - attach to window to avoid re-initialization
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
  // @ts-expect-error
  return window.recaptchaVerifier as RecaptchaVerifier;
}

export async function sendOtp(
  phoneNumber: string
): Promise<ConfirmationResult> {
  const verifier = setupRecaptcha();
  if (!verifier) throw new Error("Recaptcha not initialized");
  return signInWithPhoneNumber(auth, phoneNumber, verifier);
}

export async function verifyOtp(
  confirmationResult: ConfirmationResult,
  code: string
): Promise<User> {
  const cred = await confirmationResult.confirm(code);
  return cred.user;
}
