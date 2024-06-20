let detailLocation = document.getElementById('detailLocation')
let detailTitle = document.getElementById('detailTitle')



let jobFilterFETCH = () => {
    fetch(`${window.location.href}`, {
      method: "POST", // HTTP metodu
      headers: {
        "Content-Type": "application/json", // Gönderilen verinin türü JSON olarak ayarlanıyor
      },
      body: JSON.stringify([]),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
      });
  };

  jobFilterFETCH()



  let detailView = (veri)=>{
return new Promise((resolve,reject)=>{

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

    for(let i = 0;i<3;i++){
      photosHTML += `<li class="ct-tab2"> <a class="lightbox-gallery" href="${photos[i]}"><img
                        src="${photos[i]}" alt="/img"></a> </li>`
    }


    detailLocation.innerHTML = veri.city
    detailTitle.innerHTML = veri.title
    



})



  }