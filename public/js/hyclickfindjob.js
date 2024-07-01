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

let rTop2 = document.getElementById("rTop2");

let jobBox = document.getElementById("jobBox");

let filterJobsHome = document.getElementById("filterJobsHome");

filterJobsHome.addEventListener("click", () => {
  filterClick.click();
});

function konumAl() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          resolve(latitude + "," + longitude);
        },
        function (error) {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
          resolve("0,0");
        },
        {timeout: 10000} // 10 seconds timeout
      );
    } else {
      resolve("0,0");
    }
  });
}

let pageNumber = 0
filterClick.addEventListener("click", () => {
  let careerlevelArray = [];

  let option = careerlevel.getElementsByTagName("option");
  if (careerlevel.value == "") {
    careerlevelArray = [];
  } else if (careerlevel.value == "entrylevel") {
    for (let i = 1; i <= option.length - 1; i++) {
      careerlevelArray.push(option[i].value);
    }
  } else if (careerlevel.value == "specialist") {
    for (let i = 2; i <= option.length - 1; i++) {
      careerlevelArray.push(option[i].value);
    }
  } else if (careerlevel.value == "management") {
    for (let i = 3; i <= option.length - 1; i++) {
      careerlevelArray.push(option[i].value);
    }
  } else if (careerlevel.value == "director") {
    for (let i = 4; i <= option.length - 1; i++) {
      careerlevelArray.push(option[i].value);
    }
  } else if (careerlevel.value == "execution") {
    for (let i = 5; i <= option.length - 1; i++) {
      careerlevelArray.push(option[i].value);
    }
  }

  let qualdegreeArray = [];

  let qualdegreeoption = qualdegree.getElementsByTagName("option");

  if (qualdegree.value == "") {
    qualdegreeArray = [];
  } else if (qualdegree.value == "highschool") {
    for (let i = 1; i <= qualdegreeoption.length - 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "vocationalschool") {
    for (let i = 2; i <= qualdegreeoption.length - 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "certified") {
    for (let i = 3; i <= qualdegreeoption.length - 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "bachelordegree") {
    for (let i = 4; i <= qualdegreeoption.length - 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "mastersdegree") {
    for (let i = 5; i <= qualdegreeoption.length - 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "associatedegree") {
    for (let i = 6; i <= qualdegreeoption.length - 1; i++) {
      qualdegreeArray.push(qualdegreeoption[i].value);
    }
  } else if (qualdegree.value == "doctoralDegree") {
    for (let i = 7; i <= qualdegreeoption.length - 1; i++) {
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
    category: categorySelect.value,
    city: citySelect.value,
    workmode: workmode,
    salary: [{ max: salarymax.value, min: salarymin.value, mode: "aylik" }],
    qualdegree: [],
    careerlevel: [],
    staj: staj.value,
    date: datemin.value,
    date2: datemax.value,
    coordinate: "",
    r: Number(radiusKM.innerHTML),
    keyword: keywordJobs.value,
    page: pageNumber,
  };

  if (locationMAp.value == 1) {
    konumAl().then((loc) => {
      x.coordinate = loc;
      x.careerlevel = careerlevelArray;
      x.qualdegree = qualdegreeArray;

      jobFilterFETCH(x);
    });
  } else {
    x.coordinate = "0,0";
    x.careerlevel = careerlevelArray;
    x.qualdegree = qualdegreeArray;

    jobFilterFETCH(x);
  }
});


let viewJob = (veri) => {
    console.log(veri)
  return new Promise((resolve, reject) => {
    jobBox.innerHTML = "";

    veri.forEach((element) => {
       
      const today = new Date();
      const specifiedDate = new Date(element.date);
      const differenceInDays = Math.abs(
        (today - specifiedDate) / (1000 * 60 * 60 * 24)
      );

      const specifiedDate2 = new Date(element.finish);
      const differenceInDays2 = Math.abs(
        (specifiedDate2 - today) / (1000 * 60 * 60 * 24)
      );

      let workmodeStringHTML = "";

      let parray = JSON.parse(element.workmode);
      let salary = JSON.parse(element.salary);

      parray.forEach((ele) => {
        workmodeStringHTML += `<li style="text-transform: capitalize;"><a href="#">${ele}</a> </li>`;
      });


     let push =  JSON.stringify(element)
      jobBox.innerHTML += `

        <div onclick='jobBoxClick(event, ${push})' class="features-job cl2">
                  <div class="job-archive-header">
                    <div class="inner-box">
                      <div class="logo-company">
                        <img src="${element.profileIMG}" alt="${
        element.profileIMG
      }"  >
                      </div>
                      <div class="box-content">
                        <h4><span class="icon-map-pin"></span>
                          <a>${element.city}</a>
                        </h4>
                        <h3>
                          <a >${element.title}</a>
                          <span class="icon-bolt"></span>
                        </h3>
                        <ul>
                          <li>
                            
                             ${element.personalnumber} people will be taken
                          </li>
                          <li>
                            <span class="icon-calendar"></span>
                            ${Math.floor(differenceInDays)} days ago
                          </li>
                        </ul>
                        <span class="icon-heart"></span>
                      </div>
                    </div>
                  </div>
                  <div class="job-archive-footer">
                    <div class="job-footer-left">
                      <ul class="job-tag">
                       ${workmodeStringHTML}
                      </ul>
                      <div class="star">
                        <span class="icon-star-full"></span>
                        <span class="icon-star-full"></span>
                        <span class="icon-star-full"></span>
                        <span class="icon-star-full"></span>
                        <span class="icon-star-full"></span>
                      </div>
                    </div>
                    <div class="job-footer-right">
                      <div class="price">
                        <span class="icon-dolar1"></span>
                        <p>$${salary[0].min} - $${
        salary[0].max
      } <span class="year"></span></p>
                      </div>
                      <p class="days">${Math.floor(
                        differenceInDays2
                      )}  days left to apply</p>
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
  fetch("/job", {
    method: "POST", // HTTP metodu
    headers: {
      "Content-Type": "application/json", // Gönderilen verinin türü JSON olarak ayarlanıyor
    },
    body: JSON.stringify(veri),
  })
    .then((response) => response.json())
    .then((res) => {
      const veriString = encodeURIComponent(JSON.stringify(veri));
      history.pushState(null, "", `/findjob/?veri=${veriString}`);
      pageViewFunc(res.pageNumberArray)
      viewJob(res.jobs).then((result) => {
        
      });
    });
};

let doldurma = (veris) => {
  let input = modeofopereationUL.getElementsByTagName("input");
  categorySelect.value = veris.category;
  citySelect.value = veris.city;
  homelocationINPUT.value = veris.city;

  veris.workmode.forEach((element) => {
    for (let i = 0; i < input.length; i++) {
      if (element == input[i].value) input[i].checked = true;
    }
  });
  modeofopereation.click();
  salarymin.value = veris.salary[0].min;
  salarymax.value = veris.salary[0].max;
  qualdegree.value = veris.qualdegree[0];
  careerlevel.value = veris.careerlevel[0];
  staj.value = veris.staj;
  datemax.value = veris.date2;
  datemin.value = veris.date;
  if (veris.coordinate != "0,0") locationMAp.value = 1;
  else locationMAp.value = 0;
  keywordJobs.value = veris.keyword;
  radiusKM.innerHTML = veris.r;
  rTop.style.left = `${veris.r}px`;
};

const params = new URLSearchParams(window.location.search);
const veriString = params.get("veri");
if (veriString) {
  // URL'den alınan stringi çöz ve JSON formatına dönüştür
  const veri = JSON.parse(decodeURIComponent(veriString));
  doldurma(veri);
  jobFilterFETCH(veri);
} else {
  jobFilterFETCH({
    category: "",
    city: "",
    workmode: [],
    salary: [{ max: "", min: "", mode: "aylik" }],
    qualdegree: [],
    careerlevel: [],
    staj: 0,
    date: "",
    date2: "",
    coordinate: "0,0",
    r: 250,
    keyword: "",
    page: 0,
  });
}



function jobBoxClick(event, element){


  window.location.href = `/job/${element.jobID}`
}