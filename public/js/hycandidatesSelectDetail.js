import city from '/veri/city.json' with {type:'json'}


let citySelectUL = document.getElementById('citySelectUL')
let citySelect = document.getElementById('citySelect')



let NewArray3 = []
citySelectUL.style.display = 'none'



document.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement === citySelectUL || citySelect == clickedElement) {
    } else {
        citySelectUL.style.display = 'none'
    }
});





let liClick3 = (event)=>{
    citySelect.value = event.target.innerHTML

    
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
                citySelectUL.appendChild(listItem);
              
            });
          
        
}


citySelect.addEventListener('input',()=>{
    let currentValue = citySelect.value
    citySelectUL.style.display = 'block'
    
    citySelectUL.innerHTML = "";
    inputSelectFunc3(city, currentValue)
})
