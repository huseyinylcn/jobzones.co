let aboutMeEdit = document.getElementById("aboutMeEdit");
let modalBoxTop = document.getElementById("modalBoxTops");
let aboutClose = document.getElementById("aboutClose");
let educationPush = document.getElementById("educationPush");
let educationBox = document.getElementById('educationBox')
let modalBoxInfoBtn = document.getElementById('modalBoxInfoBtn')
let modalBoxInfo = document.getElementById('modalBoxInfo')
let modalBoxInfoClose = document.getElementById('modalBoxInfoClose')
let dilAddBoxId = document.getElementById('dilAddBoxId')
let languageBox = document.getElementById('languageBox')
let modalEditOpenBtn = document.getElementById('modalEditOpenBtn')
let modalBoxprofileClose = document.getElementById('modalBoxprofileClose')
let modalBoxprofile = document.getElementById('modalBoxprofile')
let talentAddBoxId = document.getElementById('talentAddBoxId')
let talentBox = document.getElementById('talentBox')



aboutMeEdit.addEventListener("click", () => {
  console.log('basıldı')
  modalBoxTop.style.transform = " translateY(0%)";

});

aboutClose.addEventListener("click", () => {
  modalBoxTop.style.transform = " translateY(-100%)";
  modalBoxInfo.style.transform = " translateY(-100%)";
  console.log("sdsdas")

});
modalBoxInfoClose.addEventListener("click", () => {

    modalBoxInfo.style.transform = " translateY(-100%)";

  
  });

let className = 0
educationPush.addEventListener("click", () => {


var yeniDiv = document.createElement("div");
yeniDiv.style.position = "relative";
yeniDiv.style.width = "90%";
yeniDiv.style.border = "0.5px solid rgb(196, 196, 196)";
yeniDiv.style.borderRadius = "10px";
yeniDiv.style.margin = "auto";
yeniDiv.style.marginTop= "15px";

var icerik = `
<i onclick="deleteDiv(this)" style="font-size: 24px; position: absolute; right: 15px ; top: 9px; cursor: pointer; " class="fa-solid fa-xmark"></i>
<br>
<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Okul</label>
<input name="school" style="color:black; height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="text">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Bölüm</label>
<input name="section" style="color:black; height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="text">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Derece</label>
<input name="degree"  style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="text">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Başlangıç</label>
<input name="start" style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="number">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Bitiş</label>
<input name="stop" style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*Örn: İT ünersitesi" type="number">

<label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Explanation</label>
<textarea name="schoolAccount"  class="schoolAccount"  ></textarea>

<br>
`;

yeniDiv.innerHTML = icerik;

// educationBox'a yeni div'i ekle
educationBox.appendChild(yeniDiv)

});


function deleteDiv(button){
    var parentDiv = button.parentElement;
    parentDiv.remove();
}
function languageClose(button){
    var parentDiv = button.parentElement;
    let x = parentDiv.parentElement;
    x.remove()
}



modalBoxInfoBtn.addEventListener('click',()=>{
    modalBoxInfo.style.transform = " translateY(0%)";
})

dilAddBoxId.addEventListener('click',()=>{
  let div = document.createElement('div')

  div.innerHTML =  ` 
  <label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Language <span onclick="languageClose(this)" style="cursor: pointer; float: right; margin-right: 10px;"><i  style="font-size: 20px;  " class="fa-solid fa-xmark"></i></span></label>
  <input id="languageProfil" style="color:black; height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*language" type="tel">
`
    languageBox.appendChild(div)
})


modalEditOpenBtn.addEventListener('click',()=>{
  modalBoxprofile.style.transform = "translateY(0%)"

})

modalBoxprofileClose.addEventListener('click',()=>{
  modalBoxprofile.style.transform = "translateY(-100%)"

})
talentAddBoxId.addEventListener('click',()=>{

  let div =document.createElement('div')
  div.innerHTML += `
  <label for="" style="color: rgb(144, 144, 144); max-width: 90%; margin: auto; display: block; ">*Talent <span onclick="talentClose(this)" style="cursor: pointer; float: right; margin-right: 10px;"><i  style="font-size: 20px;  " class="fa-solid fa-xmark"></i></span></label>
  <input style="color:black;height: 40px; max-width: 90%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*example Javascript" type="text">
`
talentBox.appendChild(div)
})

function talentClose(button){
  var parentDiv = button.parentElement;
  let x = parentDiv.parentElement;
  x.remove()
}