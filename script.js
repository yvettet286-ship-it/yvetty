const archaeologists = [
    { username: "alice", password: "1234" },
    { username: "john", password: "abcd" },
    { username: "kelia", password: "fll" }
];
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validUser = archaeologists.find(
        user => user.username === username && user.password === password
    );

    if (validUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        window.location.href = "add-record.html";
    } else {
        alert("Access denied. Authorized archaeologists only.");
    }
}

// 3️⃣ LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// 4️⃣ SAVE RECORD
function saveRecord(event) {
    event.preventDefault();

    const record = {
        name: event.target[0].value,
        location: event.target[1].value,
        period: event.target[2].value,
        description: event.target[3].value,
        author: localStorage.getItem("currentUser")
    };

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    alert("Record saved successfully!");
    event.target.reset();
}

// 5️⃣ LOAD RECORDS (PUBLIC)
function loadRecords() {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    const list = document.getElementById("recordsList");

    if (!list) return;

    if (records.length === 0) {
        list.innerHTML = "<p>No records available.</p>";
        return;
    }

    records.forEach(record => {
        const div = document.createElement("div");
        div.className = "record-card";
        div.innerHTML = `
            <h3>${record.name}</h3>
            <p><strong>Location:</strong> ${record.location}</p>
            <p><strong>Period:</strong> ${record.period}</p>
            <p>${record.description}</p>
            <p><em>Recorded by: ${record.author}</em></p>
        `;
        list.appendChild(div);
    });
}

loadRecords();