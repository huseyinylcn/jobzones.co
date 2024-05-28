let profileimg = document.getElementById("profileimg");
let profileFullName = document.getElementById("profileFullName");
let profileStatus = document.getElementById("profileStatus");
let profileTopBtn = document.getElementById("profileTopBtn");

let profileFullnameView = document.getElementById("profileFullnameView");
let statutView = document.getElementById("statutView");
let talentBoxView = document.getElementById("talentBoxView");
let profileImgview = document.getElementById("profileImgview");
let miniPhoto = document.getElementById("miniPhoto");
let imgChange = document.getElementById("imageFile");











imgChange.addEventListener('change',()=>{
  let file = imgChange.files[0]
  const reader = new FileReader();
  reader.onload = function(e) {
    profileimg.src = e.target.result;
  
  };
  reader.readAsDataURL(file);
})

let talentArray = [];
let srcUpdate = (element) => {

  profileImgview.src = element;
  miniPhoto.src = element;

 modalBoxprofileClose.click()
};

let viewUpdate = () => {
try {
  

  if (profileStatus.value == 1) {

    statutView.dataset.value = 1;
    statutView.innerHTML =
      '<i style="font-size:20px;" class="fa-solid fa-thumbs-up"></i>';
  } else {
    statutView.dataset.value = 0;
    statutView.innerHTML =
      '<i style="font-size:20px;" class="fa-solid fa-thumbs-down"></i>';
  }
  talentBoxView.innerHTML = "";
  profileFullnameView.innerHTML = profileFullName.value;
} catch (error) {
  
}

talentArray = []



let input = talentBox.getElementsByTagName("input");
  for (let i = 0; i < input.length; i++) {
    talentArray.push(input[i].value);
    try {
      talentBoxView.innerHTML += ` <a  style="color: rgb(0, 155, 46); font-weight: 400;" href="#">${input[i].value}</a>`;
    } catch (error) {
      
    }
    
  }


};

profileTopBtn.addEventListener("click", () => {
  
 viewUpdate()


  

  const fileInput = document.getElementById("imageFile");
  if (fileInput.files.length == 0) {
    fetch("/dashboard/profiloverviewthreee/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        talent: talentArray,
        fullname: profileFullName.value,
        status: profileStatus.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        modalBoxprofile.style.transform = "translateY(-100%)";
      });
  } else {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    fetch("/dashboard/profileoverview/imgPush/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json();
      })
      .then((datas) => {
        fetch("/dashboard/profiloverviewthreee/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            talent: talentArray,
            fullname: profileFullName.value,
            status: profileStatus.value,
          }),
        })
          .then((response) => response.json())
          .then((datam) => {
            srcUpdate(datam);
          });
      })
      .catch((error) => {
        console.error("İstek gönderilirken bir hata oluştu:", error);
      });
  }
});
modalEditOpenBtn.addEventListener("click", () => {


  profileimg.src = profileImgview.src


  talentBox.innerHTML = "";
  profileFullName.value = profileFullnameView.innerHTML;

  let a = talentBoxView.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    let div = document.createElement("div");
    div.innerHTML += `      
    <label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Talent <span onclick="talentClose(this)" style="cursor: pointer; float: right; margin-right: 10px;"><i  style="font-size: 20px;  " class="fa-solid fa-xmark"></i></span></label>
    <input value="${a[i].innerHTML}" style="color:black; height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*example Javascript" type="text">
 `;
    talentBox.appendChild(div);
  }

  if (statutView.dataset.value == 1) {
    profileStatus.value = 1;
  } else {
    profileStatus.value = 0;
  }
});
