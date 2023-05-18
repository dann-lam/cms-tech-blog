const loginFormHandler = async (event) => {
  console.log("Hi! You clicked on login!");
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (name && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Login successful!");
      document.location.replace("/dashboard");
    } else {
      console.log("Failed to log in!");
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
