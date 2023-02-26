"use strict";

//LOCAL-STORAGE in inspect-Application-Local storage


// localStorage.setItem("name","Cavid")  //localStorage.setItem("key","Value")-Local storage data yerslesdirmey ucun.
// localStorage.setItem("surname","Ismayilzade");

// console.log(localStorage.getItem("name"))  //localStorage.getItem("key")-storageden datani goturmek ucun valusunu.

// //ikidene eyni adda key olarsa override edecek biri qalacaq.
// //daxil etdiyin key ve valunu yalniz sen silende silinir

// localStorage.removeItem("name"); //datani silmek ucun storageden

// localStorage.clear();  //storageden herseyi silir 


// let names =["Pervin","Elekber","Aqsin"];

// localStorage.setItem("names",JSON.stringify(names))     //JSON.stringify-bu komek edir array seklinde  storage data yerlesidirmeye


// console.log(JSON.parse(localStorage.getItem("names")));   //JSON.parse()-bu komek edir datani array seklinde goturmeye,bunsuz string kimi verecek arrayi bize





// document.querySelector("button").onclick = function(){

//     // localStorage.removeItem("name")

//     let datas =JSON.parse(localStorage.getItem("names"));
//     for (const item of datas) {
//         console.log(item)
//     }

// }



//SESSION-STORAGE =LOCAL-STORAGE (ferqleri tabi baglayanda Sesion storagede data qalmir  )


// sessionStorage.setItem("email","testEmail@gmail.com");

// console.log(sessionStorage.getItem("email"));



//BASKET

let cardBtns = document.querySelectorAll("#shop a")

let products = [];

if (localStorage.getItem("basket") != null) {
    products = JSON.parse(localStorage.getItem("basket"))
}

cardBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();    //a-tagin default-eventesini silmek

        let productImg = this.parentNode.previousElementSibling.getAttribute("src");

        let productName = this.parentNode.firstElementChild.innerText;

        let productDesc = this.previousElementSibling.previousElementSibling.innerText;

        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

        let productPrice= this.previousElementSibling.innerText;

        let existProduct = products.find(m => m.id == productId)    //arrayin icinde gelen yeni datadan varmi tapir

        if (existProduct != undefined) {

            existProduct.count += 1;

        } else {
            products.push({       //anonim object yaradib bu objecti qoyuruq yuxarda bos teyin elediyimiz arraye
                id: productId,
                name: productName,
                img: productImg,
                description: productDesc,
                price:productPrice,
                count: 1
            })
           

        }
        localStorage.setItem("basket", JSON.stringify(products))  //local storage "basket" adi altinda array yerselsiririem icinde object
         
        getBasketCount(products)
    })

});

function getBasketCount(arr){       //sebet iconun ustundeki sup tagin deyeri storagden gelen data sayi ile eyni olsun
       let sum=0;
       for (const item of arr) {       //eyer eyni datadan coxdursa onun countunuda hesablasin
        sum+=item.count;
       }
      document.querySelector("sup").innerText=sum;
        // document.querySelector("sup").innerText=arr.length;
    }
    getBasketCount(products)
    