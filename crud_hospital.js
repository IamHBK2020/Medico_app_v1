  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {

  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

//--------------------references--------------------------------

//-----------------adding document-------------------------------

// crud_scheme.js

// Function to add a document to Firestore
async function AddDocument() {
    // Retrieve input values
let hostID = document.getElementById("hostID").value.trim();
let hostname = document.getElementById("hostname").value.trim();
let typebox = document.getElementById("typebox").value.trim();
let avbox = document.getElementById("avbox").value.trim();
let statebox = document.getElementById("statebox").value.trim();
let citybox = document.getElementById("citybox").value.trim();
let emailbox = document.getElementById("emailbox").value.trim();
let phbox = document.getElementById("phbox").value.trim();
let addbox = document.getElementById("addbox").value.trim();

// Validating input fields
if (hostID === "" || typebox === "" || avbox === "" || statebox === "" || citybox === "" || emailbox === "" || phbox === "" || addbox === "" || hostname === "") {
  alert("Please fill in all fields.");
  return;
}

// Assuming Firebase Firestore is properly initialized as `db`

// Creating a reference to the Firestore collection
var ref = doc(db, "HospitalList", hostID);

// Adding document to Firestore
await setDoc(
  ref,
  {
    Host_ID: hostID,
    Host_name:hostname,
    Type: typebox,
    Avail: avbox,
    State: statebox,
    City: citybox,
    Email: emailbox,
    Phone: phbox,
    Address: addbox
  }
)
.then(() => {
  alert("Data added successfully");
  // Clear input fields after successful addition
  document.getElementById("hostID").value = "";
  document.getElementById("hostname").value = "";
  document.getElementById("typebox").value = "";
  document.getElementById("avbox").value = "";
  document.getElementById("statebox").value = "";
  document.getElementById("citybox").value = "";
  document.getElementById("emailbox").value = "";
  document.getElementById("phbox").value = "";
  document.getElementById("addbox").value = "";
})
.catch((error) => {
  var error_message = error.message;
  alert("Error: " + error_message);
});
}
  
  // Event listener for the "Insert" button
  document.getElementById("insbtn").addEventListener("click", AddDocument);

  

//--------------------------Getting a document--------------------

async function Getadocument() {
    let hostID = document.getElementById("hostID").value.trim();
    let hostname = document.getElementById("hostname")
    let typebox = document.getElementById("typebox");
    let avbox = document.getElementById("avbox");
    let statebox = document.getElementById("statebox");
    let citybox = document.getElementById("citybox");
    let emailbox = document.getElementById("emailbox");
    let phbox = document.getElementById("phbox");
    let addbox = document.getElementById("addbox");
  
    // Validating input fields
    if (hostID === "") {
      alert("Please enter a Host ID to retrieve.");
      return;
    }
  
    // Getting a reference to the Firestore document
    var refer = doc(db, "HospitalList", hostID);
    const docSnap = await getDoc(refer);
  
    // Checking if the document exists
    if (docSnap.exists()) {
      // If document exists, populate the fields with its data
      typebox.value = docSnap.data().Type;
      hostname.value = docSnap.data().Host_name;
      avbox.value = docSnap.data().Avail;
      statebox.value = docSnap.data().State;
      citybox.value = docSnap.data().City;
      emailbox.value = docSnap.data().Email;
      phbox.value = docSnap.data().Phone;
      addbox.value = docSnap.data().Address;
      
      alert("Document retrieved successfully");
    } else {
      alert("No such document found.");
    }
  }
  

document.getElementById("selbtn").addEventListener("click", Getadocument);



// //--------------------Updating document-------------------------------



async function UpdateDocument(){

    let hostID = document.getElementById("hostID").value.trim();
    let hostname = document.getElementById("hostname").value.trim();
    let typebox = document.getElementById("typebox").value.trim();
    let avbox = document.getElementById("avbox").value.trim();
    let statebox = document.getElementById("statebox").value.trim();
    let citybox = document.getElementById("citybox").value.trim();
    let emailbox = document.getElementById("emailbox").value.trim();
    let phbox = document.getElementById("phbox").value.trim();
    let addbox = document.getElementById("addbox").value.trim();


var ref = doc(db, "HospitalList", hostID);

// Adding document to Firestore
await updateDoc(
  ref,
  {
    Host_ID: hostID,
    Host_name:hostname,
    Type: typebox,
    Avail: avbox,
    State: statebox,
    City: citybox,
    Email: emailbox,
    Phone: phbox,
    Address: addbox

  }
)
.then(() => {
  alert("Data updated successfully");
  // Clear input fields after successful addition
  document.getElementById("hostID").value = "";
  document.getElementById("hostname").value = "";
  document.getElementById("typebox").value = "";
  document.getElementById("avbox").value = "";
  document.getElementById("statebox").value = "";
  document.getElementById("citybox").value = "";
  document.getElementById("emailbox").value = "";
  document.getElementById("phbox").value = "";
  document.getElementById("addbox").value = "";
})
.catch((error) => {
  var error_message = error.message;
  alert("Error: " + error_message);
});
}

document.getElementById("updbtn").addEventListener("click",UpdateDocument);



// //--------------DELETE DOC-------------------------------------

async function DeleteDocument(){

  let hostID = document.getElementById("hostID").value
  var bird = doc(db,"HospitalList",hostID);
  const docSnap = await getDoc(bird);

  if(!docSnap.exists()){
    alert("document does not exist");
    return;

  }

  await deleteDoc(bird)
    .then(()=>{
      alert("document deleted succesfully")
        document.getElementById("hostID").value = "";
        document.getElementById("hostname").value = "";
        document.getElementById("typebox").value = "";
        document.getElementById("avbox").value = "";
        document.getElementById("statebox").value = "";
        document.getElementById("citybox").value = "";
        document.getElementById("emailbox").value = "";
        document.getElementById("phbox").value = "";
        document.getElementById("addbox").value = "";
      
    })
    .catch((error)=>{
      var error_message = error.message;
      alert("error deleting "+error_message);
    });

}

document.getElementById("delbtn").addEventListener("click",DeleteDocument);

// //--------------------Creating the table--------------------


  async function getAllData() {

    const dbRef = collection(db, "HospitalList");
    onSnapshot(dbRef, (querySnapshot) => {
    let hospitals = [];
    querySnapshot.forEach((doc) => {
    hospitals.push(doc.data());
  });

  addAllItemsToTable(hospitals);
  console.log("function called from get to add all")

});


}



//---------------------------------------------------------------







    // let fetbtn = document.getElementById("fetchBtn");
    // fetbtn.addEventListener("click", getAllData);
  window.onload = getAllData;

    //   let schemNo = 0;
  let tbody = document.getElementById("tbody1");

    //--------------------------------------------------------------------

  function addOneItem(id,name,type,avail,state,city,email,phone,address) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let td9 = document.createElement("td");

    td1.textContent = id;
    td2.textContent = name;
    td3.textContent = type;
    td4.textContent = avail;
    td5.textContent = state;
    td6.textContent = city;
    td7.textContent = email;
    td8.textContent = phone;
    // td9.textContent = address;

    let addWords = address.split(' ');
    let truncatedadd = addWords.slice(0, 5).join(' ');
    if (addWords.length > 5) {
      truncatedadd += '...';
    }
    td9.textContent = truncatedadd;
    // td6.style.overflow = 'hidden';
    td9.style.whiteSpace = 'nowrap'; // Ensure text doesn't wrap
    

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);

    tbody.appendChild(trow);
  }

  function addAllItemsToTable(hospitals) {
    tbody.innerHTML = ""; // Clear the table body before adding new items

    hospitals.forEach(element => {
        // Assuming `element` contains properties like Host_ID, Host_name, Type, Avail, State, City, Email, Phone, and Address
        addOneItem(element.Host_ID, element.Host_name, element.Type, element.Avail, element.State, element.City, element.Email, element.Phone, element.Address);
    });
}
