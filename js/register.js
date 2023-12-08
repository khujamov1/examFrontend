const elRegisterMainForm = document.querySelector(".js-register-form");
const elRegisterNameInput = elRegisterMainForm.querySelector(".register-username");
const elRegisterPhoneInput = elRegisterMainForm.querySelector(".register-phone");
const elRegisterEmailInput = elRegisterMainForm.querySelector(".register-email");
const elRegisterPasswordInput = elRegisterMainForm.querySelector(".register-password");





async function registerFetchProccess(url, userName, userPhone, userEmail, userPassword) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: userName,
                phone: userPhone, 
                email: userEmail,
                password: userPassword,
            })
        });
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
    } catch (error) {
        console.log(error);
    }
}

if(localStorage.getItem("token")) {
    window.location.replace("./login.html");
}

elRegisterMainForm.addEventListener("submit", evt => {
    evt.preventDefault();
    
    const elRegisterNameInputVal = elRegisterNameInput.value.trim();
    const elRegisterPhoneInputVal = elRegisterPhoneInput.value.trim();
    const elRegisterEmailInputVal = elRegisterEmailInput.value.trim();
    const elRegisterPasswordInputVal = elRegisterPasswordInput.value.trim();
    
    registerFetchProccess("http://localhost:5000/user/register", elRegisterNameInputVal, elRegisterPhoneInputVal, elRegisterEmailInputVal, elRegisterPasswordInputVal);
})