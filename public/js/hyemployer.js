import city from '/veri/city.json' with {type:'json'}
import category from '/veri/category.json' with {type:'json'}
import sector from '/veri/sector.json' with {type:'json'}

import departmen from '/veri/departmen.json' with {type:'json'}






let sectorSelectUL = document.getElementById('sectorSelectUL')
let sectorSelect = document.getElementById('sectorSelect')

let NewArray4 = []
sectorSelectUL.style.display = 'none'

document.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement === sectorSelectUL || sectorSelect == clickedElement) {
    } else {
        sectorSelectUL.style.display = 'none'
    }
});

let liClick4 = (event)=>{
    sectorSelect.value = event.target.innerHTML
    console.log(event.target.innerHTML)
    
}

let inputSelectFunc4 = (items ,currentValue)=>{
    NewArray4 = []
            const filteredItems = items.filter(item => item.toLowerCase().includes(currentValue.toLowerCase()));
            
            NewArray4 = filteredItems.slice(0,10)
            NewArray4.forEach(item => {
                const listItem = document.createElement("li");
                listItem.className = 'inputSelectLi'
                listItem.textContent = item;
                listItem.onclick = function(event){
                    liClick4(event)
                }
            sectorSelectUL.appendChild(listItem);
               
            });
        
}


sectorSelect.addEventListener('input',()=>{
    let currentValue = sectorSelect.value
    sectorSelectUL.style.display = 'block'
    
    sectorSelectUL.innerHTML = "";
    inputSelectFunc4(sector, currentValue)
})












            


let citySelectUL = document.getElementById('citySelectUL')
let citySelect = document.getElementById('citySelect')
let homeLocation = document.getElementById('homeLocation')
let homelocationINPUT = document.getElementById('homelocationINPUT')


let NewArray3 = []
citySelectUL.style.display = 'none'
homeLocation.style.display = 'none'


document.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement === citySelectUL || citySelect == clickedElement) {
    } else {
        citySelectUL.style.display = 'none'
    }

    if (filterBox.contains(clickedElement) || filterOpenBtn.contains(clickedElement) ) {
    
    } else {
        filterBox.style.display = 'none'
    
    }
});


document.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement === homeLocation || homelocationINPUT == clickedElement) {
    } else {
        homeLocation.style.display = 'none'
    }
});


let liClick3 = (event)=>{
    citySelect.value = event.target.innerHTML
    homelocationINPUT.value = event.target.innerHTML

    
}

let inputSelectFunc3 = (items ,currentValue)=>{
    
    NewArray3 = []
            const filteredItems = items.filter(item => item.toLowerCase().includes(currentValue.toLowerCase()));
            
            NewArray3 = filteredItems.slice(0,10)
            NewArray3.forEach(item => {
                const listItem = document.createElement("li");
                listItem.className = 'inputSelectLi'
                listItem.textContent = item;
                listItem.onclick = function(event){
                    liClick3(event)
                }
                homeLocation.appendChild(listItem);

                let listItemClone = listItem.cloneNode(true);
                // kopyanın event listener'ını yeniden tanımla
                listItemClone.onclick = function(event) {
                    liClick3(event);
                }
                citySelectUL.appendChild(listItemClone);
              
            });
          
        
}


citySelect.addEventListener('input',()=>{
    let currentValue = citySelect.value
    citySelectUL.style.display = 'block'
    
    citySelectUL.innerHTML = "";
    inputSelectFunc3(city, currentValue)
})


homelocationINPUT.addEventListener('input',()=>{
    citySelect.value = homelocationINPUT.value
    let currentValue = homelocationINPUT.value
    homeLocation.style.display = 'block'
    
    homeLocation.innerHTML = "";
    inputSelectFunc3(city, currentValue)
})