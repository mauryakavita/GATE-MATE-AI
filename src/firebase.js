import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  
  authDomain: "gateprep-ai-79ba8.firebaseapp.com",
  projectId: "gateprep-ai-79ba8",
  storageBucket: "gateprep-ai-79ba8.firebasestorage.app",
  messagingSenderId: "124431771601",
  appId: "1:124431771601:web:b4f515859d8ad0f26ee2f0",
  measurementId: "G-0965ZXVEJS"
};







const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);





