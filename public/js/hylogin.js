let loginUsername = document.getElementById('loginUsername');
let loginPassword = document.getElementById('loginPassword');
let loginButton = document.getElementById('loginButton');
let loginWarning = document.getElementById('loginWarning');

loginButton.addEventListener('click', () => {
    fetch("/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginUsername.value,
          password: loginPassword.value
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.result);
        if(data.result ==1){
            window.location.href = "/home";
        } else {
            window.scrollTo({
                top: 50,
                behavior: "smooth", 
            });
            loginWarning.innerHTML = 'Username or password incorrect';
        }
    })
    .catch((error) => {
        console.log('Error:', error);
        loginWarning.innerHTML = 'An error occurred. Please try again later.';
    });
});
