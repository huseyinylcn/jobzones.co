let jobDetailID =  document.getElementById('jobDetailID')
let basvuruTelID = document.getElementById('basvuruTelID')
let jobDetailModalSystemID = document.getElementById('jobDetailModalSystemID')
let cvSelect = document.getElementById('cvSelect')
let jobCVAddID = document.getElementById('jobCVAddID')
let cvBox = document.getElementById('cvBox')
let cvAddBTNID = document.getElementById('cvAddBTNID')
let fileInputcvadd = document.getElementById('fileInputcvadd')
let basvuruYapButonu = document.getElementById('basvuruYapButonu')
let basvurumesaji = document.getElementById('basvurumesaji')
let jobDetailModalMailID = document.getElementById('jobDetailModalMailID')
let applicationMailInputID = document.getElementById('applicationMailInputID')
let aplicationMailClickID = document.getElementById('aplicationMailClickID')
let applicauntMailFullNameID = document.getElementById('applicauntMailFullNameID')
let applicauntMailMessageID = document.getElementById('applicauntMailMessageID')
let succesfullModalID = document.getElementById('succesfullModalID')
let errorModalID = document.getElementById('errorModalID')


let basvuruFunc = (taking)=>{
    return new Promise((resolve,reject)=>{
  
      if(taking.name == 'url'){
        window.open(taking.value,'_blank')
      }else if(taking.name == 'email'){
        jobDetailModalMailID.className = 'wd-popup-job-apply style2 modal-menu--open'
      }else if(taking.name == 'tel'){
        basvuruTelID.innerHTML = taking.value
        jobDetailID.className = 'wd-popup-job-apply modal-menu--open'
      }else if(taking.name == 'system'){
        if(userDatas != 0){
        jobDetailModalSystemID.className = 'wd-popup-job-apply style2 modal-menu--open'
  
      }else{
        window.location.href = '/login'
      }
  
      }
    })
  }
  let cvs = []
  if(userDatas != 0){
    cvs = JSON.parse(userDatas.cvpath)
  }
  cvSelect.addEventListener('click',()=>{
     jobDetailModalSystemID.className = 'wd-popup-job-apply style2 '
    jobCVAddID.className = 'wd-popup-job-apply modal-menu--open'
    let liHTML = ''
    let liName = 1
   
   
    cvs.forEach(element=>{
      liHTML += `<li onclick="liClickCV(event)" data-value="${element}">My Cv(${liName})</li>`
      liName++
    })
    cvBox.innerHTML = liHTML
  
  })
  
  function liClickCV(event){
    console.log(event.target.dataset.value)
    jobCVAddID.className = 'wd-popup-job-apply'
    jobDetailModalSystemID.className = 'wd-popup-job-apply style2 modal-menu--open'
    cvSelect.dataset.value = event.target.dataset.value
    cvSelect.innerHTML = event.target.innerHTML
  }
  
  
  
  cvAddBTNID.addEventListener('click',()=>{
    fileInputcvadd.click()
  })
  
  
  
  fileInputcvadd.addEventListener('change',(event)=>{
    const file = event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('cv', file);
  
      fetch("/candidates/cv", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => { 
          cvs.push(res.cvname)
          jobCVAddID.className = 'wd-popup-job-apply'
          cvSelect.innerHTML ='MY CV'
          jobDetailModalSystemID.className = 'wd-popup-job-apply style2 modal-menu--open'
          cvSelect.dataset.value = res.cvname
        }).catch(err=>{
          console.log(err)
        })
    }else{
      console.log('dosya seçilmedi')
    }
   
  })
  
  
  
  
  
  
  
  
  
  basvuruYapButonu.addEventListener('click',()=>{
  
  
  
    let pushdata = {
      jobID:jobID,
      cvpath:cvSelect.dataset.value,
      message:basvurumesaji.value
  }
  console.log(pushdata)
  if(pushdata.jobID == '' || pushdata.jobID == undefined || pushdata.message == '' || pushdata.message == undefined || pushdata.cvpath == undefined || pushdata.cvpath == ''  ) return;
  
  $(".preload").show();
  var showPreloader = function () {
    $(".preload").fadeOut("slow", function () {
      setTimeout(function () {}, 1000);
    });
  };
  
  fetch("/job/application",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
      
    },
    body:JSON.stringify(pushdata)
  
  }).then(response => response.json())
  .then(res=>{
    showPreloader();
    if(res.result != 0){
      jobDetailModalSystemID.className = 'wd-popup-job-apply style2'
      succesfullModalID.className = 'wd-popup-job-apply style2 modal-menu--open'
      setTimeout(() => {
         succesfullModalID.className = 'wd-popup-job-apply style2 '
      }, 1500);
    }else{
  jobDetailModalSystemID.className = 'wd-popup-job-apply style2'
  errorModalID.className = 'wd-popup-job-apply style2 modal-menu--open'
  setTimeout(() => {
   errorModalID.className = 'wd-popup-job-apply style2 '
  }, 1500);
    }
  })
  
  
  })
  
  
  
  
  
  
  
  
  let applicationOBJE = {
    cvpath:'',
    jobID:'',
    message:'',
    name:''
  }
  applicationMailInputID.addEventListener('change',(event)=>{
    const file = event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('cv', file);
  
      fetch("/candidates/cvlogout", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => { 
          console.log(res)
       applicationOBJE.cvpath = res.cvpath
    
         
        }).catch(err=>{
          console.log(err)
        })
    }else{
      console.log('dosya seçilmedi')
    }
  })
  
  
  aplicationMailClickID.addEventListener('click',()=>{
    applicationOBJE.jobID = jobID
    applicationOBJE.name = applicauntMailFullNameID.value
    applicationOBJE.message = applicauntMailMessageID.value
  
   
     
  
    $(".preload").show();
    var showPreloader = function () {
      $(".preload").fadeOut("slow", function () {
        setTimeout(function () {}, 1000);
      });
    };
    
    
    fetch("/job/mail",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(applicationOBJE)
    })
    .then(resonse=> resonse.json())
    .then(res=>{
  console.log(res)
  showPreloader();
      if(res.result != 0){
        jobDetailModalMailID.className = 'wd-popup-job-apply style2'
        succesfullModalID.className = 'wd-popup-job-apply style2 modal-menu--open'
        setTimeout(() => {
           succesfullModalID.className = 'wd-popup-job-apply style2 '
        }, 1500);
      }else{
  jobDetailModalMailID.className = 'wd-popup-job-apply style2'
  errorModalID.className = 'wd-popup-job-apply style2 modal-menu--open'
  setTimeout(() => {
     errorModalID.className = 'wd-popup-job-apply style2 '
  }, 1500);
      }
    })
  
  })
  