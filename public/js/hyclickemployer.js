let filterClick = document.getElementById("filterClick");

let salarymax = document.getElementById("salarymax");
let salarymin = document.getElementById("salarymin");
let qualdegree = document.getElementById("qualdegree");
let careerlevel = document.getElementById("careerlevel");
let staj = document.getElementById("staj");
let datemin = document.getElementById("datemin");
let datemax = document.getElementById("datemax");
let locationMAp = document.getElementById("locationMAp");
let keywordJobs = document.getElementById("keywordJobs");
let pageBox = document.getElementById('pageBox')

let sizeID = document.getElementById('sizeID')

let rTop2 = document.getElementById("rTop2");

let jobBox = document.getElementById("jobBox");

let filterJobsHome = document.getElementById("filterJobsHome");





filterJobsHome.addEventListener("click", () => {
  filterClick.click();
});



let pageNumber = 0
filterClick.addEventListener("click", () => {

console.log(pageNumber)
  let x = {
    location:citySelect.value,
    size:sizeID.value,
    sector:sectorSelect.value,
    keyword: keywordJobs.value ,
    page:pageNumber
  };

    jobFilterFETCH(x);
  
});


let viewJob = (veri) => {
  return new Promise((resolve, reject) => {
    jobBox.innerHTML = "";

    veri.forEach((element) => {
    
      jobBox.innerHTML += `
        <div class="employer-block style-2 cl2">
                    <div class="inner-box">
                      <div class="logo-company">
                        <img src="${element.profileIMG}"
                          alt="bubu alt" />
                      </div>
                      <div class="box-content">
                        <div class="star">
                          <span class="icon-star-full"></span>
                          <span class="icon-star-full"></span>
                          <span class="icon-star-full"></span>
                          <span class="icon-star-full"></span>
                          <span class="icon-star-full"></span>
                        </div>
                        <h3>
                          <a href="/employer/${element.username}">${element.fullname}</a>
                          <span class="icon-bolt"></span>
                        </h3>
                        <p class="info">
                          <span class="icon-map-pin"></span>
                         ${element.city}
                        </p>
                      </div>
                      <div class="button-readmore">
                        <span class="icon-heart"></span>
                        <button class="btn-employer">
                          0 job openings
                        </button>
                      </div>
                      
                    </div>
                    
                  </div>
       `;
    });


 resolve(1)

  
     
  
   
  }).catch((err) => {
    return 0;
  });
};
let pageViewFunc = (pageNumbers)=>{
  pageBox.innerHTML = '<li><a id="pageMinus" ><i class="icon-keyboard_arrow_left"></i></a></li>'
  for(let i = 0;i< pageNumbers;i++){
  pageBox.innerHTML += `<li   ><a onclick="pageClick(event)" >${i+1}</a></li>`
  }
  pageBox.innerHTML += ' <li><a id="pagePluss" ><i class="icon-keyboard_arrow_right"></i></a></li>'
  let pagePluss = document.getElementById('pagePluss')
let pageMinus = document.getElementById('pageMinus')

  pagePluss.addEventListener('click',()=>{
    if(pageNumbers <= pageNumber +1) return;
    pageNumber = pageNumber +1
    filterClick.click()
  
  })
  pageMinus.addEventListener('click',()=>{
    if(pageNumber <= 0) return;
    pageNumber = pageNumber  - 1
    filterClick.click()
    
  })

}

function pageClick(event){
pageNumber = Number(event.target.innerHTML) -1
filterClick.click()
}


let jobFilterFETCH = (veri) => {
  fetch("/proprietor", {
    method: "POST", // HTTP metodu
    headers: {
      "Content-Type": "application/json", // Gönderilen verinin türü JSON olarak ayarlanıyor
    },
    body: JSON.stringify(veri),
  })
    .then((response) => response.json())
    .then((res) => {
     pageViewFunc(res.pageArrayNumber)

      const veriString = encodeURIComponent(JSON.stringify(veri));
      history.pushState(null, "", `/findemployer/?veri=${veriString}`);
      
      viewJob(res.employers).then((result) => {

        
      });
    }).catch(err=>{
      viewJob([]).then(data=>{

      })
    })
};

let doldurma = (veris) => {

  sectorSelect.value = veris.sector;
  citySelect.value = veris.location;
  keywordJobs.value = veris.keyword;
  homelocationINPUT.value = veris.location
  sizeID.value = veris.size

};

const params = new URLSearchParams(window.location.search);
const veriString = params.get("veri");
if (veriString) {
 
  const veri = JSON.parse(decodeURIComponent(veriString));
  doldurma(veri);
  jobFilterFETCH(veri);
} else {
  jobFilterFETCH({

        location:"",
        size:"",
        sector:"",
        keyword:"ewqewqe",
        page:0
    
  });
}



