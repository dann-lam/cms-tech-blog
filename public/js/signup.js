//Sign up submission
async function signupFormHandler(event) {
  event.preventDefault();
  console.log("I signed in!");
  // Collect values from the sign up form
  const name = document.querySelector("#name-signup").value.trim();
  console.log("name is: ", name);
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  // Send a POST request to the API endpoint
  if (name && password && email) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("success");
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
