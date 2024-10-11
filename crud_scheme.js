  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
  import { getAuth, signInWithEmailAndPassword,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {

  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

//--------------------references--------------------------------

//-----------------adding document-------------------------------

// crud_scheme.js

// Function to add a document to Firestore
async function AddDocument() {
    // Retrieve input values
    let schemeID = document.getElementById("schemeID").value.trim();
    let schemebox = document.getElementById("schemebox").value.trim();
    let statebox = document.getElementById("statebox").value.trim();
    let genderbox = document.getElementById("genderbox").value.trim();
    let typebox = document.getElementById("typebox").value.trim();
    let descbox = document.getElementById("descbox").value.trim();
  
    // Validating input fields
    if (schemebox === "" || statebox === "" || genderbox === "" || typebox === "" || descbox === "" || schemeID === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    // Assuming Firebase Firestore is properly initialized as `db`
  
    // Creating a reference to the Firestore collection
    var ref = doc(db, "SchemesList", schemeID);
  
    // Adding document to Firestore
    await setDoc(
      ref,
      {
        Scheme_ID: schemeID,
        Scheme_name: schemebox,
        State_name: statebox,
        Gender_type: genderbox,
        Desc: descbox,
        Schem_type: typebox

      }
    )
    .then(() => {
      alert("Data added successfully");
      // Clear input fields after successful addition
      document.getElementById("schemeID").value = "";
      document.getElementById("schemebox").value = "";
      document.getElementById("statebox").value = "";
      document.getElementById("genderbox").value = "";
      document.getElementById("typebox").value = "";
      document.getElementById("descbox").value = "";
    })
    .catch((error) => {
      var error_message = error.message;
      alert("Error: " + error_message);
    });
  }
  
  // Event listener for the "Insert" button
  document.getElementById("insbtn").addEventListener("click", AddDocument);

  

//--------------------------Getting a document--------------------

async function Getadocument(){

    let schemebox = document.getElementById("schemebox"); // Fetching DOM element
  let typebox = document.getElementById("typebox"); // Fetching DOM element
  let statebox = document.getElementById("statebox"); // Fetching DOM element
  let genderbox = document.getElementById("genderbox"); // Fetching DOM element
  let descbox = document.getElementById("descbox"); // Fetching DOM element

  let schemeID = document.getElementById("schemeID").value //storing the value in rollbox and finding doc based on the roll value
  var refer = doc(db,"SchemesList",schemeID); //getting a reference 
  const docSnap = await getDoc(refer);

  if(docSnap.exists()){

    schemebox.value = docSnap.data().Scheme_name;
    typebox.value = docSnap.data().Schem_type;
    statebox.value = docSnap.data().State_name;
    genderbox.value = docSnap.data().Gender_type;
    descbox.value = docSnap.data().Desc;
    
    alert("retrieved")
  }

  else{
        alert("no such document");
  }

}


document.getElementById("selbtn").addEventListener("click", Getadocument);



// //--------------------Updating document-------------------------------



async function UpdateDocument(){

let schemeID = document.getElementById("schemeID").value.trim();
let schemebox = document.getElementById("schemebox").value.trim();
let statebox = document.getElementById("statebox").value.trim();
let genderbox = document.getElementById("genderbox").value.trim();
let typebox = document.getElementById("typebox").value.trim();
let descbox = document.getElementById("descbox").value.trim();


var ref = doc(db, "SchemesList", schemeID);

// Adding document to Firestore
await updateDoc(
  ref,
  {
    Scheme_name: schemebox,
    State_name: statebox,
    Gender_type: genderbox,
    Desc: descbox,
    Schem_type: typebox

  }
)
.then(() => {
  alert("Data updated successfully");
  // Clear input fields after successful addition
  document.getElementById("schemeID").value = "";
  document.getElementById("schemebox").value = "";
  document.getElementById("statebox").value = "";
  document.getElementById("genderbox").value = "";
  document.getElementById("typebox").value = "";
  document.getElementById("descbox").value = "";
})
.catch((error) => {
  var error_message = error.message;
  alert("Error: " + error_message);
});
}

document.getElementById("updbtn").addEventListener("click",UpdateDocument);



// //--------------DELETE DOC-------------------------------------

async function DeleteDocument(){

  let schemeID = document.getElementById("schemeID").value
  var bird = doc(db,"SchemesList",schemeID);
  const docSnap = await getDoc(bird);

  if(!docSnap.exists()){
    alert("document does not exist");
    return;

  }

  await deleteDoc(bird)
    .then(()=>{
      alert("document deleted succesfully")
      document.getElementById("schemeID").value = "";
      document.getElementById("schemebox").value = "";
      document.getElementById("statebox").value = "";
      document.getElementById("genderbox").value = "";
      document.getElementById("typebox").value = "";
      document.getElementById("descbox").value = "";
      
    })
    .catch((error)=>{
      var error_message = error.message;
      alert("error deleting "+error_message);
    });

}

document.getElementById("delbtn").addEventListener("click",DeleteDocument);

// //--------------------Creating the table--------------------


  async function getAllData() {

    const dbRef = collection(db, "SchemesList");
    onSnapshot(dbRef, (querySnapshot) => {
    let schemes = [];
    querySnapshot.forEach((doc) => {
    schemes.push(doc.data());
  });

  addAllItemsToTable(schemes);

});


}



//---------------------------------------------------------------







// let fetbtn = document.getElementById("fetchBtn");
// fetbtn.addEventListener("click", getAllData);
  window.onload = getAllData;

//   let schemNo = 0;
  let tbody = document.getElementById("tbody1");

//--------------------------------------------------------------------

  function addOneItem(id,name,type,gender,state,desc) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");

    td1.textContent = id;
    td2.textContent = name;
    td3.textContent = type;
    td4.textContent = gender;
    td5.textContent = state;
    // td6.textContent = desc;

    let descWords = desc.split(' ');
    let truncatedDesc = descWords.slice(0, 5).join(' ');
    if (descWords.length > 5) {
      truncatedDesc += '...';
    }
    td6.textContent = truncatedDesc;
    // td6.style.overflow = 'hidden';
    td6.style.whiteSpace = 'nowrap'; // Ensure text doesn't wrap
    

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    tbody.appendChild(trow);
  }

function addAllItemsToTable(schemes) {
    // schemeNo = 0;
    tbody.innerHTML = "";
    schemes.forEach(element => {
      addOneItem(element.Scheme_ID, element.Scheme_name, element.Schem_type, element.Gender_type,element.State_name,element.Desc);
    });
  }

//------------------------------------
const logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    // Check the authentication state
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is logged in, so sign them out
            signOut(auth).then(() => {
                alert("Signed out successfully");
                // Redirect to another page if needed
                window.location.href = "index.html";
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
        } else {
            // User is not logged in
            alert("User not signed in");
        }
    });
});

const home = document.getElementById('fet-home');
home.addEventListener("click", function() {
  window.location.href = "index.html";
});



