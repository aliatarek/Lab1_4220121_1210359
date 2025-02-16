function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
// document.addEventListener("DOMContentLoaded", () => {
//   fetchEmployees(); // Load employees when the page loads

  // Add event listener to the submit button
  document.getElementById("employeeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
  
    createEmployee(); // Call function to create an employee
  });

  // Use event delegation to handle delete button clicks
  document.getElementById("dataTable").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
      const row = event.target.closest("tr"); 
      if (!row) return;

      const employeeId = row.children[0].textContent.trim(); 

      deleteEmployee(employeeId); 
    }
  });
//});

// TODO
// add event listener to delete button

// TODO
function createEmployee() {
  const idInput = document.getElementById("id").value.trim(); // Get ID input
  const nameInput = document.getElementById("name").value.trim(); // Get name input

  if (!idInput || !nameInput) {
    alert("Please enter both an ID and a Name!");
    return;
  }

  fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: idInput, name: nameInput }), // Send both ID and Name
  })
    .then((response) => response.json())
    .then(() => {
      document.getElementById("id").value = ""; // Clear input field
      document.getElementById("name").value = "";
      fetchEmployees(); // Refresh table
    })
    .catch((error) => console.error("Error creating employee:", error));
}


// TODO
function deleteEmployee(id) {  
  console.log("Deleting employee with ID:", id); // Debugging line
  
  if (!confirm("Are you sure you want to delete this employee?")) return;

  fetch(`http://localhost:3000/api/v1/employee/${id}`, { 
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => {
      console.log("Delete response:", data); // Debugging line
      fetchEmployees(); // Refresh the list
    })
    .catch((error) => console.error("Error deleting employee:", error));
  // get id
  // send id to BE
  // call fetchEmployees
}

fetchEmployees()
