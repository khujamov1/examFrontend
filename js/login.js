const elLoginMainForm = document.querySelector(".login-form");
const elLoginEmail = elLoginMainForm.querySelector(".login-email");
const elLoginPassword = elLoginMainForm.querySelector(".login-password");


async function loginFetchProccess(url, userEmail, userPassword) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword,
            })
        });
        const data = await response.json();
        localStorage.setItem("token", data.token)
    } catch (error) {
        console.log(error);
    }
}


elLoginMainForm.addEventListener("submit", evt => {
    evt.preventDefault();
    
    const emailInputVal = elLoginEmail.value.trim();
    const passwordInputVal = elLoginPassword.value.trim();
    
    loginFetchProccess("http://localhost:5000/user/login", emailInputVal, passwordInputVal);
    if(localStorage.getItem("token")) {
        window.location.replace("./index.html");
    }
})

if(localStorage.getItem("token")) {
    window.location.replace("./index.html");
}