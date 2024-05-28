let inputSelectUL = document.getElementById('inputSelectUL')


let NewArray = []
inputSelectUL.style.display = 'none'

document.addEventListener("click", function(event) {
    var clickedElement = event.target;


    if (clickedElement === inputSelectUL || cadidatesLocationKeyWordID == clickedElement) {
    } else {
   
    inputSelectUL.style.display = 'none'


    }
});

let liClick = (event)=>{

    cadidatesLocationKeyWordID.value = event.target.innerHTML
    inputSelectUL.style.display = 'none'
    inputSelectFunc()
}

let inputSelectFunc = ()=>{
    NewArray = []
    inputSelectUL.style.display = 'block'
    let currentValue = cadidatesLocationKeyWordID.value
    inputSelectUL.innerHTML = "";





    let items =  [
        "Azerbeycan Zərdab",
        "Azerbeycan Ağcabədi",
        "Azerbeycan Ağdam",
        "Azerbeycan Ağdaş",
        "Azerbeycan Ağdərə",
        "Azerbeycan Ağstafa",
        "Azerbeycan Ağsu",
        "Azerbeycan Astara",
        "Azerbeycan Babək",
        "Azerbeycan Bakı",
        "Azerbeycan Balakən",
        "Azerbeycan Beyləqan",
        "Azerbeycan Bərdə",
        "Azerbeycan Biləsuvar",
        "Azerbeycan Cəbrayıl",
        "Azerbeycan Cəlilabad",
        "Azerbeycan Culfa",
        "Azerbeycan Daşkəsən",
        "Azerbeycan Dəliməmmədli",
        "Azerbeycan Füzuli",
        "Azerbeycan Gədəbəy",
        "Azerbeycan Gəncə",
        "Azerbeycan Goranboy",
        "Azerbeycan Göyçay",
        "Azerbeycan Göygöl",
        "Azerbeycan Göytəpə",
        "Azerbeycan Hacıqabul",
        "Azerbeycan Horadiz",
        "Azerbeycan Xaçmaz",
        "Azerbeycan Xankəndi",
        "Azerbeycan Xızı",
        "Azerbeycan Xocalı",
        "Azerbeycan Xocavənd",
        "Azerbeycan Xırdalan",
        "Azerbeycan Xudat",
        "Azerbeycan İmişli",
        "Azerbeycan İsmayıllı",
        "Azerbeycan Kəlbəcər",
        "Azerbeycan Kürdəmir",
        "Azerbeycan Qax",
        "Azerbeycan Qazax",
        "Azerbeycan Qəbələ",
        "Azerbeycan Qobustan",
        "Azerbeycan Qovlar",
        "Azerbeycan Quba",
        "Azerbeycan Qubadlı",
        "Azerbeycan Qusar",
        "Azerbeycan Laçın",
        "Azerbeycan Lerik",
        "Azerbeycan Lənkəran",
        "Azerbeycan Liman",
        "Azerbeycan Masallı",
        "Azerbeycan Mingəçevir",
        "Azerbeycan Naftalan",
        "Azerbeycan Naxçıvan",
        "Azerbeycan Neftçala",
        "Azerbeycan Oğuz",
        "Azerbeycan Ordubad",
        "Azerbeycan Saatlı",
        "Azerbeycan Sabirabad",
        "Azerbeycan Salyan",
        "Azerbeycan Samux",
        "Azerbeycan Siyəzən",
        "Azerbeycan Sumqayıt",
        "Azerbeycan Şabran",
        "Azerbeycan Şahbuz",
        "Azerbeycan Şamaxı",
        "Azerbeycan Şəki",
        "Azerbeycan Şəmkir",
        "Azerbeycan Şərur",
        "Azerbeycan Şirvan",
        "Azerbeycan Şuşa",
        "Azerbeycan Tərtər",
        "Azerbeycan Tovuz",
        "Azerbeycan Ucar",
        "Azerbeycan Yardımlı",
        "Azerbeycan Yevlax",
        "Azerbeycan Zaqatala",
        "Azerbeycan Zəngilan",
        "Azerbeycan Zərdab"
    ];
    
    

       
            const filteredItems = items.filter(item => item.toLowerCase().includes(currentValue.toLowerCase()));
            
            NewArray = filteredItems.slice(0,10)
            NewArray.forEach(item => {
                const listItem = document.createElement("li");
                listItem.className = 'inputSelectLi'
                listItem.textContent = item;
                listItem.onclick = function(event){
                    liClick(event)
                }
                
                
                inputSelectUL.appendChild(listItem);
               
            });
        
}


cadidatesLocationKeyWordID.addEventListener('input',inputSelectFunc)



cadidatesLocationKeyWordID.addEventListener('click',()=>{
    inputSelectUL.style.display = 'block'
inputSelectFunc()

})

let otoSelect = ()=>{
    if(!NewArray[0] || cadidatesLocationKeyWordID.value == ''){
        cadidatesLocationKeyWordID.value = ''
        return ''
    }else{
        cadidatesLocationKeyWordID.value = NewArray[0]
        return  NewArray[0]
    }

}

