const loginForm = document.getElementById("loginForm");
const recordSection = document.getElementById("recordSection");

// List of archaeologists (add more as needed)
const validUsers = [
    { username: "arch1", password: "1234" },
    { username: "arch2", password: "abcd" }
];

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let userValid = validUsers.some(u => u.username === username && u.password === password);

    if(userValid){
        alert("Login successful!");
        loginForm.style.display = "none";
        recordSection.style.display = "block";

        // Store current user for records page
        localStorage.setItem("currentUser", username);
    } else {
        alert("Invalid credentials!");
    }
});

// ---------------- ADD RECORD ----------------
document.getElementById("recordForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    let username = localStorage.getItem("currentUser");

    let record = {
    user: username,
    archaeologist: document.getElementById("archName").value,
    name: document.getElementById("name").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    photo: photoData,
    video: videoData
};

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    alert("Record saved successfully!");
    document.getElementById("recordForm").reset();
});