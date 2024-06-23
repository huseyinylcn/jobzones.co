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
    page: 0,
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
let jobrightView = document.getElementById("jobRightView");

let firstJobView = (veri) => {
  return new Promise((resolve, reject) => {
    

    const today = new Date();
    const specifiedDate0 = new Date(veri.date);
    const differenceInDays0 = Math.abs(
      (today - specifiedDate0) / (1000 * 60 * 60 * 24)
    );

    const specifiedDate1 = new Date(veri.finish);
    const differenceInDays1 = Math.abs(
      (specifiedDate1 - today) / (1000 * 60 * 60 * 24)
    );

    let parray = JSON.parse(veri.workmode);

    let workmodeHTML = "";
    parray.forEach((ele) => {
      workmodeHTML += `<li style="text-transform: capitalize;"><a href="#">${ele}</a> </li>`;
    });

    let salary = JSON.parse(veri.salary);

    let social = JSON.parse(veri.social);
    let socialHTML = "";

    const socialMediaPlatforms = {
      facebook: "facebook.com",
      twitter: "twitter.com",
      instagram: "instagram.com",
      linkedin: "linkedin.com",
      youtube: "youtube.com",
      pinterest: "pinterest.com",
    };

    // Fonksiyon: URL'yi analiz ederek sosyal medya platformunu belirler
    function detectSocialMediaPlatform(url) {
      for (const platform in socialMediaPlatforms) {
        if (url.includes(socialMediaPlatforms[platform])) {
          return platform;
        }
      }
      return "unknown"; // Bilinmeyen platform
    }

    socialHTML = "";
    // URL'leri analiz ederek hangi platforma ait olduklarını belirleyin
    social.forEach((url) => {
      const platform = detectSocialMediaPlatform(url);
      if (platform == "facebook") {
        socialHTML += `
         <li><a href="#"><i class="icon-facebook"></i></a></li>`;
      } else if (platform == "twitter") {
        socialHTML += `<li><a href="#"><i class="icon-twitter"></i></a></li>`;
      } else if (platform == "instagram") {
        socialHTML += `<li><a href="#"><i class="icon-instagram1"></i></a></li>`;
      } else if (platform == "linkedin") {
        socialHTML += `<li><a href="#"><i class="icon-linkedin2"></i></a></li>`;
      } else if (platform == "youtube") {
        socialHTML += `<li><a href="#"><i class="icon-youtube"></i></a></li>`;
      } else if (platform == "pinterest") {
        socialHTML += `<li><a href="#"><i class="icon-pinterest"></i></a></li>`;
      }

  
    });


    let photosHTML = ''

    let photos = JSON.parse(veri.photos)

    for(let i = 0;i<photos.length;i++){
      photosHTML += `<li class="ct-tab2"> <a class="lightbox-gallery" href="${photos[i]}"><img
                        src="${photos[i]}" alt="/img"></a> </li>`
    }

    jobrightView.innerHTML = `

          <article class="job-article">
            <div class="top-content">
              <div class="features-job style-2 stc-apply">
                <div class="job-archive-header">
                  <div class="inner-box">
                    <div class="logo-company">
                      <img src="${
                        veri.profileIMG
                      }" alt="/img/logo-company/cty11.png" />
                    </div>
                    <div class="box-content">
                      <h4>
                        <a >${veri.city}</a>
                      </h4>
                      <h3>
                        <a >${veri.title}</a>
                        <span class="icon-bolt"></span>
                      </h3>
                      <ul>
                        <li>
               
                                 ${veri.personalnumber} people will be taken
                        </li>
                        <li>
                          <span class="icon-calendar"></span>
                          ${Math.floor(differenceInDays0)} days ago
                        </li>
                      </ul>
                      <div class="button-readmore st1">
                        <span class="icon-heart"></span>
                        <a href="/job/${veri.jobID}" class="btn-apply btn-popup">
                          <span class="icon-send"></span>
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="job-archive-footer">
                  <div class="job-footer-left">
                    <ul class="job-tag">
                      ${workmodeHTML}
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
                      <span class="icon-dollar"></span>
                      <p>$${salary[0].min} - $${
      salary[0].max
    } <span class="year"></span></p>
                    </div>
                    <p class="days"> ${Math.floor(
                      differenceInDays1
                    )} days left to apply</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="inner-content home2">
              <h5>Job Requirements</h5>
             <p>${veri.requirements}</p>
              <h6>Obligations:</h6>
              <ul class="list-dot">
              ${veri.obligations}
              </ul>
            
            
              <div class="post-navigation d-flex aln-center">
                <div class="wd-social d-flex aln-center">
                  <span>Social Profiles:</span>
                  <ul class="list-social d-flex aln-center">
${socialHTML}
                  </ul>
                </div>
                <a href="#" class="frag-btn"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"
                    viewBox="0 0 14 15" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H13C13.1857 0 13.3678 0.0517147 13.5257 0.149349C13.6837 0.246984 13.8114 0.386681 13.8944 0.552786C13.9775 0.718892 14.0126 0.904844 13.996 1.08981C13.9793 1.27477 13.9114 1.45143 13.8 1.6L11.25 5L13.8 8.4C13.9114 8.54857 13.9793 8.72523 13.996 8.91019C14.0126 9.09516 13.9775 9.28111 13.8944 9.44721C13.8114 9.61332 13.6837 9.75302 13.5257 9.85065C13.3678 9.94829 13.1857 10 13 10H3C2.73478 10 2.48043 10.1054 2.29289 10.2929C2.10536 10.4804 2 10.7348 2 11V14C2 14.2652 1.89464 14.5196 1.70711 14.7071C1.51957 14.8946 1.26522 15 1 15C0.734784 15 0.48043 14.8946 0.292893 14.7071C0.105357 14.5196 0 14.2652 0 14V3Z"
                      fill="#64666C" />
                  </svg> Report job </a>
              </div>
              <div class="video-thumb">
                <div class="content-tab2">
                  <div class="inner">
                    <div class="thumb">
                      <img src="/img/review/thumbv3.jpg" alt="/img">
                      <a href="${veri.videourl}" class="lightbox-image">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M27.5795 50.5623C40.2726 50.5623 50.5624 40.2725 50.5624 27.5794C50.5624 14.8863 40.2726 4.59656 27.5795 4.59656C14.8865 4.59656 4.59668 14.8863 4.59668 27.5794C4.59668 40.2725 14.8865 50.5623 27.5795 50.5623Z"
                            fill="#EB4D4D"></path>
                          <path
                            d="M20.9141 27.5794V24.1779C20.9141 19.7882 24.0167 18.0185 27.8089 20.2019L30.7507 21.9026L33.6925 23.6034C37.4847 25.7867 37.4847 29.3721 33.6925 31.5554L30.7507 33.2562L27.8089 34.9569C24.0167 37.1403 20.9141 35.3476 20.9141 30.9809V27.5794Z"
                            fill="white"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <ul class="thumb-menu menu-tab2">
                  
                 ${photosHTML}
                </ul>
              </div>
  
            </div>
          </article>

`;

    resolve(1);
  });
};

let viewJob = (veri) => {
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
      <div onclick='jobBoxClick(event, ${push})'  class="features-job mg-bt-0 ct-tab ">
              <div class="job-archive-header">
                <div class="inner-box">
                  <div class="logo-company">
                    <img src="${element.profileIMG}" alt="${
        element.profileIMG
      }" />
                  </div>
                  <div class="box-content">
                    <h4>
                      <a >${element.city}</a>
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
      } <span class="year">/</span></p>
                  </div>
                  <p class="days"> ${Math.floor(
                    differenceInDays2
                  )}  days left to apply</p>
                </div>
              </div>
            </div>
      
      `;
    });

  if(veri.length == 0){
    jobrightView.innerHTML = ''
 resolve(1)

  }else{
    firstJobView(veri[0]).then((data) => {
      resolve(1);
    });
  }
     
  
   
  }).catch((err) => {
    return 0;
  });
};

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
      history.pushState(null, "", `/home/?veri=${veriString}`);
      viewJob(res).then((result) => {
        
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

  firstJobView(element).then(data=>{
    console.log(data)
  })
}