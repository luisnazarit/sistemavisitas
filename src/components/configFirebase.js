import Firebase from "firebase";

const appFirebase = Firebase.initializeApp({
  apiKey: "AIzaSyCKNQtsKdvZwhERm1tvsEk_3AxrkEjSiLk",
  authDomain: "forward-scion-158612.firebaseapp.com",
  databaseURL: "https://forward-scion-158612.firebaseio.com",
  projectId: "forward-scion-158612",
  storageBucket: "forward-scion-158612.appspot.com",
  messagingSenderId: "688448162982"
});

export const db = appFirebase.database();