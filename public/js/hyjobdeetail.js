let detailTop = document.getElementById("detailTop");
let detailUl = document.getElementById("detailUl");
let requirements = document.getElementById("requirements");
let obligations = document.getElementById("obligations");
let socialUl = document.getElementById("socialUl");
let photosDetail = document.getElementById('photosDetail')
let videoURL = document.getElementById('videoURL')



let jobID = ''
let basvuruClick = ''
let detailView = (veri) => {
  return new Promise((resolve, reject) => {
  
    const today = new Date();
    const specifiedDate0 = new Date(veri.date);
    const differenceInDays0 = Math.abs(
      (today - specifiedDate0) / (1000 * 60 * 60 * 24)
    );

    let parray = JSON.parse(veri.workmode);

    let workmodeHTML = "";
    parray.forEach((ele) => {
      workmodeHTML += `<li style="text-transform: capitalize;"><a href="#">${ele}</a> </li>`;
    });

    let salary = JSON.parse(veri.salary);

    const specifiedDate1 = new Date(veri.finish);
    const differenceInDays1 = Math.abs(
      (specifiedDate1 - today) / (1000 * 60 * 60 * 24)
    );

    let coordinate = veri.coordinate.split(",");

    var iframe = document.getElementById("maps");
    var baseSrc =
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!";
    var newSrc = `${baseSrc}2d${coordinate[1]}!3d${coordinate[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s`;
    iframe.src = newSrc;

    requirements.innerHTML = `${veri.requirements}`;
    obligations.innerHTML = `${veri.obligations}`;

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


    let photosHTML = ''

    let photos = JSON.parse(veri.photos)

    for(let i = 0;i<photos.length;i++){
      photosHTML += `<li class="ct-tab2"> <a class="lightbox-gallery" href="${photos[i]}"><img
                        src="${photos[i]}" alt="/img"></a> </li>`
    }
    [{"mode":""}]


photosDetail.innerHTML = `${photosHTML}`

videoURL.href = veri.videourl


let taking = JSON.parse(veri.taking)
taking = JSON.stringify(taking)

    detailTop.innerHTML = `
         <div class="wd-job-author2">
            <div class="content-left">
              <div class="thumb">
                <img class="detailpp" src="${veri.profileIMG}" alt="logo">
              </div>
              <div class="content">
                    <a class="category" > <span class="icon-map-pin"></span> ${
                      veri.city
                    }</a>
                <h6>
             <a >${veri.title}</a> <span class="icon-bolt"></span>
                </h6>
                <ul class="job-info">
                  <li>${veri.personalnumber} people will be taken
                  </li>
                    <li><span class="icon-calendar"></span>
                      ${Math.floor(differenceInDays0)} days ago
                </ul>
                <ul class="tags">
                 ${workmodeHTML}
                </ul>
              </div>
            </div>
            <div class="content-right">
              <div class="top">
                <a href="#" class="share"><i class="icon-share2"></i></a>
                <a href="#" class="wishlist"><i class="icon-heart"></i></a>
                <a id="basvuruClick" data-value='${taking}' class="btn btn-popup"><i class="icon-send"></i>Apply Now</a>
              </div>
              <div class="bottom">

                <div class="gr-rating">
                    <p class="days"> ${Math.floor(
                      differenceInDays1
                    )} days left to apply</p>
                  <ul class="list-star">
                    <li class="icon-star-full"></li>
                    <li class="icon-star-full"></li>
                    <li class="icon-star-full"></li>
                    <li class="icon-star-full"></li>
                    <li class="icon-star-full"></li>
                  </ul>
                </div>
                <div class="price">
                  <span class="icon-dollar"></span>
                  <p>$${salary[0].min} - $${
      salary[0].max
    } <span class="year"></span></p>
                </div>
              </div>
              
            </div>
          </div>
`;

    detailUl.innerHTML = `
              <li><div class="category">Website</div><div class="detail"><a href="${veri.weburl}">${veri.weburl}</a></div></li>
              <li><div class="category">Industry</div><div class="detail">${veri.sector}</div></li>
              <li><div class="category">Company size</div><div class="detail">${veri.size}</div></li>
              <li><div class="category">Headquarters</div><div class="detail">${veri.city}</div></li>

`;
resolve(1)
  });
};












let jobFilterFETCH = (() => {
  fetch(`${window.location.href}`, {
    method: "POST", // HTTP metodu
    headers: {
      "Content-Type": "application/json", // Gönderilen verinin türü JSON olarak ayarlanıyor
    },
    body: JSON.stringify([]),
  })
    .then((response) => response.json())
    .then((res) => {
     jobID = res.jobID
      detailView(res).then(data=>{
        basvuruClick = document.getElementById('basvuruClick')
        basvuruClick.addEventListener('click',()=>{
        let taking = JSON.parse(basvuruClick.dataset.value)
        basvuruFunc(taking[0])
        })

      })
    });
})();



