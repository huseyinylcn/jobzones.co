
let detailUl = document.getElementById("detailUl");



let bannerID =document.getElementById('bannerID')
let profileIMG = document.getElementById('profileIMG')
let employerDetailFullNameID = document.getElementById('employerDetailFullNameID')
let employerdetailCityID = document.getElementById('employerdetailCityID')
let employerDetailAboutID = document.getElementById('employerDetailAboutID')
let socialUl = document.getElementById("socialUl");
let videoURL = document.getElementById('videoURL')
let photosDetail = document.getElementById('photosDetail')



let detailView = (veri) => {
  return new Promise((resolve, reject) => {

bannerID.src = veri.bannerIMG
profileIMG.style.backgroundImage = `url(${veri.profileIMG})`
employerDetailFullNameID.innerHTML = veri.fullname
employerdetailCityID.innerHTML = veri.city
employerDetailAboutID.innerHTML = veri.history

    let coordinate = veri.coordinate.split(",");

    var iframe = document.getElementById("maps");
    var baseSrc =
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!";
    var newSrc = `${baseSrc}2d${coordinate[1]}!3d${coordinate[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s`;
    iframe.src = newSrc;




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
    videoURL.href = veri.videourl


    let photosHTML = ''

    let photos = JSON.parse(veri.photos)

    for(let i = 0;i<photos.length;i++){
      photosHTML += `<li class="ct-tab2"> <a class="lightbox-gallery" href="${photos[i]}"><img
                        src="${photos[i]}" alt="/img"></a> </li>`
    }

photosDetail.innerHTML = `${photosHTML}`


    detailUl.innerHTML = `
            <li>
                <div class="category">Website</div>
                <div class="detail"><a href="#">${veri.weburl}</a></div>
              </li>
              <li>
                <div class="category">Email</div>
                <div class="detail">${veri.email}</div>
              </li>
              <li>
                <div class="category">Industry</div>
                <div class="detail">${veri.sector}</div>
              </li>
              <li>
                <div class="category">Company size</div>
                <div class="detail">${veri.size}</div>
              </li>
              <li>
                <div class="category">Headquarters</div>
                <div class="detail">${veri.city}</div>
              </li>
             

`;
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
      detailView(res);
    });
})();
