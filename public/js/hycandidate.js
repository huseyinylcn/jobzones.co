let filterSearchBtn = document.getElementById("filterSearchBtn");
let mode = document.getElementById("mode");
let gender = document.getElementById("gender");
let agemin = document.getElementById("agemin");
let agemax = document.getElementById("agemax");
let datepostedMax = document.getElementById("datepostedMax");
let datepostedMin = document.getElementById("datepostedMin");
let qualification = document.getElementById("qualification");
let experencTime = document.getElementById("experencTime");

let candidatexBox = document.getElementById("candidatexBox");

let candidateJobKeyWordID = document.getElementById("candidateJobKeyWordID");
let cadidatesLocationKeyWordID = document.getElementById(
  "cadidatesLocationKeyWordID"
);

let pageBox = document.getElementById("pageBox");
let keyWordUpdateBtnID = document.getElementById("keyWordUpdateBtnID");

let pageNumber = 0;
let tales = JSON.stringify([]);

keyWordUpdateBtnID.addEventListener("click", () => {
  let location = cadidatesLocationKeyWordID.value;

  let resolveLocation = otoSelect();
  otoSelectDep();

  const params = {
  agemax: agemax.value,
  agemin: agemin.value,
  datepostedMax: datepostedMax.value,
  datepostedMin: datepostedMin.value,
  departman: depatmanSelectİnput.value,
  experencTime: experencTime.value,
  gender: gender.value,
  mode: mode.value,
  qualification: qualification.value,
};
  console.log("local", location);
  pageNumber = 0;

  fetch("/candidates/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      status: 1,
      page: pageNumber,
      job: candidateJobKeyWordID.value,
      location: resolveLocation,
      tales: tales,
      params:params
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      pageBox.innerHTML = "";
      for (let i = 0; i < data.totalpage; i++) {
        pageBox.innerHTML += ` <li><a onclick="updatePageNumber(event)" href="#">${
          i + 1
        }</a></li>`;
      }
      let a = pageBox.getElementsByTagName("a");

      for (let i = 0; i < a.length; i++) {
        if (a[i].innerHTML == 1) {
          a[i].className = "currentAelement";
        }
      }

      let array1 = data.result;
      candidatexBox.innerHTML = "";
      history.pushState(
        null,
        "",
        `/candidates/?job=${candidateJobKeyWordID.value}&location=${cadidatesLocationKeyWordID.value}&page=${pageNumber}&tales=${tales}&departman=${depatmanSelectİnput.value}&mode=${mode.value}&gender=${gender.value}&agemin=${agemin.value}&agemax=${agemax.value}&datepostedMax=${datepostedMax.value}&datepostedMin=${datepostedMin.value}&qualification=${qualification.value}&experencTime=${experencTime.value}`
      );
      array1.forEach((element) => {
        let tagHTML = "";
        let newtales = JSON.parse(element.data.tales);
        newtales.forEach((tal) => {
          tagHTML += `<li><a href="#">${tal}</a></li>`;
        });

        candidatexBox.innerHTML += `         <div class="features-job wd-thum-career cl2" style="position:relative">
        <div class="job-archive-header">
          <div class="career-header-left" >
          <span  id="kaybol2" style="display:; position:absolute; right:-30px;" class="icon-heart"></span>
            <img src="${element.data.photo}" alt="/img/user/avatar/avt-thumb-01.jpg" class="thumb">
            <div class="career-left-inner">
              <h4>
                <a href="/${element.data.username}">${element.data.job}</a>
              </h4>
              <h3>
                <a href="/${element.data.username}">${element.data.fullName}</a>
                <span class="icon-bolt"></span>
              </h3>
              <ul class="career-info">
                <li>
                  Available now
                </li>
                <li>
                  <span class="icon-map-pin"></span>
                  ${element.data.location}
                </li>
              </ul>

            </div>
          </div>
          <div class="career-header-right" id="kaybol">
            <span class="icon-heart"></span>
             <a    href="/${element.data.username}" class="tf-btn">View Profile</a>

          </div>
        </div>
        <div class="job-archive-footer">
          <div class="career-footer-left">
            <ul class="career-tag">
            ${tagHTML}
            </ul>
          </div>
          <div class="carrer-footer-right">

           
          </div>
        </div>
    </div>`;
      });
    });
});

if (window.location.search == "") {
  fetch("/candidates/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      status: 0,
      page: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      pageBox.innerHTML = "";
      for (let i = 0; i < data.totalpage; i++) {
        pageBox.innerHTML += ` <li><a onclick="updatePageNumber(event)" href="#">${
          i + 1
        }</a></li>`;
      }
      let a = pageBox.getElementsByTagName("a");

      for (let i = 0; i < a.length; i++) {
        if (a[i].innerHTML == 1) {
          a[i].className = "currentAelement";
        }
      }

      console.log(data.totalpage);

      let array = data.result;
      candidatexBox.innerHTML = "";

      array.forEach((element) => {
        let tagHTML = "";
        let newtales = JSON.parse(element.data.tales);
        newtales.forEach((tal) => {
          tagHTML += `<li><a href="#">${tal}</a></li>`;
        });

        candidatexBox.innerHTML += `         <div class="features-job wd-thum-career cl2" style="position:relative">
        <div class="job-archive-header">
          <div class="career-header-left" >
          <span  id="kaybol2" style="display:; position:absolute; right:-30px;" class="icon-heart"></span>
            <img src="${element.data.photo}" alt="/img/user/avatar/avt-thumb-01.jpg" class="thumb">
            <div class="career-left-inner">
              <h4>
                <a href="/${element.data.username}">${element.data.job}</a>
              </h4>
              <h3>
                <a href="/${element.data.username}">${element.data.fullName}</a>
                <span class="icon-bolt"></span>
              </h3>
              <ul class="career-info">
                <li>
                  Available now
                </li>
                <li>
                  <span class="icon-map-pin"></span>
                  ${element.data.location}
                </li>
              </ul>

            </div>
          </div>
          <div class="career-header-right" id="kaybol">
            <span class="icon-heart"></span>
             <a    href="/${element.data.username}" class="tf-btn">View Profile</a>

          </div>
        </div>
        <div class="job-archive-footer">
          <div class="career-footer-left">
            <ul class="career-tag">
            ${tagHTML}
            </ul>
          </div>
          <div class="carrer-footer-right">

           
          </div>
        </div>
    </div>`;
      });
    });
} else {
  const queryString = window.location.search;

  const cleanedQueryString = queryString.startsWith("?")
    ? queryString.slice(1)
    : queryString;

  const params = {};
  cleanedQueryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = decodeURIComponent(value.replace(/\+/g, " "));
  });
 

 
 agemax.value = params.agemax
 agemin.value  = params.agemin
  datepostedMax.value  = params.datepostedMax
  datepostedMin.value  = params.datepostedMin
   depatmanSelectİnput.value  = params.departman
   experencTime.value  = params.experencTime
 gender.value  = params.gender
 mode.value  = params.mode
qualification.value  = params.qualification


  cadidatesLocationKeyWordID.value = params.location;
  candidateJobKeyWordID.value = params.job;
  let xx = JSON.parse(params.tales);
  let yy = JSON.stringify(xx);
  console.log(params);
  fetch("/candidates/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      status: 1,
      page: parseInt(params.page),
      job: params.job,
      location: params.location,
      tales: yy,
      params: params,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      pageBox.innerHTML = "";
      for (let i = 0; i < data.totalpage; i++) {
        pageBox.innerHTML += ` <li><a onclick="updatePageNumber(event)" href="#">${
          i + 1
        }</a></li>`;
      }
      let a = pageBox.getElementsByTagName("a");

      for (let i = 0; i < a.length; i++) {
        if (a[i].innerHTML == parseInt(params.page) + 1) {
          a[i].className = "currentAelement";
        }
      }

      let array3 = data.result;
      candidatexBox.innerHTML = "";
      array3.forEach((element) => {
        let tagHTML = "";
        let newtales = JSON.parse(element.data.tales);
        newtales.forEach((tal) => {
          tagHTML += `<li><a href="#">${tal}</a></li>`;
        });

        candidatexBox.innerHTML += `         <div class="features-job wd-thum-career cl2" style="position:relative">
                <div class="job-archive-header">
                  <div class="career-header-left" >
                  <span  id="kaybol2" style="display:; position:absolute; right:-30px;" class="icon-heart"></span>
                    <img src="${element.data.photo}" alt="/img/user/avatar/avt-thumb-01.jpg" class="thumb">
                    <div class="career-left-inner">
                      <h4>
                        <a href="/${element.data.username}">${element.data.job}</a>
                      </h4>
                      <h3>
                        <a href="/${element.data.username}">${element.data.fullName}</a>
                        <span class="icon-bolt"></span>
                      </h3>
                      <ul class="career-info">
                        <li>
                          Available now
                        </li>
                        <li style="width:110px; height:22px; overflow: hidden; white-space: nowrap;">
                          <span class="icon-map-pin"></span>
                          ${element.data.location}
                        </li>
                      </ul>
    
                    </div>
                  </div>
                  <div class="career-header-right" id="kaybol">
                    <span class="icon-heart"></span>
                     <a    href="/${element.data.username}" class="tf-btn">View Profile</a>
    
                  </div>
                </div>
                <div class="job-archive-footer">
                  <div class="career-footer-left">
                    <ul class="career-tag">
                    ${tagHTML}
                    </ul>
                  </div>
                  <div class="carrer-footer-right">
    
                   
                  </div>
                </div>
            </div>`;
      });
    });
}

function updatePageNumber(event) {
  otoSelectDep();

  const params = {
  agemax: agemax.value,
  agemin: agemin.value,
  datepostedMax: datepostedMax.value,
  datepostedMin: datepostedMin.value,
  departman: depatmanSelectİnput.value,
  experencTime: experencTime.value,
  gender: gender.value,
  mode: mode.value,
  qualification: qualification.value,
};
  let a = pageBox.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    a[i].className = "";
  }

  let tagetElement = event.target;
  tagetElement.classList.add("currentAelement");

  pageNumber = Number(event.target.innerHTML) - 1;
  console.log(pageNumber);

  fetch("/candidates/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      status: 1,
      page: pageNumber,
      job: candidateJobKeyWordID.value,
      location: cadidatesLocationKeyWordID.value,
      tales: tales,
      params:params
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let array1 = data.result;
      candidatexBox.innerHTML = "";
      history.pushState(
        null,
        "",
        `/candidates/?job=${candidateJobKeyWordID.value}&location=${cadidatesLocationKeyWordID.value}&page=${pageNumber}&tales=${tales}&departman=${depatmanSelectİnput.value}&mode=${mode.value}&gender=${gender.value}&agemin=${agemin.value}&agemax=${agemax.value}&datepostedMax=${datepostedMax.value}&datepostedMin=${datepostedMin.value}&qualification=${qualification.value}&experencTime=${experencTime.value}`
      );
      array1.forEach((element) => {
        let tagHTML = "";
        let newtales = JSON.parse(element.data.tales);
        newtales.forEach((tal) => {
          tagHTML += `<li><a href="#">${tal}</a></li>`;
        });

        candidatexBox.innerHTML += `         <div class="features-job wd-thum-career cl2" style="position:relative">
                <div class="job-archive-header">
                  <div class="career-header-left" >
                  <span  id="kaybol2" style="display:; position:absolute; right:-30px;" class="icon-heart"></span>
                    <img src="${element.data.photo}" alt="/img/user/avatar/avt-thumb-01.jpg" class="thumb">
                    <div class="career-left-inner">
                      <h4>
                        <a href="/${element.data.username}">${element.data.job}</a>
                      </h4>
                      <h3>
                        <a href="/${element.data.username}">${element.data.fullName}</a>
                        <span class="icon-bolt"></span>
                      </h3>
                      <ul class="career-info">
                        <li>
                          Available now
                        </li>
                        <li>
                          <span class="icon-map-pin"></span>
                          ${element.data.location}
                        </li>
                      </ul>
    
                    </div>
                  </div>
                  <div class="career-header-right" id="kaybol">
                    <span class="icon-heart"></span>
                     <a    href="/${element.data.username}" class="tf-btn">View Profile</a>
    
                  </div>
                </div>
                <div class="job-archive-footer">
                  <div class="career-footer-left">
                    <ul class="career-tag">
                    ${tagHTML}
                    </ul>
                  </div>
                  <div class="carrer-footer-right">
    
                   
                  </div>
                </div>
            </div>`;
      });
    });
}


let closeFilterID = document.getElementById('closeFilterID')
  let filterBtn2 = document.getElementById('filterBtn2')
  let filterBtn = document.getElementById('filterBtn')
let filterBox = document.getElementById('filterBox')
filterBox.style.transform = 'translate(-100%)'

closeFilterID.addEventListener('click',()=>{
  filterBox.style.transform = 'translate(-100%)'
})

  filterBtn.addEventListener('click',()=>{
    if( filterBox.style.transform == 'translate(-100%)'){
      filterBox.style.transform = 'translate(0%)'
    }else{
    filterBox.style.transform = 'translate(-100%)'

    }
    
  })

  filterBtn2.addEventListener('click',()=>{
    if( filterBox.style.transform == 'translate(-100%)'){
      filterBox.style.transform = 'translate(0%)'
    }else{
    filterBox.style.transform = 'translate(-100%)'

    }
    
  })


filterSearchBtn.addEventListener("click", () => {
  closeFilterID.click()
  keyWordUpdateBtnID.click()
});
