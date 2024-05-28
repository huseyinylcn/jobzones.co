
let cvUploadBtn  = document.getElementById('cvUploadBtn')


cvUploadBtn.addEventListener('click',()=>{
    let cvInputID = document.getElementById('cvInputID')


    if (cvInputID.files.length == 0){
alert('Dosya Seçmediniz')
    }else{

    const file = cvInputID.files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch("/dashboard/resumes/", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          response.json();
        })
        .then((datas) => {
      location.reload()
        })




    }


})
