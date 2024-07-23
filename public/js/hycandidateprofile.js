
let imgClickCLASS = document.getElementsByClassName("imgClickCLASS")[0];
let candidatesEditBTN = document.getElementsByClassName('candidatesEditBTN')
let candidatesDetailIMDUpdateID = document.getElementById(
  "candidatesDetailIMDUpdateID"
);
let edit1BTNID = document.getElementById('edit1BTNID')
let candidatesIMGInputID = document.getElementById("candidatesIMGInputID");
let modal1 = document.getElementById("modal1");
let modal1BTN = document.getElementById('modal1BTN')
let modal1Fullname = document.getElementById('modal1Fullname')
let modal1Job = document.getElementById('modal1Job')
let modal1SalaryMin = document.getElementById('modal1SalaryMin')
let modal1SalaryMax = document.getElementById('modal1SalaryMax')
let modal1SalaryOrt = document.getElementById('modal1SalaryOrt')
let modal1Time = document.getElementById('modal1Time')




let design = (userID) => {
  return new Promise((resolve, reject) => {
    if (userDatas.userID == userID) {
      console.log("eşit");
    } else {
      for(let i = 0; i<candidatesEditBTN.length; i++){
        candidatesEditBTN[i].remove()
      }
      imgClickCLASS.remove();
    }
  });
};

candidatesDetailIMDUpdateID.addEventListener("click", () => {
  candidatesIMGInputID.click();
});

candidatesIMGInputID.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    let formData = new FormData();
    formData.append("profile", file);
    fetch("/candidates/img", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((rs) => {
        console.log(rs);
      });
  }
});
edit1BTNID.addEventListener('click',()=>{
  modal1Fullname.value  =  userInfo.fullname 
  modal1Job.value = userInfo.job
  citySelect.value = userInfo.city
  let salary = JSON.parse(userInfo.salary)
  modal1SalaryMax.value = salary[0].max
  modal1SalaryMin.value = salary[0].min
  modal1SalaryOrt.value = salary[0].salary
  modal1Time.value = salary[0].time


  modal1.className = 'wd-popup-job-apply style2  modal-menu--open'
})

modal1BTN.addEventListener('click',()=>{

   let salary =JSON.parse(userInfo.salary)
  salary[0].max = modal1SalaryMax.value
  salary[0].min = modal1SalaryMin.value 
  salary[0].salary =  modal1SalaryOrt.value
  salary[0].time =  modal1Time.value 



let FetchData = {
  "fullname":modal1Fullname.value,
  "gender":userInfo.gender,
  "birth":userInfo.birth,
  "category":userInfo.category,
  "phone":userInfo.phone,
  "adres":userInfo.adres,
  "city":citySelect.value ,
  "coordinate":userInfo.coordinate,
  "videoURL":userInfo.videoURL,
  "social":JSON.parse(userInfo.social),
  "education":  JSON.parse(userInfo.education),
  "qualdegree":userInfo.qualdegree,
  "careerlevel":userInfo.careerlevel,
  "experience": JSON.parse(userInfo.experience),
  "language":JSON.parse(userInfo.language),
  "reference":JSON.parse(userInfo.reference),
  "hobby":  JSON.parse(userInfo.hobby),
  "workmode":JSON.parse(userInfo.workmode),
  "salary":salary,
  "dayandtimework":JSON.parse(userInfo.dayandtimework),
  "views":userInfo.views,
  "job":modal1Job.value,
  "department":userInfo.department

}










  

  console.log(FetchData)
  modalFetchFunction(FetchData).then(res=>{
    if(res == 1){
      return
    }
  })

  
})




let modalFetchFunction = (data)=>{
  return new Promise((resolve,reject)=>{
    fetch("/candidates",{
      method:'POST',
      headers:{ "Content-Type": "application/json"},
      body:JSON.stringify(data)
    }).then(response=>response.json()).then(res=>{
      console.log(res)
      resolve(1)
    })
  })
}