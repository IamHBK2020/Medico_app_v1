    window.onload = getAllData;
    
    // Get all radio buttons in the first set
    var radioButtons = document.querySelectorAll('input[type="radio"][name="radio"]');
    // Get all radio buttons in the second set
    var radioButtons2 = document.querySelectorAll('input[type="radio"][name="radio2"]');
    
    // Event listener for the first set of radio buttons
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('click', function() {
            // Remove 'checked' attribute from all radio buttons in the first set
            radioButtons.forEach(function(rb) {
                rb.checked = false;
            });
    
            // Set 'checked' attribute to the clicked radio button
            this.checked = true;
    
            // Get the selected value from the second set
            var additionalValue = getSelectedValueFromSecondSet();
    
            // Get the selected value from the first set
            var selectedValue = this.value;
    
            // Call the filterPage function with selected values from both sets
            filterPage(selectedValue, additionalValue);
        });
    });
    
    // Function to get the selected value from the second set of radio buttons
    function getSelectedValueFromSecondSet() {
        var additionalValue;
        // Iterate over each radio button in the second set
        radioButtons2.forEach(function(radioButton2) {
            // Check if the radio button is checked
            if (radioButton2.checked) {
                // If checked, store its value
                additionalValue = radioButton2.value;
            }
        });
        // Return the value of the checked radio button
        return additionalValue;
    }
    
    // Event listener for the second set of radio buttons
    radioButtons2.forEach(function(radioButton2) {
        radioButton2.addEventListener('click', function() {
            // Remove 'checked' attribute from all radio buttons in the second set
            radioButtons2.forEach(function(rb) {
                rb.checked = false;
            });
    
            // Set 'checked' attribute to the clicked radio button
            this.checked = true;
    
            // Get the selected value from the first set
            var selectedValue = getSelectedValueFromFirstSet();
    
            // Get the selected value from the second set
            var additionalValue = this.value;
    
            // Call the filterPage2 function with selected values from both sets
            filterPage(selectedValue, additionalValue);
        });
    });
    
    // Function to get the selected value from the first set of radio buttons
    function getSelectedValueFromFirstSet() {
        var selectedValue;
        // Iterate over each radio button in the first set
        radioButtons.forEach(function(radioButton) {
            // Check if the radio button is checked
            if (radioButton.checked) {
                // If checked, store its value
                selectedValue = radioButton.value;
            }
        });
        // Return the value of the checked radio button
        return selectedValue;
    }
    
    
    
    //----------------------------------------------------------------
    // Modify filterPage function to take two arguments
    // function filterPage(selectedValue, additionalValue) {
    //     if (selectedValue && additionalValue) {
    //         getAllData_queries(selectedValue,additionalValue); 
    
    //         }
    // }
        // Modify filterPage function to take two arguments

    

    
    
    function filterPage(selectedValue, additionalValue) {
        if (selectedValue && additionalValue) {
            console.log(selectedValue);
            console.log(additionalValue);
            getAllData_queries(selectedValue, additionalValue);
        } else if (!selectedValue && additionalValue) {
            switch (additionalValue) {
                case 'Male':
                    filteradditional('Male');
                    break;
                case 'Female':
                    filteradditional('Female');
                    break;
                case 'Unisex':
                    filteradditional('Unisex');
                    break;
                default:
                    console.log("Additional value is not recognized");
            }
        } else if (selectedValue && !additionalValue) {
            switch (selectedValue) {
                case 'Central':
                    queryingtype('Central');
                    break;
                case 'State':
                    queryingtype('State');
                    break;
                default:
                    console.log("Selected value is not recognized");
            }
        } else {
            console.log("No valid values provided");
        }
    }
        
    
    
    
    
    
      
    //-------------------------------------------------------------
    
    
    const resetButton = document.getElementById("resetBtn");
    
    resetButton.addEventListener('click', function() {
      // Reset all radio buttons
      radioButtons.forEach(function(rb) {
        rb.checked = false;
      });
    
      radioButtons2.forEach(function(rb) {
        rb.checked = false;
      });
      
    
      // Reset filter (assuming you want to re-fetch all data)
      getAllData();
    });
    
    
    
          // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
      import { getFirestore, doc,getDocs, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
      const auth = getAuth(app);
    
    //--------------------references--------------------------------
    
    async function getAllData_queries(selectedValue, additionalValue) {
        console.log(selectedValue,additionalValue);
        const dbRef = collection(db, "SchemesList");
        const reference = query(dbRef, where("Schem_type", "==", selectedValue),where("Gender_type", "==", additionalValue));
        const secondReference = query(reference, );
    
        const documents = await getDocs(reference);
        // console.log(documents)
        let scheme_queries = [];
        documents.forEach((doccc) => {
            // console.log(doccc)
            scheme_queries.push(doccc.data())
        });
    
        // const docss = await getDocs(collection(db,'TheStudentsList'))
        // let allStudents = [];
        // docss.forEach((docc) => {
        //     allStudents.push(docc.data())
        // })
    
        // let student_queries = allStudents.filter(std => std.Gender == 's')
    
        // console.log(allStudents)
    
        addAllItemsToTable(scheme_queries)
    
        console.log("function called")
    }
    
    
    
    //--------------------Creating the table--------------------
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
    //------------------------------------------------
    
    async function queryingtype(choice){
    
        let schemes_type = [];
    
        const schemeRef = collection(db,"SchemesList");
        const dbquery = query(schemeRef,where("Schem_type", "==", choice));
        onSnapshot(dbquery, (querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                schemes_type.push(doc.data());
            });
    
            addAllItemsToTable(schemes_type);
    
        });
    
    }
    
    
    //--------------additional option-----------------------
    
    
    async function filteradditional(additional){
        let students_gen = [];
    
        const GenRef = collection(db,"SchemesList");
        const additionalRef = query(GenRef,where("Gender_type","==",additional));
        onSnapshot(additionalRef, (querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                students_gen.push(doc.data());
            });
    
            addAllItemsToTable(students_gen);
    
        });
    }
    
    
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
    

//-----------------------------------------------

auth.onAuthStateChanged((user) => {
    // Check if the user is logged in and passing error checking as a third argument
    if (user) {

        console.log("auhtorized user")
        setupUI(user);
        // window.location.href = "crud_scheme.html";
        alert("user already logged in ...")
        // setupUI(user);
    } else {

            console.log("User logged out");
            setupUI();

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
     
