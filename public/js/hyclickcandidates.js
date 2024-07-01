let filterClick = document.getElementById("filterClick");

let agemin = document.getElementById("agemin");
let agemax = document.getElementById("agemax");
let genderCandidatesID = document.getElementById("genderCandidatesID");
let exprencetime = document.getElementById("exprencetime");

let qualdegree = document.getElementById("qualdegree");
let careerlevel = document.getElementById("careerlevel");
let staj = document.getElementById("staj");
let datemin = document.getElementById("datemin");
let datemax = document.getElementById("datemax");
let locationMAp = document.getElementById("locationMAp");
let keywordJobs = document.getElementById("keywordJobs");
let pageBox = document.getElementById('pageBox')

let rTop2 = document.getElementById("rTop2");

let jobBox = document.getElementById("jobBox");

let filterJobsHome = document.getElementById("filterJobsHome");

filterJobsHome.addEventListener("click", () => {
  filterClick.click();
});
let pageNumber = 0
filterClick.addEventListener("click", () => {
  let qualdegreeArray = [];

  let qualdegreeoption = qualdegree.getElementsByTagName("option");

  if (qualdegree.value == "") {
    qualdegreeArray = [];
  } else if (qualdegree.value == "highschool") {
    for (let i = 1; i <= 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "vocationalschool") {
    for (let i = 1; i <= 2; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "certified") {
    for (let i = 1; i <= 3; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "bachelordegree") {
    for (let i = 1; i <= 4; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "mastersdegree") {
    for (let i = 1; i <= 5; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "associatedegree") {
    for (let i = 1; i <= 6; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "doctoralDegree") {
    for (let i = 1; i <= 7; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  }

  let workmode = [];
  let input = modeofopereationUL.getElementsByTagName("input");
  for (let i = 0; i < input.length; i++) {
    if (input[i].checked) {
      workmode.push(input[i].value);
    }
  }

  let x = {
    department: categorySelect.value,
    location: citySelect.value,
    mode: workmode,
    agemin: agemin.value,
    agemax: agemax.value,
    qualification: qualdegreeArray,
    date: datemin.value,
    date2: datemax.value,
    keyword: keywordJobs.value,
    gender: genderCandidatesID.value,
    experiencetime: exprencetime.value,
    page: pageNumber,
  };

  jobFilterFETCH(x);
});

let viewJob = (veri) => {

  return new Promise((resolve, reject) => {
    jobBox.innerHTML = "";

    veri.forEach((element) => {
      let workmodeStringHTML = "";

      let parray = JSON.parse(element.workmode);

      parray.forEach((ele) => {
        workmodeStringHTML += `<li><a href="#">${ele}</a></li>`;
      });

      jobBox.innerHTML += `
      
                                <div class="features-job wd-thum-career cl2">
                                    <div class="job-archive-header">
                                      <div class="career-header-left">
                                        <img src="  ${element.profileIMG}" alt="/img/user/avatar/avt-thumb-01.jpg" class="thumb">
                                        <div class="career-left-inner">
                                          <h4>
                                            <a href="/candidates/${element.username}">${element.job}</a>
                                          </h4>
                                          <h3>
                                            <a href="/candidates/${element.username}">${element.fullname}</a>
                                            <span class="icon-bolt"></span>
                                          </h3>
                                          <ul class="career-info">
                                         
                                            <li>
                                              <span class="icon-map-pin"></span>
                                              ${element.city}
                                            </li>
                                          </ul>
                        
                                        </div>
                                      </div>
                                      <div class="career-header-right">
                                        <span class="icon-heart"></span>
                                         <a href="/candidates/${element.username}" class="tf-btn">View Profile</a>

                                      </div>
                                    </div>
                                    <div class="job-archive-footer">
                                      <div class="career-footer-left">
                                        <ul class="career-tag">
                                        ${workmodeStringHTML}
                                        </ul>
                                      </div>
                                      <div class="carrer-footer-right">
                        
                                       <!-- maaş  -->
                                      </div>
                                    </div>
                                </div>

      `;
    });

    resolve(1);
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
  
  fetch("/applicants", {
    method: "POST", // HTTP metodu
    headers: {
      "Content-Type": "application/json", // Gönderilen verinin türü JSON olarak ayarlanıyor
    },
    body: JSON.stringify(veri),
  })
    .then((response) => response.json())
    .then((res) => {
      const veriString = encodeURIComponent(JSON.stringify(veri));
      history.pushState(null, "", `/findcandidates/?veri=${veriString}`);
pageViewFunc(res.pagenumberArray)
      viewJob(res.candidates).then((result) => {});

    }).catch(err=>{
      const veriString = encodeURIComponent(JSON.stringify(veri));
      history.pushState(null, "", `/findcandidates/?veri=${veriString}`);
      viewJob([]).then((result) => {});

    })
};

let doldurma = (veris) => {
  keywordJobs.value = veris.keyword
  citySelect.value = veris.location
  homelocationINPUT.value = veris.location
  let input = modeofopereationUL.getElementsByTagName("input");
  categorySelect.value = veris.department;
  genderCandidatesID.value = veris.gender
  veris.mode.forEach((element) => {
    for (let i = 0; i < input.length; i++) {
      if (element == input[i].value) input[i].checked = true;
    }
  });
  modeofopereation.click();
  veris.qualification = veris.qualification.reverse()
  qualdegree.value = veris.qualification[0]

  agemin.value =  veris.agemin 
  agemax.value = veris.agemax 
   exprencetime.value = veris.experiencetime
  datemax.value = veris.date2;
  datemin.value = veris.date;


};

const params = new URLSearchParams(window.location.search);
const veriString = params.get("veri");
if (veriString) {
  // URL'den alınan stringi çöz ve JSON formatına dönüştür
  const veri = JSON.parse(decodeURIComponent(veriString));
  jobFilterFETCH(veri);
  doldurma(veri);
} else {
  jobFilterFETCH({
    agemax: "",
    agemin: "",
    date: "",
    date2: "",
    department: "",
    experiencetime: "",
    gender: "2",
    keyword: "",
    location: "",
    mode: [],
    page: 0,
    qualification: [],
  });
}
