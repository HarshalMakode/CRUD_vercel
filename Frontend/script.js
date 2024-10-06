function openModal(modalId) {
    $(modalId).modal('show');
    let modal = document.querySelector(modalId);
    if (modal) {
        modal.style.display = "block"; // Show the modal
    } else {
        console.error("Modal not found:", modalId);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display all students when the page loads
    fetchStudents();

    // Add new student
    let addStudentForm = document.querySelector("#addStudentModal form");
    
    // Ensure the event listener is not added multiple times
    if (!addStudentForm.dataset.listener) {
        addStudentForm.dataset.listener = "true"; // Set a flag to prevent multiple listeners
        
        addStudentForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default form submission

            // Disable the submit button to prevent double submission
            let submitButton = addStudentForm.querySelector("input[type='submit']");
            submitButton.disabled = true;

            let rollno = document.querySelector('input[name="rollno"]').value;
            let name = document.querySelector('input[name="name"]').value;
            let email = document.querySelector('input[name="email"]').value;
            let mbno = document.querySelector('input[name="phone"]').value;

            // POST request to add a new student
            fetch("https://crud-vercel-backend-omega.vercel.app/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rollno, name, email, mbno }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Student added:", data);
                closeModal("#addStudentModal");
                addStudentForm.reset(); // Reset the form fields
                fetchStudents(); // Refresh student list
            })
            .catch((error) => console.error("Error:", error))
            .finally(() => {
                // Re-enable the submit button
                submitButton.disabled = false;
            });
        });
    }
});



// Function to fetch and display students in the table
function fetchStudents() {
    fetch("https://crud-vercel-backend-omega.vercel.app/api/students")
        .then((response) => response.json())
        .then((data) => {
            let tableBody = document.querySelector("tbody");
            tableBody.innerHTML = ""; // Clear previous data
            data.forEach((student) => {
                tableBody.innerHTML += `
                  <tr>
                      <td>${student.rollno}</td>
                      <td>${student.name}</td>
                      <td>${student.email}</td>
                      <td>${student.mbno}</td>
                      <td>
                          <a href="#editStudentModal" class="edit" data-id="${student._id}"><i class="material-icons">&#xE254;</i></a>
                          <a href="#deleteStudentModal" class="delete" data-id="${student._id}"><i class="material-icons">&#xE872;</i></a>
                      </td>
                  </tr>`;
            });
            attachEditListeners();
            attachDeleteListeners();
        })
        .catch((error) => console.error("Error fetching students:", error));
}

function attachDeleteListeners() {
    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", (event) => {
            let studentId = button.dataset.id;

            // Log the student ID to be deleted
            console.log("Deleting student with ID:", studentId);

            // DELETE request to remove the student
            fetch(`https://crud-vercel-backend-omega.vercel.app/api/students/${studentId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to delete student: " + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Student deleted successfully:", data.message);
                    fetchStudents(); // Refresh student list
                })
                .catch((error) => console.error("Error deleting student:", error));
        });
    });
}

function attachEditListeners() {
    document.querySelectorAll(".edit").forEach((button) => {
        button.addEventListener("click", (event) => {
            let studentId = button.dataset.id;
            console.log("Edit button clicked for student ID:", studentId);

            // Fetch the student details to pre-fill the form
            fetch(`https://crud-vercel-backend-omega.vercel.app/api/students/${studentId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((student) => {
                    console.log("Fetched student data:", student);
                    document.querySelector('#editRollNo').value = student.rollno;
                    document.querySelector('#editName').value = student.name;
                    document.querySelector('#editEmail').value = student.email;
                    document.querySelector('#editPhone').value = student.mbno;

                    openModal("#editStudentModal");
                })
                .catch((error) => console.error("Error fetching student:", error));
        });
    });

    // Add submit event for the edit form
    document.querySelector("#editStudentModal form").addEventListener("submit", (e) => {
        e.preventDefault();
        let rollno = document.querySelector('#editRollNo').value;
        let name = document.querySelector('#editName').value;
        let email = document.querySelector('#editEmail').value;
        let mbno = document.querySelector('#editPhone').value;
        let studentId = document.querySelector(".edit").dataset.id; // Get the ID of the student being edited

        // PUT request to update the student
        fetch(`https://crud-vercel-backend-omega.vercel.app/api/students/${studentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rollno, name, email, mbno }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Student updated:", data);
                closeModal("#editStudentModal");
                fetchStudents(); // Refresh student list
            })
            .catch((error) => console.error("Error updating student:", error));
    });
}

// Function to close modal after action
function closeModal(modalId) {
    $(modalId).modal('hide');
    let modal = document.querySelector(modalId);
    modal.style.display = "none"; // Or use bootstrap/js equivalent to hide modal
}
