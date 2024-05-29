let saveProfile = document.getElementById("saveProfile");

let jobProfile = document.getElementById("jobProfile");
let locationProfile = document.getElementById("cadidatesLocationKeyWordID");
let phoneProfil = document.getElementById("phoneProfil");
let linkedinProfile = document.getElementById("linkedinProfile");
let focebookProfile = document.getElementById("focebookProfile");
let tiwitterProfile = document.getElementById("tiwitterProfile");
let pinterestProfile = document.getElementById("pinterestProfile");
let instagramProfile = document.getElementById("instagramProfile");
let youtubeProfile = document.getElementById("youtubeProfile");

let grnderView = document.getElementById("grnderView");
let genderInput = document.getElementById("genderInput");

let linkedinProfileView = document.getElementById("linkedinProfileView");
let focebookProfileView = document.getElementById("focebookProfileView");
let tiwitterProfileView = document.getElementById("tiwitterProfileView");
let pinterestProfileView = document.getElementById("pinterestProfileView");
let instagramProfileView = document.getElementById("instagramProfileView");
let youtubeProfileView = document.getElementById("youtubeProfileView");
let sosialMedia = document.getElementById("sosialMedia");
let sosialMadiaInputBox = document.getElementById("sosialMadiaInputBox");

let languageProfileView = document.getElementById("languageProfileView");

let jobProfileView = document.getElementById("jobProfileView");
let locationProfileView = document.getElementById("locationProfileView");
let phoneProfilView = document.getElementById("phoneProfilView");
let birthProfil = document.getElementById("birthProfil");
let birthProfilView = document.getElementById("birthProfilView");

let departmanView = document.getElementById("departmanView");

let modePElementView = document.getElementById('modePElementView')
let modeUl = document.getElementById('modeUl')


let modeProfilView = document.getElementById('modeProfilView')





modeUl.style.display = 'none'

modePElementView.addEventListener('click',()=>{
    if(  modeUl.style.display == 'none'){
        modeUl.style.display = 'block'
    }else{
        modeUl.style.display = 'none'
    }
  
})

let liList =   modeUl.getElementsByTagName('input')
for(let i = 0;i<liList.length;i++){

liList[i].addEventListener('click',()=>{
    modeUpdate()
})
}
let modeUpdate = ()=>{
let control = true
modePElementView.innerHTML = ''
for(let i = 0;i<liList.length;i++){
if(liList[i].checked){
control = false

let viewData = liList[i].dataset.value
let endOption = viewData.split(',')

modePElementView.innerHTML += ` ${endOption[0]}`
}

}
if(control){
    modePElementView.innerHTML += `Select Mode`
}
}


document.addEventListener("click", function(event) {
var clickedElement = event.target;


if (clickedElement === modePElementView || modeUl == clickedElement) {

} else {

modeUl.style.display = 'none'


}
});



















modalBoxInfoBtn.addEventListener("click", () => {
modePElementView.innerHTML = ''

  let liListt =   modeUl.getElementsByTagName('input')


 let modeSTR = modeProfilView.dataset.value
 let modeList = modeSTR.split(',');
  modeList.forEach(mode => {

    for(let i = 0;i < liListt.length;i++){
      let checked = liListt[i].dataset.value.split(',');
  
      if(checked[1] == mode){
        liListt[i].checked = true
        modePElementView.innerHTML += `${checked[0]}, `
      }
    }
  
     
  });


  birthProfil.value = birthProfilView.innerHTML;
  depatmanSelectİnput.value = departmanView.innerHTML;
  languageBox.innerHTML = "";
  languageList = languageProfileView.innerHTML.split(",");

  languageList.forEach((element) => {
    let div = document.createElement("div");
    div.innerHTML = ` 
<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Language <span onclick="languageClose(this)" style="cursor: pointer; float: right; margin-right: 10px;"><i  style="font-size: 20px;  " class="fa-solid fa-xmark"></i></span></label>
<input value="${element}" id="languageProfil" style="color:black; height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*language" type="tel">
`;
    languageBox.appendChild(div);
  });

  jobProfile.value = jobProfileView.innerHTML;
  locationProfile.value = locationProfileView.innerHTML;
  phoneProfil.value = phoneProfilView.innerHTML;

  focebookProfile.value = focebookProfileView.getAttribute("href");
  linkedinProfile.value = linkedinProfileView.getAttribute("href");
  tiwitterProfile.value = tiwitterProfileView.getAttribute("href");
  pinterestProfile.value = pinterestProfileView.getAttribute("href");
  instagramProfile.value = instagramProfileView.getAttribute("href");
  youtubeProfile.value = youtubeProfileView.getAttribute("href");
});

let viewUpdate2 = () => {
  return new Promise((resolve, reject) => {
    let div = languageBox.getElementsByTagName("input");
    try {
      languageProfileView.innerHTML = "";
      focebookProfileView.setAttribute("href", focebookProfile.value);

      linkedinProfileView.setAttribute("href", linkedinProfile.value);

      tiwitterProfileView.setAttribute("href", tiwitterProfile.value);

      pinterestProfileView.setAttribute("href", pinterestProfile.value);

      instagramProfileView.setAttribute("href", instagramProfile.value);

      youtubeProfileView.setAttribute("href", youtubeProfile.value);

      let input = sosialMadiaInputBox.getElementsByTagName("input");

      for (let i = 0; i < input.length; i++) {
        let regex = /\S/;
        if (!regex.test(input[i].value)) {
          let inputID = input[i].id + "View";

          let elementToRemove = document.getElementById(inputID);
          if (elementToRemove) {
            elementToRemove.remove();
          }
        } else {
          let inputID = input[i].id + "View";
          let elementToRemove = document.getElementById(inputID);
          if (elementToRemove) {
            elementToRemove.remove();
          }
          let a = document.createElement("a");
          a.href = input[i].value;
          a.id = inputID;
          if (inputID == "focebookProfileView") {
            a.className = "icon-facebook";
          } else if (inputID == "linkedinProfileView") {
            a.className = "icon-linkedin2";
          } else if (inputID == "tiwitterProfileView") {
            a.className = "icon-twitter";
          } else if (inputID == "pinterestProfileView") {
            a.className = "icon-pinterest";
          } else if (inputID == "instagramProfileView") {
            a.className = "icon-instagram1";
          } else if (inputID == "youtubeProfileView") {
            a.className = "icon-youtube";
          }
          sosialMedia.appendChild(a);
        }
      }
      birthProfilView.innerHTML = birthProfil.value;
      jobProfileView.innerHTML = jobProfile.value;
      locationProfileView.innerHTML = locationProfile.value;
      phoneProfilView.innerHTML = phoneProfil.value;
      if (genderInput.value == 0) {
        grnderView.innerHTML = "Woman";
      } else if (genderInput.value == 1) {
        grnderView.innerHTML = "Male";
      } else {
        grnderView.innerHTML = "";
      }

      for (let i = 0; i < div.length; i++) {
   
        if (i === div.length - 1) {
          languageProfileView.innerHTML += div[i].value;
        } else {
          languageProfileView.innerHTML += `${div[i].value},`;
        }
      }
    } catch (error) {}

    let lng = "";
    for (let i = 0; i < div.length; i++) {
   
      if (i === div.length - 1) {
        lng += div[i].value;
      } else {
        lng += `${div[i].value},`;
      }
    }
    resolve({ language: lng });
  });
};
saveProfile.addEventListener("click", () => {


  let liLists =   modeUl.getElementsByTagName('input')


  let modeArray = []
 for(let listNumber = 0;listNumber < liLists.length;listNumber++){
  if(liLists[listNumber].checked){
    let result = liLists[listNumber].dataset.value
    result = result.split(',')
    modeArray.push(result[1])
    }
 }




  depatmanSelectİnput.click()
  cadidatesLocationKeyWordID.click()
  let resolveLocation = otoSelect();

  let otoSelectDepartman = otoSelectDep();

  viewUpdate2().then((data) => {
    let gender = genderInput.value;
    let job = jobProfile.value;
    let locations = resolveLocation;
    let phone = phoneProfil.value;
    let language = data.language;
    let birth = birthProfil.value;

    let facebook = focebookProfile.value;
    let linkedin = linkedinProfile.value;
    let twitter = tiwitterProfile.value;
    let pinterest = pinterestProfile.value;
    let instagram = instagramProfile.value;
    let youtube = youtubeProfile.value;
    let departman = otoSelectDepartman;
    

    fetch("/dashboard/profiloverviewtwo/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        job: job,
        location: locations,
        phone: phone,
        language: language,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
        pinterest: pinterest,
        instagram: instagram,
        youtube: youtube,
        birth: birth,
        gender: gender,
        departman: departman,
        modeArray:modeArray
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        modalBoxInfoClose.click();
      }).catch(err=>{
        console.log(err)
      })
  });
});

focebookProfile.value = focebookProfileView.getAttribute("href");
linkedinProfile.value = linkedinProfileView.getAttribute("href");
tiwitterProfile.value = tiwitterProfileView.getAttribute("href");
pinterestProfile.value = pinterestProfileView.getAttribute("href");
instagramProfile.value = instagramProfileView.getAttribute("href");
youtubeProfile.value = youtubeProfileView.getAttribute("href");

let inputs = sosialMadiaInputBox.getElementsByTagName("input");

for (let i = 0; i < inputs.length; i++) {
  let regex = /\S/;
  if (!regex.test(inputs[i].value)) {
    let inputID = inputs[i].id + "View";

    let elementToRemove = document.getElementById(inputID);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  } else {
  }
}
