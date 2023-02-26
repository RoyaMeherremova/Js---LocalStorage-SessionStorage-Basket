"use strict";

let tableBody = document.querySelector("tbody");





let products = JSON.parse(localStorage.getItem("basket"));   //localStoragden datalari goturuk
if (products != null) {       //eyer storagede data varsa ele yoxdusa yox
    for (const product of products) {                //hemin datalari saliriq arraye ve onlarin sayi geder table tagine -td elave edirik
        tableBody.innerHTML += `<tr>
        <td><img src="${product.img}" alt=""></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td><span class="minus">-</span><span>${product.count}</span><span class="plus">+</span></td>
        <td><i class="fa-solid fa-xmark"></i></td>
        <td class="d-none">${product.id}</td>
        </tr>`
    }

    getBasketCount(products)
    totalPrice(products);




} else {
    document.querySelector("table").classList.add("d-none")
    document.querySelector(".alert-warning").classList.remove("d-none");
    document.querySelector(".total h3").classList.add("d-none")
    document.querySelector("#basket .clear .clear-button").classList.add("d-none")
}

function getBasketCount(arr) {       //sebet iconun ustundeki sup tagin deyeri storagden gelen data sayi ile eyni olsun
    let sum = 0;
    for (const item of arr) {       //eyer eyni datadan coxdursa onun countunuda hesablasin
        sum += item.count;
    }
    document.querySelector("sup").innerText = sum;
    // document.querySelector("sup").innerText=arr.length;
}


//DELETE DATA FROM BASKET


let deleteIcons = document.querySelectorAll("tbody tr td i");


for (const icon of deleteIcons) {

    icon.addEventListener("click", function () {
        console.log(icon.nextElementSibling)

        let temp = products.filter(m => m.id != icon.parentNode.nextElementSibling.innerText); //yeni array yaradiram  hansi silmek istediyim data yoxdu icinde ve  silmek istediyim elementde delete-iconla siblinqle catiram
        products = temp;                 //sonra storagedeki arrayi essayn edirem yeni arraye hansindaki o data yoxdur

        localStorage.setItem("basket", JSON.stringify(products))   //ve gonderirem tekrara storage
        window.location.reload();           //refresh ediremki silinen data UI-da qalmasin
        if (products.length == 0) {          //eger storagede data yoxdursa, yeni localimizda productumuzun(basketimizin) length sifirdirsa localdan productumuzun keyini oradan sil
            localStorage.clear();
        }



    })

}







function totalPrice(arr) {     //function-komeyi ile butun mehsullarin toplam giymetin tapiriq
    let sum = 0;
    for (const item of arr) {
        sum += parseInt(item.price) * parseInt(item.count)   //parse edib localdaki datanin qiymetini,vururuq o qiymeti hemin mehsulusun sayina ki sayina uyqun qiymet elde edek
    }



    document.querySelector(".total h3").innerHTML += `<span>${sum} AU$</span>`   //ve butun umumi toplami yazdiriq var olan h -tagine

}


let minusIcons = document.querySelectorAll("tbody tr td .minus");


for (const icon of minusIcons) {           //minus icona basanda gedib mehsulun hem UI-daki sayini hemde local storagdaki sayini azaldiriq hemin mehsulun

    icon.addEventListener("click", function () {    //minus icona basanda
        for (const product of products) {          //localstoragedaki datalari fora salaq

            if (product.id == icon.parentNode.nextElementSibling.nextElementSibling.innerText) {   //hemin minus icona uyqun productu idisine gore tapaq
                if (icon.nextElementSibling.innerText == 0) {          //eyer count 0-disa functionu dayandiraq
                    return;

                }

                icon.nextElementSibling.innerText--;                   //UI-daki sayi azaldaq
                product.count--;                                       //ve localstoragdeka hemin productun sayini azaldaq
            }

        } 
        totalPrice(products)            //ve cem qiymeti hesablayan functiona yeni array gonderey
        window.location.reload();        //hazir refres etmek ucun Totalda kohne qiymet qalmasin deye
        localStorage.setItem("basket", JSON.stringify(products))   //localstorage yenilenmis array yerlesdirek
    })

}


let plusIcons = document.querySelectorAll("tbody tr td .plus"); //plus icon basanda gedib mehsulun hem UI-daki sayini hemde local storagdaki sayini coxaldiriq 


for (const icon of plusIcons) {

    icon.addEventListener("click", function () {

        for (const product of products) {

            if (product.id == icon.parentNode.nextElementSibling.nextElementSibling.innerText) {    //hemin plus icona uyqun productu idisine gore tapaq
                icon.previousElementSibling.innerText++;
                product.count++;
            }

        }
        totalPrice(products)             //ve cem qiymeti hesablayan functiona yeni array gonderey
        window.location.reload();        //hazir refres etmek ucun Totalda kohne qiymet qalmasin deye
        localStorage.setItem("basket", JSON.stringify(products))   //localstorage yenilenmis array yerlesdirek
    })

}

let btnClearAll = document.querySelector("#basket .clear .clear-button")

btnClearAll.addEventListener("click",function(){
    localStorage.clear();
    window.location.reload();
})





































