let aboutEducationBtn = document.getElementById("aboutEducationBtn");
let aboutID = document.getElementById("aboutID");
let aboutViewID = document.getElementById("aboutViewID");
let aboutMeEditOpenModal = document.getElementById("aboutMeEdit");
let educationBoxList = document.getElementById("educationBox");
let educationViewBox = document.getElementById("educationViewBox");
let modalBoxTops = document.getElementById("modalBoxTops");


var decodedHTML = new DOMParser().parseFromString( aboutViewID.innerHTML, 'text/html').body.textContent;
aboutViewID.innerHTML = decodedHTML

let pushModalEducation = (element) => {
  element.forEach((data) => {
    let parts = data.startstop.split("-");

    // Her bir parçayı numaraya dönüştürür
    let firstYear = parseInt(parts[0].trim(), 10);
    let secondYear = parseInt(parts[1].trim(), 10);
    var yeniDiv = document.createElement("div");
    yeniDiv.style.position = "relative";
    yeniDiv.style.width = "90%";
    yeniDiv.style.border = "0.5px solid rgb(196, 196, 196)";
    yeniDiv.style.borderRadius = "10px";
    yeniDiv.style.margin = "auto";
    yeniDiv.style.marginTop = "15px";

    var icerik = `
<i onclick="deleteDiv(this)" style="font-size: 24px; position: absolute; right: 15px ; top: 9px; cursor: pointer; " class="fa-solid fa-xmark"></i>
<br>
<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Okul</label>
<input value="${data.school}" name="school" style="color:black; height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="text">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Bölüm</label>
<input  value="${data.section}" name="section" style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="text">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Derece</label>
<input  value="${data.degree}" name="degree"  style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="text">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Başlangıç</label>
<input  value="${firstYear}" name="start" style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="number">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Bitiş</label>
<input  value="${secondYear}" name="stop" style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="number">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Explanation</label>
<textarea name="schoolAccount"  class="schoolAccount"  > ${data.account}</textarea>

<br>
`;

    yeniDiv.innerHTML = icerik;

    educationBox.appendChild(yeniDiv);
  });
};

let educationViewArray = [];
aboutMeEditOpenModal.addEventListener("click", () => {
  educationBox.innerHTML = "";

 let yeniMetin = ( aboutViewID.innerHTML).replace(/<br\s*\/?>/g, '\n');

  educationViewArray = [];

  aboutID.value = yeniMetin;

  let educationViewBoxlist = educationViewBox.getElementsByTagName("div");

  for (let i = 0; i < educationViewBoxlist.length; i++) {
    let h4 = educationViewBoxlist[i].getElementsByTagName("h4");
    let p = educationViewBoxlist[i].getElementsByTagName("p");
    let h5 = educationViewBoxlist[i].getElementsByTagName("h5");
    let span = educationViewBoxlist[i].getElementsByTagName("span");
    let b = educationViewBoxlist[i].getElementsByTagName("b");

    educationViewArray.push({
      school: h5[0].innerHTML,
      section: h4[0].innerHTML,
      startstop: span[0].innerHTML,
      account: p[0].innerHTML,
      degree: b[0].innerHTML,
    });
  }

  pushModalEducation(educationViewArray);
});

let pushBackendFunc = (element, array) => {


  fetch("/dashboard/profiloverview/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      about: element,
      education: array,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data == 1){
        modalBoxTops.style.transform = " translateY(-100%)"
      }
    });
};

let educationBoxListDiv = educationBoxList.getElementsByTagName("div");

aboutEducationBtn.addEventListener("click", () => {

  let array = [];
  educationViewBox.innerHTML = "";
  
  let newData = aboutID.value.replace(/\n/g, "<br>");
  aboutViewID.innerHTML = newData;
  // obout = newdata

  for (let i = 0; i < educationBoxListDiv.length; i++) {
    let inputs = educationBoxListDiv[i].getElementsByTagName("input");
    let textarea = educationBoxListDiv[i].getElementsByTagName("textarea");
if((inputs[0].value) != ''){
if( (Number(inputs[3].value)) <= (Number(inputs[4].value)) ){

    educationViewBox.innerHTML += `  <div class="education-box">
<h5 style="display: inline-block; font-size: 18px;" class="subtitle-1 fw-7">${inputs[0].value}</h5>
<span class="subtitle-2 fs-12 fw-5">${inputs[3].value} - ${inputs[4].value}</span>
<h4 class="job fw-7">${inputs[1].value}</h4>
<b style="font-weight: 300;">${inputs[2].value}</b>
<p class="acoount">${textarea[0].value}</p><hr>
</div>`;

    array.push({
      school: inputs[0].value,
      section: inputs[1].value,
      degree: inputs[2].value,
      start: inputs[3].value,
      stop: inputs[4].value,
      account: textarea[0].value,
    });
}else{
    alert('Başlangıç bitişten büyük olamaz')
}
}else{
    alert('Okul adı boş bırakılamaz')

}
  }
  pushBackendFunc(newData, array);
});
