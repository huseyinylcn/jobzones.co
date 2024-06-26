let candidatesDetailJob = document.getElementById("candidatesDetailJob");
let candidatesDetailFullname = document.getElementById(
  "candidatesDetailFullname"
);
let candidatesDetailIMG = document.getElementById("candidatesDetailIMG");
let candidatesDetailCityID = document.getElementById("candidatesDetailCityID");
let candidatesDetailPriceID = document.getElementById(
  "candidatesDetailPriceID"
);
let cvDownload = document.getElementById("cvDownload");
let candidatesDetailAboutID = document.getElementById(
  "candidatesDetailAboutID"
);
let candidatesDetailEducationBoxID = document.getElementById(
  "candidatesDetailEducationBoxID"
);
let candidatesDetailExperienceID = document.getElementById(
  "candidatesDetailExperienceID"
);
let candidatesDetailVideoUrlID = document.getElementById(
  "candidatesDetailVideoUrlID"
);
let candidatesDetailIMGBocID = document.getElementById(
  "candidatesDetailIMGBocID"
);
let candidatesDetailListUlID = document.getElementById(
  "candidatesDetailListUlID"
);
let cvDownloadBottom = document.getElementById("cvDownloadBottom");
let socialUl = document.getElementById("socialUl");
let candidatesDetailSkilLeftID = document.getElementById(
  "candidatesDetailSkilLeftID"
);
let candidatesDetailSkilRightID = document.getElementById(
  "candidatesDetailSkilRightID"
);

let educationEdit = (education) => {
  return new Promise((resolve, reject) => {
    candidatesDetailEducationBoxID.innerHTML = "";
    education.forEach((element) => {
      candidatesDetailEducationBoxID.innerHTML += `
        <div class="inner">
                          <div class="sub-heading">${element.name} <span>${element.time}</span></div>
                          <div class="heading">${element.section}</div>
                          <p> ${element.about} </p>
                        </div>
        `;
    });
    resolve(1);
  });
};

let experienceEdit = (experience) => {
  return new Promise((resolve, reject) => {
    candidatesDetailExperienceID.innerHTML = "";
    experience.forEach((element) => {
      candidatesDetailExperienceID.innerHTML += `
                  <div class="inner">
                      <div class="sub-heading">${element.name}<span>${element.time}</span></div>
                      <div class="heading">${element.section}</div>
                      <p>${element.about}</p>
                    </div>
            `;
    });
    resolve(1);
  });
};

let photosEdit = (photos) => {
  return new Promise((resolve, reject) => {
    candidatesDetailIMGBocID.innerHTML = "";
    photos.forEach((element) => {
      candidatesDetailIMGBocID.innerHTML += `
                <li class="ct-tab2"> <a class="lightbox-gallery" href="${element}"><img src="${element}" alt="/img"></a> </li>
              
            `;
    });
    resolve(1);
  });
};

let socialEdit = (social) => {
  return new Promise((resolve, reject) => {
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
           <li><a href="${url}"><i class="icon-facebook"></i></a></li>`;
      } else if (platform == "twitter") {
        socialHTML += `<li><a href="${url}"><i class="icon-twitter"></i></a></li>`;
      } else if (platform == "instagram") {
        socialHTML += `<li><a href="${url}"><i class="icon-instagram1"></i></a></li>`;
      } else if (platform == "linkedin") {
        socialHTML += `<li><a href="${url}"><i class="icon-linkedin2"></i></a></li>`;
      } else if (platform == "youtube") {
        socialHTML += `<li><a href="${url}"><i class="icon-youtube"></i></a></li>`;
      } else if (platform == "pinterest") {
        socialHTML += `<li><a href="${url}"><i class="icon-pinterest"></i></a></li>`;
      }
    });

    socialUl.innerHTML = `${socialHTML}`;
    resolve(1);
  });
};

let skilEdit = (skil) => {
  return new Promise((resolve, reject) => {
    console.log(skil)
    candidatesDetailSkilLeftID.innerHTML = "";
    candidatesDetailSkilRightID.innerHTML = "";
    for (let i = 0; i < skil.length; i++) {
      if (i % 2 == 0) {
        candidatesDetailSkilLeftID.innerHTML += `
        <div class="wd-cv-skill">
                        <div class="progress-item">
                          <div class="progress-heading">
                            <div class="heading-progress">${skil[i].name}</div>
                            <div class="donat-bg" data-percent="${Number(skil[i].level)}%">
                              <div class="custom-donat" style="width:${Number(skil[i].level)}%;"></div>
                            </div>
                          </div>
                        </div>
                      </div>
        `;
      } else {
        candidatesDetailSkilRightID.innerHTML += `
            <div class="wd-cv-skill">
                        <div class="progress-item">
                          <div class="progress-heading">
                            <div class="heading-progress">${skil[i].name}</div>
                            <div class="donat-bg" data-percent="${Number(skil[i].level)}%">
                             <div class="custom-donat" style="width:${Number(skil[i].level)}%;"></div>
                            </div>
                          </div>
                        </div>
                      </div>
        `;
      }
    }
  });
};

let viewEdit = (veri) => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const birthDate = new Date(veri.birth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    let salary = JSON.parse(veri.salary);
    let cvpath = JSON.parse(veri.cvpath);
    let education = JSON.parse(veri.education);
    let experience = JSON.parse(veri.experience);
    let photos = JSON.parse(veri.photos);
    let language = JSON.parse(veri.language);
    let social = JSON.parse(veri.social);
    let skil = JSON.parse(veri.hobby);

    let languageHTML = "";
    language.forEach((element) => {
      languageHTML += element + " ,";
    });

    candidatesDetailJob.innerHTML = veri.job;
    candidatesDetailFullname.innerHTML = veri.fullname;
    candidatesDetailIMG.src = veri.profileIMG;
    candidatesDetailCityID.innerHTML = ` <span class="icon-map-pin"></span> ${veri.city}`;
    candidatesDetailPriceID.innerHTML = `<span class="icon-dolar1"></span>$${salary[0].salary}/${salary[0].time} `;
    cvDownload.dataset.value = cvpath[0];
    candidatesDetailAboutID.innerHTML = salary[0].about;
    candidatesDetailVideoUrlID.href = veri.videoURL;

    candidatesDetailListUlID.innerHTML = `
<li><div class="category">Career Finding</div><div class="detail">${veri.job}</div></li>
<li><div class="category">Location</div><div class="detail">${veri.city}</div></li>
<li><div class="category">Phone Number</div><div class="detail">${veri.phone}</div></li>
<li><div class="category">Email</div><div class="detail">${veri.email}</div></li>
<li><div class="category">Offered Salary</div><div class="detail">${salary[0].min}$-${salary[0].max}$</div></li>
<li><div class="category">Experience time</div><div class="detail">${veri.experienceTime} Years</div></li>
<li><div class="category">Language</div><div class="detail">${languageHTML}</div></li>
<li><div class="category">Age</div><div class="detail">${age} Years Old</div></li>
<li><div class="category">Qualification</div><div class="detail">${veri.qualdegree}</div></li>
`;

    educationEdit(education);
    experienceEdit(experience);
    photosEdit(photos);
    socialEdit(social);
    skilEdit(skil);
  });
};

cvDownload.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = cvDownload.dataset.value;
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

cvDownloadBottom.addEventListener("click", () => {
  cvDownload.click();
});

let candidatesDetailGet = (() => {
  fetch(window.location.href, {
    method: "POST", // HTTP metodu
    headers: {
      "Content-Type": "application/json", // Gönderilen verinin türü JSON olarak ayarlanıyor
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      viewEdit(data);
    })
    .catch((err) => {
      console.log("hataa", err);
    });
})();
