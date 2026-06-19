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





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAK92nr_UrKn9RpK7ofrYWRVunorc7VJ-Q",
//   authDomain: "gateprep-ai-79ba8.firebaseapp.com",
//   projectId: "gateprep-ai-79ba8",
//   storageBucket: "gateprep-ai-79ba8.firebasestorage.app",
//   messagingSenderId: "124431771601",
//   appId: "1:124431771601:web:b4f515059d8ad0f26ee2f0",
//   measurementId: "G-Q965ZXVEJS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);