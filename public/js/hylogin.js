let loginUsername = document.getElementById('loginUsername')
let loginPassword = document.getElementById('loginPassword')
let loginButton = document.getElementById('loginButton')
let loginWarning = document.getElementById('loginWarning')


loginButton.addEventListener('click',()=>{
    fetch("/login/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email:loginUsername.value,
          password:loginPassword.value
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.respons){
                window.location.href = "/";
            }
            else{
                window.scrollTo({
                    top: 50,
                    behavior: "smooth", 
                  });
                loginWarning.innerHTML = 'Username or password incorrect'
            }
        });
})