// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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


 
const submit = document.getElementById('submit-signin');
submit.addEventListener("click",function(event){
   event.preventDefault()
   const email = document.getElementById('emailid').value;
   const password = document.getElementById('password').value;


   signInWithEmailAndPassword(auth,email,password)
   .then((userCredential) => {
       const user = userCredential.user;
      //  alert("logging in....")
       document.getElementById('emailid').value = '';
        document.getElementById('password').value = '';
    //    window.location.href = "landing.html"
     })
 
   .catch((error) => {
     var error_code = error.code;
     var error_message = error.message;
     alert(""+error_message);
   });
  })


  const logout = document.querySelector('#logout');
  logout.addEventListener('click',(e)=>{
      signOut(auth).then(()=>{
          alert("signed  out succesfull")
          // window.location.href = "Frontpage.html";
      })
      .catch((err)=>{
          console.error(err);

      });
  });


  auth.onAuthStateChanged((user) => {
    // Check if the user is logged in and passing error checking as a third argument
    if (user) {

        console.log("auhtorized user")
        setupUI(user);
        
        setTimeout(() => {
          window.location.href = "crud_scheme.html";
      }, 3000);       
    } else {
            setupUI();
            console.log("User logged out");
    }
});


const loggedinLinks = document.querySelectorAll('.logged-in');
const loggedoutLinks = document.querySelectorAll('.logged-out');


function setupUI(user) {
  if (user) {
    // let html = "<h2>Logged in as " + user.email + "</h2>";

    // Account.innerHTML = html;

    loggedinLinks.forEach(item => item.style.display = "block");
    loggedoutLinks.forEach(item => item.style.display = "none");

  } else {
    loggedinLinks.forEach(item => item.style.display = "none");
    loggedoutLinks.forEach(item => item.style.display = "block");
  }

}