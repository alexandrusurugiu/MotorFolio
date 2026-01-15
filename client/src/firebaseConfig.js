import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "motorfolio-d7341.firebaseapp.com",
    projectId: "motorfolio-d7341",
    storageBucket: "motorfolio-d7341.firebasestorage.app",
    messagingSenderId: "128860923264",
    appId: "1:128860923264:web:6bcba6745ec41fdf424d65"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };