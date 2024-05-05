//GETTING A REFERENCE FOR THE INPUT FIELD
const inputForm = document.querySelector(".inputs");

//GETTING A REFERENCE FOR THE OUTPUT FIELD
const outputField = document.querySelector(".output");

//GETTING A REFERENCE FOR THE REFERENCE FIELD
const recentContainer = document.querySelector(".recent");

//Function for concatenating arrays
const userInputs = (user) => {
  let string = [];

  user.forEach((user) => {
    string = [user.name, user.age, user.level];
    return string;
  });

  string = [string.join("/")];

  //Display the string in recents
  generateRecentTemplate(string, user[0].id);

  //output the string in the output field
  outputField.textContent = string[0];
};

//Listen for when the input field is submitted
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = inputForm.querySelector("#name");
  let age = inputForm.querySelector("#age");
  let level = inputForm.querySelector("#level");
  const id = Date.now();


  const userInput = [{ name: name.value, age: age.value, level: level.value, id}];

  //Retrieve values from local storage
  let storedInputs = getData();
  storedInputs.push(userInput[0]);

  //Store new values from local storage
  saveData(storedInputs);

  userInputs(userInput);

  //Clear the input fields after submission
  inputForm.reset();
});

//Function for retrieving data from local storage
const getData = () => JSON.parse(localStorage.getItem("data")) || [];

//Function for storing data in local storage
const saveData = (data) => localStorage.setItem("data", JSON.stringify(data));

//Function for deleting data from local storage
const deleteData = (id) => {
    //Retrieve existing data
    let storedDatas = getData();

    //Filter out data with specified data
    storedDatas = storedDatas.filter(storedData => storedData.id != id);

    //Update local storage
    saveData(storedDatas);
}

//Listen for when the delete button is clicked in the recents
recentContainer.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        let id = e.target.parentElement.getAttribute("id");
        deleteData(id);//Delete the data from local storage
        e.target.parentElement.remove();
    }
});

//Function for adding items to recents
const generateRecentTemplate = (string, id) => {
  recentContainer.innerHTML += `
        <li id="${id}">
            <span>
                ${string}
            </span>
        
            <div class="delete">X</div>
        </li>
    `;
};

//Function for rendering data from local storage
const renderRecentsFromLocalStorage = () => {
    let storedInputs = getData();

    storedInputs.forEach(storedInput => {
        let string = [
            storedInput.name,
            storedInput.age,
            storedInput.level
        ];
        string= string.join("/");

        recentContainer.innerHTML += `
        <li id="${storedInput.id}">
            <span>
                ${string}
            </span>
        
            <div class="delete">X</div>
        </li>
    `;
    });
}
renderRecentsFromLocalStorage();//Render data on page load