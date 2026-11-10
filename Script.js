const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");

let students = JSON.parse(localStorage.getItem("students")) || [];

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value.trim();
    const existingStudent = students.find(function(student) {
    return student.roll === roll;
});

if (existingStudent) {
    alert("This Roll Number already exists!");
    return;
}


    const student = {
    id: Date.now(),
    name: name,
    roll: roll,
    email: email,
    course: course
};

students.push(student);

localStorage.setItem("students", JSON.stringify(students));

displayStudents(students);
studentForm.reset();

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents(students);

    studentForm.reset();

});

function displayStudents(data) {

    studentList.innerHTML = "";
    document.getElementById("totalStudents").textContent =
    "Total Students: " + students.length;

    data.forEach(function(student) {

        const div = document.createElement("div");

        div.className = "student-card";

        const heading = document.createElement("h3");
        heading.textContent = student.name;

        const roll = document.createElement("p");
        roll.textContent = "Roll Number: " + student.roll;

        const email = document.createElement("p");
        email.textContent = "Email: " + student.email;

        const course = document.createElement("p");
        course.textContent = "Course: " + student.course;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function() {
            editStudent(student.id);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            deleteStudent(student.id);
        };

        div.append(heading, roll, email, course, editBtn, deleteBtn);

        studentList.appendChild(div);

    });
}

function editStudent(id) {

    const student = students.find(s => s.id === id);

    const newName = prompt("Enter New Name", student.name);

    if (newName && newName.trim() !== "") {
        student.name = newName.trim();
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents(students);
    }
}

function deleteStudent(id) {

    students = students.filter(s => s.id !== id);

    displayStudents(students);

}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {
        return student.name.toLowerCase().includes(searchText) ||
               student.roll.toLowerCase().includes(searchText) ||
               student.course.toLowerCase().includes(searchText);
    });

    displayStudents(filteredStudents);
});

