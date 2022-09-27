// call popup
var call = document.querySelector(".call");
var contact_hv = document.querySelector(".contact-hv")
var search_fc = document.querySelector(".search-fc")
var search = document.querySelector("#search-menu")
var tablet = window.matchMedia("(max-width: 1240px)")
var menu_icon__mobile = document.querySelector(".menu-icon__mobile")
var menu_item_close__mobile = document.querySelector(".menu-item-close__mobile")
var menu__mobile = document.querySelector(".menu__mobile")
var overplay = document.querySelector(".overplay")
var navSearchItems = document.querySelector(".nav-search-items")
var session_login = document.querySelector(".session-login")

if (sessionStorage.getItem('account') != null) {
    session_login.innerHTML = ((JSON.parse(sessionStorage.getItem('account'))).name)
    session_login.style.textDecoration = 'underline'
}



call.addEventListener("mouseover", function () {
    contact_hv.style.display = "block"
})
call.addEventListener("mouseout", function () {
    contact_hv.style.display = "none"
})
// search popup 
search.addEventListener("input", function () {
    if (search.value.length != 0) {
        search_fc.style.display = "block"
        navSearchItems.innerHTML = ""
        SearchProduct(search.value)
        if (navSearchItems.innerHTML == "") {
            navSearchItems.innerHTML = "<div>Không có mặt hàng <span class='bold-value'>'" + search.value + "'</span> nào!!</div>"
        }
    }
    else {
        search_fc.style.display = "none"
    }
})
var search_close = function () {
    if (tablet.matches) {
        search_fc.style.display = "none"
    }
}
setInterval(search_close)
//menu mobile pop up
overplay.addEventListener("click", function () {
    menu__mobile.style.display = "none"
})
menu_item_close__mobile.addEventListener("click", function () {
    menu__mobile.style.display = "none"
})
menu_icon__mobile.addEventListener("click", function () {
    menu__mobile.style.display = "block"
})
//cart number
CartNumber()
// functions
function CartNumber() {
    var nav_cart_number = document.querySelector(".nav-cart-number")
    if (localStorage.getItem("cart") == null) {
        nav_cart_number.innerHTML = 0
    }
    else {
        nav_cart_number.innerHTML = (JSON.parse(localStorage.getItem("cart"))).length
    }
}
// Search product
function SearchProduct(inputvalue) {
    for (var i = 0; i < data_product.length; i++) {
        if ((data_product[i].name).toLowerCase().includes(inputvalue.toLowerCase())) {
            NavSearch(data_product[i].img,
                data_product[i].name,
                data_product[i].sale_off,
                data_product[i].sale_price,
                inputvalue,
                i)
        }
    }
}
var localhref = window.location.href
localhref.includes("product")
//build HTML nav search
function NavSearch(img, name, sale_off, sale_price, input_value, index) {
    var f0LinkA = document.createElement("a")
    var f1ItemDiv = document.createElement("div")
    var f2ItemImageDiv = document.createElement("div")
    var f3ImageImg = document.createElement("img")
    var f2ItemInfoDiv = document.createElement("div")
    var f3ItemNameDiv = document.createElement("div")
    var f3SaleOffSpan = document.createElement("span")
    var f3SalePriceSpan = document.createElement("span")

    //set Attribute
    if (localhref.includes("product")) {
        var link = "product.html?product="
    } else {
        var link = "htdocs/product.html?product="
    }

    f0LinkA.setAttribute("href", link + index)
    f1ItemDiv.setAttribute("class", "nav-search-item")
    f2ItemImageDiv.setAttribute("class", "nav-item-image")
    f2ItemInfoDiv.setAttribute("class", "nav-item-info")
    f3ImageImg.setAttribute("src", img)
    f3ItemNameDiv.setAttribute("class", "nav-item-name")
    f3SaleOffSpan.setAttribute("class", "nav-item-sale-off")
    f3SalePriceSpan.setAttribute("class", "nav-item-sale-price")

    //combine

    f2ItemImageDiv.appendChild(f3ImageImg)
    f2ItemInfoDiv.append(f3ItemNameDiv)
    f2ItemInfoDiv.append(f3SaleOffSpan)
    f2ItemInfoDiv.append(f3SalePriceSpan)
    f1ItemDiv.appendChild(f2ItemImageDiv)
    f1ItemDiv.appendChild(f2ItemInfoDiv)
    f0LinkA.appendChild(f1ItemDiv)
    navSearchItems.appendChild(f0LinkA)
    //data
    if (input_value.length > 1) {
        var inputText = new RegExp(input_value, "gi")
        var arrMatchName = name.match(inputText)
        if (arrMatchName != 0) {
            for (var i = 0; i < arrMatchName.length; i++) {
                var replaceText = "<span class='search-value'>" + arrMatchName[i] + "</span>"
                var name = name.replace(arrMatchName[i], replaceText)
            }
        }
    }

    f3ItemNameDiv.innerHTML = name
    if (sale_off != "") {
        f3SaleOffSpan.innerHTML = sale_off
    } else {
        f3SaleOffSpan.style.display = "none"
    }

    f3SalePriceSpan.innerHTML = sale_price
    //process value 

}
var nhac = "Ơ kìa bé Nhạc"
console.log(nhac.replace("Nhạc", "Long"))