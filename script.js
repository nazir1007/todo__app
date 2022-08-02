let data = [];
// localStorage used for data
if (localStorage.data && localStorage.data != "[]") {
  data = JSON.parse(localStorage.data);
}

let lastId = 0;
if (localStorage.lastId) {
  lastId = parseInt(localStorage.lastId);
}

// getTask function for getting data
function getTask() {
  show(data);
}

// addTask function to add the data in the table
function addTask(e) {
  e.preventDefault();

  const task = document.querySelector("#task").value;
  if (task == "") {
    alert("enter your task");
    return;
  }

  lastId++;

  data.push({
    id: lastId,
    title: task,
  });

  getTask();
  localStorage.data = JSON.stringify(data);
  localStorage.lastId = lastId;
  document.querySelector("#task").value = "";
}

// updateTask function for updating task status
function updateTask(id) {
  data = data.map((e) => (e.id == id ? { ...e, status: true } : e));
  localStorage.data = JSON.stringify(data);
  getTask();
}

// deleteTask function for deleting data from table
function deleteTask(id) {
  data = data.filter((e) => e.id != id);
  localStorage.data = JSON.stringify(data);
  getTask();
}

getTask();

//  dom used for getting data from form
const addBtn = document.querySelector("form");

// envent listener for adding the task
addBtn.addEventListener("submit", addTask);

// Function to define innerHTML for HTML table
function show(task) {
  let tab = `<tr></tr>`;

  // Loop to access all rows
  for (let r of task) {
    let color = "";
    let clkevt = "";
    if (r.status == true) {
      color = "green";
    } else {
      color = "red";
      clkevt = `onclick="updateTask('${r.id}')"`;
    }
    tab += `<tr style="color: ${color}">
      	<td  ${clkevt}>${r.title} </td>  
      	<td  onclick="deleteTask('${r.id}')"><i class="fa fa-trash"></i></td>
      </tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("app").innerHTML = tab;
}
