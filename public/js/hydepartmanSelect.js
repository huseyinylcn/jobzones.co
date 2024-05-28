let   depatmanSelect = document.getElementById('depatmanSelect')

let   depatmanSelectİnput = document.getElementById('depatmanSelectİnput')


let newArrayDepart = []
depatmanSelect.style.display = 'none'

document.addEventListener("click", function(event) {
    var clickedElement = event.target;


    if (clickedElement === depatmanSelect || depatmanSelectİnput == clickedElement) {
        console.log("Div tıklandı");
    } else {
   
    depatmanSelect.style.display = 'none'

 
    }
});

let liClickDepaert = (event)=>{

    depatmanSelectİnput.value = event.target.innerHTML
    depatmanSelect.style.display = 'none'
    inputSelectFuncDepartman()
}

let inputSelectFuncDepartman = ()=>{
    newArrayDepart = []
    depatmanSelect.style.display = 'block'
    let currentValue = depatmanSelectİnput.value
    depatmanSelect.innerHTML = "";





    var items = [
        "Strateji və Planlaşdırma",
        "Korporativ kommunikasiyalar",
        "Biznes Proseslərinin Təkmilləşdirilməsi",
        "lobal Genişlənmə",
        "İnsan Resursları (HR)",
        "Təlim və İnkişaf",
        "Əməyin mühafizəsi",
        "Maliyyə və Mühasibat uçotu",
        "Risklərin idarə edilməsi",
        "Investisiyaların idarə edilməsi",
        "Marketinq",
        "Bazar araşdırması",
        "Media ilə əlaqələr",
        "Satış",
        "Satış əməliyyatları",
        "Satıcıların idarə edilməsi",
        "Əməliyyatlar",
        "Obyektlərin idarə edilməsi",
        "Aktivlərin idarə edilməsi",
        "İnformasiya Texnologiyaları (İT)",
        "İnformasiya Təhlükəsizliyi",
        "Müştəri xidməti",
        "Tədqiqat və İnkişaf (R&D)",
        "Məhsulun inkişafı",
        "Hüquq",
        "Keyfiyyət Təminatı və Uyğunluq",
        "Təchizat Zəncirinin İdarə Edilməsi",
        "Satınalma",
        "Layihənin idarə edilməsi",
        "Biznesin inkişafı",
        "İctimaiyyətlə Əlaqələr (PR)",
        "Daxili Audit",
        "Risklərin idarə edilməsi",
        "İstehsal",
        "Logistika",
        "Biznesin İdarəedilməsi",
        "Dizayn",
        "Mühəndislik",
        "Təhlükəsizlik",
        "Ətraf Mühitin Sağlamlığı və Təhlükəsizliyi (EHS)",
        "Məhsulun inkişafı",
        "Satınalmalar və Müqavilələr",
        "Media ilə əlaqələr",
        "Əməliyyatlar",
        "Əməyin mühafizəsi",
        "Əqli Mülkiyyət (ƏM)",
        "Satıcıların idarə edilməsi",
        "Korporativ Təlim",
        "Digər (Sizin seçiminiz)"
    ];
    
    
    

       
            const filteredItems = items.filter(item => item.toLowerCase().includes(currentValue.toLowerCase()));
            // ilteredItems.slice(0,10)
            newArrayDepart = filteredItems
            newArrayDepart.forEach(item => {
                const listItem = document.createElement("li");
                listItem.className = 'inputSelectLi'
                listItem.textContent = item;
                listItem.onclick = function(event){
                    liClickDepaert(event)
                }
                
                
                depatmanSelect.appendChild(listItem);
               
            });
        
}


depatmanSelectİnput.addEventListener('input',inputSelectFuncDepartman)



depatmanSelectİnput.addEventListener('click',()=>{
    depatmanSelect.style.display = 'block'
inputSelectFuncDepartman()

})

let otoSelectDep = ()=>{
    if(!newArrayDepart[0] || depatmanSelectİnput.value == ''){
        depatmanSelectİnput.value = ''
        return ''
    }else{
        depatmanSelectİnput.value = newArrayDepart[0]
        return  newArrayDepart[0]
    }

}

