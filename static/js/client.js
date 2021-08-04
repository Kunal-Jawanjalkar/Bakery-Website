// console.log("this is client.js")

// Code to toggle the navigation menu
let navigationMenu = document.querySelector(".navigation-menu");
let search = document.querySelector(".search");

let navigationToggle = document.querySelector(".navigation-toggle");
// console.log(navigationToggle);
navigationToggle.addEventListener("click", () => {
  navigationMenu.classList.toggle("active");
  search.classList.toggle("active");
  navigationToggle.classList.toggle("active");
});

// ------CODE TO REQUIRE JWT TOKEN ------
 // Destructuring input fiels on login page
const [loginEmail, loginPassword, loginBtn] = [
  document.querySelector(".login-email"),
  document.querySelector(".login-password"),
  document.querySelector(".login-btn"),
];

let loginForm = document.querySelector("form.loginForm");
// function to send data through post request

if (loginForm != null) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      }),
    });
    let data = await response.json();

    // Validation for email and password
    console.log(data);
    if (data.msg) {
      console.log(data.msg);
      let alert = document.querySelector("h3.alert");
      const msg = data.msg;
      alert.innerHTML = msg;
    }
    // Saving the auth token to local storage
    console.log("this is auth-token", data["auth-token"]);
    localStorage.setItem("auth-token", `${data["auth-token"]}`);
  });
}

// Code to send order request
let orderAlert = document.querySelector("h3.orderAlert");
const orderForm = document.querySelector("form.orderForm");

if (orderForm != null) {
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Destructring all the input fields on the order page
    const [name, phone, order, quantity, address] = [
      document.querySelector("#name"),
      document.querySelector("#phone"),
      document.querySelector("#order"),
      document.querySelector("#quantity"),
      document.querySelector("#address"),
    ];

    // Check whether auth token exists or not
    const authToken = localStorage.getItem("auth-token");
    if (authToken === null)
      return (orderAlert.innerHTML = "Login first to order");

    //  Set the headers and body for the request
    let headers = {
      "auth-token": localStorage.getItem("auth-token"),
      "Content-Type":"application/json"
    };
    let body = {
      name: name.value,
      phone: phone.value,
      order: order.value,
      quantity: quantity.value,
      address: address.value,
    };

    // Sending post request to orderonline endpoint
    try{
      const response = await fetch("/orderonline", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      let data = await response.json();
      if(data.msg){
        orderAlert.innerHTML = `${data.msg}`
      }
      console.log(data);
      name.value = "";
      phone.value = "";
      address.value ="";
    }catch(err){
      if (err) orderAlert.innerHTML = err
    }

  });
}
