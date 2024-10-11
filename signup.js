// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, setDoc,doc, } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)


 
const submit = document.getElementById('submit-signup');
submit.addEventListener("click",function(event){
   event.preventDefault()
   const email = document.getElementById('emailid').value;
   const password = document.getElementById('password').value;
   const fullname = document.getElementById('fullname').value;
   const mobno = document.getElementById('mobno').value;


   createUserWithEmailAndPassword(auth,email,password)
   .then((userCredential) => {
       const user = userCredential.user;
        
       //retrieves the info of the already singed in user
       //adding data

       setDoc(doc(db,'user',user.uid),{
        uid: user.uid,
         email: email,
         fullname: fullname,
         mobno: mobno,
         last_login: Date.now()
       })

       alert("user registered successfully");
       document.getElementById('emailid').value = '';
        document.getElementById('password').value = '';
        document.getElementById('fullname').value = '';
        document.getElementById('mobno').value = '';

     })
 
   .catch((error) => {
     var error_code = error.code;
     var error_message = error.message;
     alert("failed to register error..."+error_message);
   });
  })