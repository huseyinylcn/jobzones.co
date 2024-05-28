

let employerModalBoxOpen3 = document.getElementById('employerModalBoxOpen3')
let employerModalBox = document.getElementById('employerModalBox')
let aboutID = document.getElementById('aboutID')
let aboutView = document.getElementById('aboutView')
let aboutClose = document.getElementById('aboutClose')
let employerModalSave3 = document.getElementById('employerModalSave3')

let employersAllimg = document.getElementById('employersAllimg')

let extraPhotoTop = document.getElementById('extraPhotoTop')
let extraPhotoBottom = document.getElementById('extraPhotoBottom')
let kk = document.getElementById('kk')



let imgAllBox = document.getElementById('imgAllBox')
try {
  var decodedHTML = new DOMParser().parseFromString( aboutView.innerHTML, 'text/html').body.textContent;
aboutView.innerHTML = decodedHTML
} catch (error) {
  
}


employerModalBoxOpen3.addEventListener('click',()=>{
  imgAllBox.innerHTML = ''
  employerModalBox.style.transform = 'translateY(0%)'
  aboutID.value =  ( aboutView.innerHTML).replace(/<br\s*\/?>/g, '\n');


  let extraPhotoTopImg = kk.getElementsByTagName('img')
  
  for(let i = 0; i<extraPhotoTopImg.length;i++){
    imgAllBox.innerHTML += `<img
    style="max-width: 120px; max-height: 120px; width: 120px; margin:5px 5px"
    class="avatar"
    id="employersAllImg"
    src="${extraPhotoTopImg[i].src}"
    alt=""
  />`
  }

  
 
})


aboutClose.addEventListener('click',()=>{
  employerModalBox.style.transform = 'translateY(-100%)'
})

employerModalSave3.addEventListener('click',()=>{
  let newData = aboutID.value.replace(/\n/g, "<br>");
  try {
  
aboutView.innerHTML = newData
  } catch (error) {
    
  }


fetch("/dashboard/employerThree/", {
method: "POST",
headers: {
"Content-type": "application/json",
},
body: JSON.stringify({
about:newData

}),
})
.then((response) => response.json())
.then((datam) => {
  employerModalBox.style.transform = 'translateY(-100%)'
});



//new data gönder

})

employersAllimg.addEventListener('change',(event)=>{

  const files = employersAllimg.files;
  const formData = new FormData();






    
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
}



fetch("/dashboard/profileoverview/employerIMG/", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    response.text();
  })
  .then((datas) => {

  })



  try {
      
  imgAllBox.innerHTML = ''
  extraPhotoBottom.innerHTML = ''
  extraPhotoTop.innerHTML = ''
  kk.innerHTML = ''
  for (let i = 0; i < files.length; i++) {
    

    const reader = new FileReader();
    reader.onload = function(e) {

      extraPhotoBottom.innerHTML += ` <div class="swiper-slide swiper-slide-1">
        <div class="icon-image-wrap">
          <img src="${e.target.result}" alt="">
        </div>
      </div>`

      kk.innerHTML += ` 
          <img src="${e.target.result}" alt="">
      `
      

      extraPhotoTop.innerHTML += ` <div class="swiper-slide swiper-slide-1">
        <div class="images">
           <img src="${e.target.result}" alt="">
        </div>
      </div>`


      imgAllBox.innerHTML += ` <img
      style="max-width: 120px; max-height: 120px; width: 120px; margin:5px 5px"
      class="avatar"
      id="employersAllImg"
      src="${e.target.result}"
      alt=""
    />`

    
    };
    reader.readAsDataURL(files[i]);

}
} catch (error) {
    
}

})





let employerBoxOne = document.getElementById('employerBoxOne')


let employersOpenBtn = document.getElementById('employersOpenBtn')
let employerModelCloseID = document.getElementById('employerModelCloseID')

let employersİnputppIMG = document.getElementById('employersİnputppIMG')
let employersİnputppIMGView = document.getElementById('employersİnputppIMGView')
let employerskpViev = document.getElementById('employerskpViev')
let employerskpInputIMG = document.getElementById('employerskpInputIMG')

let employerppINPUT = document.getElementById('employerppINPUT')
let employerskpInput = document.getElementById('employerskpInput')

let employersTitle = document.getElementById('employersTitle')
let employersP = document.getElementById('employersP')
let employersLocation = document.getElementById('employersLocation')
let employersTalesBox = document.getElementById('employersTalesBox')
let employersWeb = document.getElementById('employersWeb')

let employersTitleInput = document.getElementById('employersTitleInput')
let employersPInput = document.getElementById('employersPInput')
let employersLocationInput = document.getElementById('cadidatesLocationKeyWordID')
let employersTalesBoxInput = document.getElementById('employersTalesBoxInput')
let employersWebInput = document.getElementById('employersWebInput')

let employertalentAddBoxId = document.getElementById('employertalentAddBoxId')
let employerSaveTop = document.getElementById('employerSaveTop')

let employerFacebook = document.getElementById('employerFacebook')
let employerLinkedin = document.getElementById('employerLinkedin')
let employerTwitter = document.getElementById('employerTwitter')
let employerPinterest = document.getElementById('employerPinterest')
let employerInstagram = document.getElementById('employerInstagram')
let employerYoutube = document.getElementById('employerYoutube')

let employerSocial = document.getElementById('employerSocial')


employerppINPUT.addEventListener('change',()=>{

const file = employerppINPUT.files[0];
const formData = new FormData();
formData.append("file", file);
fetch("/dashboard/profileoverview/imgPush/", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    response.text();
  })
  .then((datas) => {

    const reader = new FileReader();
      reader.onload = function(e) {
        employersİnputppIMG.src = e.target.result;
        employersİnputppIMGView.style.backgroundImage = `url(${e.target.result})`
      };
      reader.readAsDataURL(file);

  })
  .catch((error) => {
    console.error("İstek gönderilirken bir hata oluştu:", error);
  });
})

employerskpInput.addEventListener('change',()=>{
const file = employerskpInput.files[0];
const formData = new FormData();
formData.append("file", file);
fetch("/dashboard/profileoverview/imgPushKP/", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    response.text();
  })
  .then((datas) => {

    const reader = new FileReader();
      reader.onload = function(e) {
        employerskpInputIMG.src = e.target.result;
        employerskpViev.style.backgroundImage = `url(${e.target.result})`
      };
      reader.readAsDataURL(file);

  })
  .catch((error) => {
    console.error("İstek gönderilirken bir hata oluştu:", error);
  });
})

employertalentAddBoxId.addEventListener('click',()=>{

let div =document.createElement('div')
div.style.width = '90%'
div.style.margin = 'auto'
div.innerHTML += `
<label for="" style="color: rgb(144, 144, 144);  margin: auto; display: block; ">*Talent <span onclick="employertalentClose(this)" style="cursor: pointer; float: right; margin-right: 10px;"><i  style="font-size: 20px;  " class="fa-solid fa-xmark"></i></span></label>
<input style="color:black;height: 40px;  margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;" placeholder="*example Javascript" type="text">
`
employersTalesBoxInput.appendChild(div)
})

employersOpenBtn.addEventListener('click',()=>{
  employerBoxOne.style.transform = 'translateY(0%)'
try {
  

employersTalesBoxInput.innerHTML  = ''

  employersTitleInput.value = employersTitle.innerHTML
  employersPInput.value = employersP.innerHTML
  employersLocationInput.value = employersLocation.innerHTML
  employersWebInput.value = employersWeb.innerHTML
 
let div = employersTalesBox.getElementsByTagName('div')
for(let i = 0;i<div.length;i++){
employersTalesBoxInput.innerHTML += `<div style="width: 90%; margin: auto;" >
  <label class="modalLabelClass" for=""
    >*Talent
    <span onclick="employertalentClose(this)" class="modalTalentCloseClass"
      ><i class="modalCloseIcon fa-solid fa-xmark"></i></span
  ></label>
  <input
  value="${div[i].innerHTML}"
  style="color:black; height: 40px; max-width: 100%; margin:  auto; text-align: left; display: block; border: 0.5px solid rgb(136, 136, 136) ; border-radius: 10px; margin-bottom: 10px;"
  placeholder="*example Javascript"
    type="text"
  />
</div>`

}

employerskpInputIMG.src=  (window.getComputedStyle(employerskpViev).backgroundImage).substring(5,  (window.getComputedStyle(employerskpViev).backgroundImage).length - 2); 


  employersİnputppIMG.src=  (window.getComputedStyle(employersİnputppIMGView).backgroundImage).substring(5,  (window.getComputedStyle(employersİnputppIMGView).backgroundImage).length - 2); 


} catch (error) {
  
}
  
})

employerModelCloseID.addEventListener('click',()=>{
employerBoxOne.style.transform = 'translateY(-100%)'
})


function employertalentClose(event){
var parentDiv = event.parentElement;
let x = parentDiv.parentElement;
x.remove()
}

employerSaveTop.addEventListener('click',()=>{
  let resolveLocation =  otoSelect()
let array = []
try {
  employersTalesBox.innerHTML = ''

employersTitle.innerHTML =  employersTitleInput.value
employersP.innerHTML = employersPInput.value  
employersLocation.innerHTML = employersLocationInput.value 
employersWeb.innerHTML = employersWebInput.value
} catch (error) {
  
}


let input = employersTalesBoxInput.getElementsByTagName('input')

for(let i =0; i<input.length;i++){
  array.push(input[i].value)
  employersTalesBox.innerHTML +=`
  <div
                    class="button-status"
                    style="
                      padding: 14px;
                      width: auto;
                      font-weight: 400;
                      color: #14a077;
                      font-size: 14px;
                    "
                  >${input[i].value}
                  </div>
  ` 
}
console.log(    array,
  employersTitleInput.value,
  employersPInput.value,
 employersLocationInput.value,
 employersWebInput.value)

fetch("/dashboard/employerOne/", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({
    talent: array,
    fullname: employersTitleInput.value,
    sorthAbout: employersPInput.value,
    location : employersLocationInput.value,
    webURL: employersWebInput.value
  }),
})
  .then((response) => response.json())
  .then((datam) => {
    employerModelCloseID.click()
    console.log(datam)
  }).catch(err=>{
    console.log(err)
  })

""
})

let modalBoxInfo = document.getElementById('modalBoxInfo')
let employersOpenBtn2 = document.getElementById('employersOpenBtn2')
let employerModalBoxClose2 = document.getElementById('employerModalBoxClose2')
let industry = document.getElementById('industry')
let industryInput = document.getElementById('industryInput')

let companysize = document.getElementById('companysize')
let companysizeInput = document.getElementById('companysizeInput')

let founded =  document.getElementById('founded')
let foundedInput = document.getElementById('foundedInput')

let saveEmployerModal2 = document.getElementById('saveEmployerModal2')
let sosialMadiaInputBox = document.getElementById('sosialMadiaInputBox')


let emp1 = document.getElementById('emp1')
let emp2 = document.getElementById('emp2')
let emp3 = document.getElementById('emp3')
let emp4 = document.getElementById('emp4')
let emp5 = document.getElementById('emp5')
let emp6 = document.getElementById('emp6')



let socialControl = ()=>{





try {
  


if(!(emp1.dataset.value) || (emp1.dataset.value).trim() === ''  || (emp1.dataset.value) == undefined){
  emp1.remove()
}
if(!(emp2.dataset.value) || (emp2.dataset.value).trim() === ''  || (emp2.dataset.value) == undefined){
  emp2.remove()
}
if(!(emp3.dataset.value) || (emp3.dataset.value).trim() === ''  || (emp3.dataset.value) == undefined){
  emp3.remove()
}
if(!(emp4.dataset.value) || (emp4.dataset.value).trim() === '' || (emp4.dataset.value) == undefined){
  emp4.remove()
}
if(!(emp5.dataset.value) || (emp5.dataset.value).trim() === ''  || (emp5.dataset.value) == undefined){
  emp5.remove()
}
if(!(emp6.dataset.value) || (emp6.dataset.value).trim() === ''  || (emp6.dataset.value) == undefined){
  emp6.remove()
}

} catch (error) {
  console.log()
}
}
socialControl()



employersOpenBtn2.addEventListener('click',()=>{

modalBoxInfo.style.transform = 'translateY(0%)'
industryInput.value = industry.innerHTML
companysizeInput.value = companysize.innerHTML
foundedInput.value = founded.innerHTML

let a = employerSocial.getElementsByTagName('a')

for(let i = 0;i<a.length;i++){
if(a[i].className == 'icon-facebook'){
  employerFacebook.value = a[i].href
}else if(a[i].className == 'icon-linkedin2'){
  employerLinkedin.value = a[i].href
}else if(a[i].className == 'icon-twitter'){
  employerTwitter.value = a[i].href
}else if(a[i].className == 'icon-pinterest'){
  employerPinterest.value = a[i].href
}else if(a[i].className == 'icon-instagram1'){
  employerInstagram.value = a[i].href
}else if(a[i].className == 'icon-youtube'){
  employerYoutube.value = a[i].href
}

}


})

employerModalBoxClose2.addEventListener('click',()=>{
modalBoxInfo.style.transform = 'translateY(-100%)'
})


saveEmployerModal2.addEventListener('click',()=>{

fetch("/dashboard/employerTwo/", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({
    industry: industryInput.value,
    companysize: companysizeInput.value,
    founded: foundedInput.value,
    facebook:employerFacebook.value,
    linkedin:employerLinkedin.value,
    tiwiter:employerTwitter.value,
    pinterest:employerPinterest.value,
    instagram:employerInstagram.value,
    youtube:employerYoutube.value,

  }),
})
  .then((response) => response.json())
  .then((datam) => {

  });

employerSocial.innerHTML = ''

modalBoxInfo.style.transform = 'translateY(-100%)'
industry.innerHTML = industryInput.value
companysize.innerHTML =  companysizeInput.value
founded.innerHTML = foundedInput.value

let input = sosialMadiaInputBox.getElementsByTagName('input')


for(let i = 0;i< input.length;i++){



if(input[i].id == 'employerFacebook'){
  if(/\S/.test(input[i].value)){
  employerSocial.innerHTML +=  `<a  href="${input[i].value}" class="icon-facebook"></a>`
}
}

 if(input[i].id === 'employerLinkedin'){
   if(/\S/.test(input[i].value)){
   
  employerSocial.innerHTML +=  `<a   href="${input[i].value}" class="icon-linkedin2"></a>`
}
}

if(input[i].id == 'employerTwitter'){
if(/\S/.test(input[i].value)){
  employerSocial.innerHTML +=  `<a  href="${input[i].value}" class="icon-twitter"></a>`
}
}

if(input[i].id == 'employerPinterest'){
if(/\S/.test(input[i].value)){
  employerSocial.innerHTML +=  `<a  href="${input[i].value}" class="icon-pinterest"></a>`
}
}



if(input[i].id == 'employerInstagram'){
  if(/\S/.test(input[i].value)){
  employerSocial.innerHTML +=  `<a  href="${input[i].value}" class="icon-instagram1"></a>`
}

}
if(input[i].id == 'employerYoutube'){
  if(/\S/.test(input[i].value)){
  employerSocial.innerHTML +=  `<a  href="${input[i].value}" class="icon-youtube"></a>`
}
}

}






})








