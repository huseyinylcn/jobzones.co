let SignTypeID = document.getElementById("SignTypeID");
let SignUsername = document.getElementById("SignUsername");
let Signemail = document.getElementById("Signemail");
let Signpassword = document.getElementById("Signpassword");
let Signpassword2 = document.getElementById("Signpassword2");
let Signtermofuse = document.getElementById("Signtermofuse");
let SigninWarning = document.getElementById("SigninWarning");
let exampleModalCenter = document.getElementById("exampleModalCenter");
let signVerifyWrite = document.getElementById("signVerifyWrite");
let verifyCode = document.getElementById("verifyCode");
let signmodalwarn = document.getElementById("signmodalwarn");
let signforcode = document.getElementById("signforcode");
let googleIDaElement = document.getElementById("googleIDaElement");

let employerOpen = document.getElementById("employerOpen");
let candidateOpen = document.getElementById("candidateOpen");
let globalEmpcandi = 0;
var izinVerilenKarakterlerRegex = /^[a-zA-Z0-9]*$/;

employerOpen.addEventListener("click", () => {
  googleIDaElement.href = "/signin/google/?employer=1";
  globalEmpcandi = 1;
});

candidateOpen.addEventListener("click", () => {
  googleIDaElement.href = "/signin/google/?employer=0";

  globalEmpcandi = 0;
});

let globalVerify = 0;

let SignUsernameValue = SignUsername.value;
let SignTypeIDValue = SignTypeID.value;
let SignemailValue = Signemail.value;
let SignpasswordValue = Signpassword.value;
let Signpassword2Value = Signpassword2.value;
let SigntermofuseValue = Signtermofuse.checked;

function InputControl() {
  SignUsernameValue = SignUsername.value.toLowerCase();
  SignTypeIDValue = SignTypeID.value;
  SignemailValue = Signemail.value;
  SignpasswordValue = Signpassword.value;
  Signpassword2Value = Signpassword2.value;
  SigntermofuseValue = Signtermofuse.checked;

  if (
    SignpasswordValue.length <= 0 ||
    Signpassword2Value.length <= 0 ||
    SignUsernameValue.length <= 0 ||
    SignemailValue.length <= 0
  ) {
    SigninWarning.innerHTML = "Please Do Not Leave Blank";
    window.scrollTo({
      top: 50,
      behavior: "smooth", // Düzgün bir kaydırma efekti için
    });
  } else if (!izinVerilenKarakterlerRegex.test(SignUsernameValue)) {
    SigninWarning.innerHTML =
      "Only English characters and numbers in the username";
    window.scrollTo({
      top: 50,
      behavior: "smooth", // Düzgün bir kaydırma efekti için
    });
  } else if (SignpasswordValue !== Signpassword2Value) {
    SigninWarning.innerHTML = " Passwords Don't Match";
    window.scrollTo({
      top: 50,
      behavior: "smooth", // Düzgün bir kaydırma efekti için
    });
  } else if (SignpasswordValue.length < 8) {
    SigninWarning.innerHTML = " Password must be at least 8 characters";
    window.scrollTo({
      top: 50,
      behavior: "smooth", // Düzgün bir kaydırma efekti için
    });
  } else if (!SigntermofuseValue) {
    SigninWarning.innerHTML = " Accept terms of use";
    window.scrollTo({
      top: 50,
      behavior: "smooth", // Düzgün bir kaydırma efekti için
    });
  } else {
    $(".preload").show();

    var showPreloader = function () {
      $(".preload").fadeOut("slow", function () {
        setTimeout(function () {}, 1000);
      });
    };

    record()
      .then((data) => {
        showPreloader();
        if (data.result == 1) {
          exampleModalCenter.style.transform = "translateY(0%)";
        } else {
          SigninWarning.innerHTML = data.message;
        window.scrollTo({
            top: 50,
            behavior: "smooth", // Düzgün bir kaydırma efekti için
          });
        }
      })
      .catch((err) => {
        exampleModalCenter.style.transform = "translateY(-500%)";
        SigninWarning.innerHTML = "Error Lütfen daha sonra tekrar deneyin";
        console.log(err);
      })
      .finally(() => {
        window.scrollTo({
          top: 50,
          behavior: "smooth", // Düzgün bir kaydırma efekti için
        });
      });
  }
}

signVerifyWrite.addEventListener("click", () => {
  verify(verifyCode.value).then(data=>{
    console.log(data)
    if(data.result == 1){
      window.location.href = '/home'
    }else{
      signmodalwarn.innerHTML = 'Error Code'
      verifyCode.value = ''
    }
  }).catch(err=>{
    console.log(err)
    signmodalwarn.innerHTML = 'System Error'
  })
});


signforcode.addEventListener('click',()=>{
  InputControl()
})