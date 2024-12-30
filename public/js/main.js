const show = document.querySelector("#show-all-user");
const button = document.querySelector("#get-user-btn");
const addNewUser = document.querySelector("#add-user-form");

// Get and display all users
async function showUsers() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/users");
    if (!res.ok) {
      throw new Error("Failde to fatch users");
    }

    const users = await res.json();
    users.innerHTML = "";

    users.forEach((user) => {
      const userElement = document.createElement("li");
      userElement.appendChild(document.createTextNode(user.name));
      show.appendChild(userElement);
    });
  } catch (err) {
    console.error("Error fetching users :", err);
  }
}

// Submit new user
async function addUsers(e) {
  e.preventDefault();
  const formData = new FormData(this);

  const name = formData.get("name");
  try {
    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const newUser = await res.json();

    const userElement = document.createElement("div");
    userElement.textContent = newUser.name;
    show.appendChild(userElement);
    showUsers();
  } catch (err) {
    console.error("Error adding user :", err);
  }
}

// Event listener for button
button.addEventListener("click", showUsers);
addNewUser.addEventListener("submit", addUsers);
