import city from '/veri/city.json' with {type:'json'}
import category from '/veri/category.json' with {type:'json'}
import departmen from '/veri/departmen.json' with {type:'json'}




// let departmanSelectUL = document.getElementById('departmanSelectUL')
// let departmanSelect = document.getElementById('departmanSelect')

// let NewArray = []
// departmanSelectUL.style.display = 'none'

// document.addEventListener("click", function(event) {
//     var clickedElement = event.target;
//     if (clickedElement === departmanSelectUL || departmanSelect == clickedElement) {
//     } else {
//     departmanSelectUL.style.display = 'none'
//     }
// });

// let liClick = (event)=>{
//     departmanSelect.value = event.target.innerHTML
//     console.log(event.target.innerHTML)
    
// }

// let inputSelectFunc = (items ,currentValue)=>{
//     NewArray = []
//             const filteredItems = items.filter(item => item.toLowerCase().includes(currentValue.toLowerCase()));
            
//             NewArray = filteredItems.slice(0,10)
//             NewArray.forEach(item => {
//                 const listItem = document.createElement("li");
//                 listItem.className = 'inputSelectLi'
//                 listItem.textContent = item;
//                 listItem.onclick = function(event){
//                     liClick(event)
//                 }
//             departmanSelectUL.appendChild(listItem);
               
//             });
        
// }

// departmanSelect.addEventListener('input',()=>{
//     let currentValue = departmanSelect.value
//     departmanSelectUL.style.display = 'block'
    
//     departmanSelectUL.innerHTML = "";
//     inputSelectFunc(departmen, currentValue)
// })






















let categorySelectUL = document.getElementById('categorySelectUL')
let categorySelect = document.getElementById('categorySelect')

let NewArray2 = []
categorySelectUL.style.display = 'none'

document.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement === categorySelectUL || categorySelect == clickedElement) {
    } else {
        categorySelectUL.style.display = 'none'
    }
});

let liClick2 = (event)=>{
    categorySelect.value = event.target.innerHTML
    console.log(event.target.innerHTML)
    
}

let inputSelectFunc2 = (items ,currentValue)=>{
    NewArray2 = []
            const filteredItems = items.filter(item => item.toLowerCase().includes(currentValue.toLowerCase()));
            
            NewArray2 = filteredItems.slice(0,10)
            NewArray2.forEach(item => {
                const listItem = document.createElement("li");
                listItem.className = 'inputSelectLi'
                listItem.textContent = item;
                listItem.onclick = function(event){
                    liClick2(event)
                }
            categorySelectUL.appendChild(listItem);
               
            });
        
}


categorySelect.addEventListener('input',()=>{
    let currentValue = categorySelect.value
    categorySelectUL.style.display = 'block'
    
    categorySelectUL.innerHTML = "";
    inputSelectFunc2(category, currentValue)
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
        console.log('acılfı')
    } else {
        filterBox.style.display = 'none'
        console.log('kapandı')
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