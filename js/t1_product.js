
// img
var t1_img_1 = document.querySelector(".t1-img-1")
var t1_img_2 = document.querySelector(".t1-img-2")
var t1_img_3 = document.querySelector(".t1-img-3")
var t1_img_4 = document.querySelector(".t1-img-4")
var t1_img_5 = document.querySelector(".t1-img-5")
// name product
var t1_info_1 = document.querySelector(".t1-info-1")
var t1_info_2 = document.querySelector(".t1-info-2")
var t1_info_3 = document.querySelector(".t1-info-3")
var t1_info_4 = document.querySelector(".t1-info-4")
var t1_info_5 = document.querySelector(".t1-info-5")
// price sale
var t1_ps_1 = document.querySelector(".t1-ps-1")
var t1_ps_2 = document.querySelector(".t1-ps-2")
var t1_ps_3 = document.querySelector(".t1-ps-3")
var t1_ps_4 = document.querySelector(".t1-ps-4")
var t1_ps_5 = document.querySelector(".t1-ps-5")
// price actual
var t1_pa_1 = document.querySelector(".t1-pa-1")
var t1_pa_2 = document.querySelector(".t1-pa-2")
var t1_pa_3 = document.querySelector(".t1-pa-3")
var t1_pa_4 = document.querySelector(".t1-pa-4")
var t1_pa_5 = document.querySelector(".t1-pa-5")
// sales off
var t1_so_1 = document.querySelector(".t1-so-1")
var t1_so_2 = document.querySelector(".t1-so-2")
var t1_so_3 = document.querySelector(".t1-so-3")
var t1_so_4 = document.querySelector(".t1-so-4")
var t1_so_5 = document.querySelector(".t1-so-5")

// set array
var t1_img_arr = [t1_img_1, t1_img_2, t1_img_3, t1_img_4, t1_img_5]
var t1_info_arr = [t1_info_1, t1_info_2, t1_info_3, t1_info_4, t1_info_5]
var t1_ps_arr = [t1_ps_1, t1_ps_2, t1_ps_3, t1_ps_4, t1_ps_5]
var t1_pa_arr = [t1_pa_1, t1_pa_2, t1_pa_3, t1_pa_4, t1_pa_5]
var t1_so_arr = [t1_so_1, t1_so_2, t1_so_3, t1_so_4, t1_so_5]
// set data title 1 product





// title 1 product control button
var t1_product_arrow_left = document.querySelector(".t1-product-arrow-left")
var t1_product_arrow_right = document.querySelector(".t1-product-arrow-right")
var t1_product_item = document.querySelector(".t1-product-item")
var currentPos = 0
var t1_link = document.querySelectorAll(".t1-link")
ShowProductItemTitle1(currentPos) // show default
CheckPosition(currentPos)

t1_product_arrow_right.addEventListener("click", function () {
    if (currentPos == data_product.length - 5) {
        CheckPosition(currentPos)
    }
    else {
        currentPos = currentPos + 1
        ShowProductItemTitle1(currentPos)
        CheckPosition(currentPos)
    }
})
t1_product_arrow_left.addEventListener("click", function () {
    if (currentPos == 0) {
        CheckPosition(currentPos)
    }
    else {
        currentPos = currentPos - 1
        ShowProductItemTitle1(currentPos)
        CheckPosition(currentPos)
    }
})


//function

function ShowProductItemTitle1(currentPos) {
    var currentProduct = 0
    for (var i = currentPos; i < currentPos + 5; i++) {
        t1_img_arr[currentProduct].setAttribute("src", data_product[i].img)
        t1_info_arr[currentProduct].innerHTML = data_product[i].name
        t1_ps_arr[currentProduct].innerHTML = data_product[i].sale_price
        t1_pa_arr[currentProduct].innerHTML = data_product[i].actual_price
        var link = "../htdocs/product.html?product="+i
        t1_link[currentProduct].setAttribute("href", link)
        if(data_product[i].sale_off == ""){
            t1_so_arr[currentProduct].style.opacity=0;
        }
        else{
            t1_so_arr[currentProduct].style.opacity=1;
            t1_so_arr[currentProduct].innerHTML = data_product[i].sale_off
        }
        currentProduct = currentProduct + 1
    }
}
function CheckPosition(n) {
    if (n == 0) {
        t1_product_arrow_left.style.opacity = 0;
        t1_product_arrow_right.style.opacity = 1;
    }
    else {
        t1_product_arrow_left.style.opacity = 1;
        t1_product_arrow_right.style.opacity = 1;
        if (n == data_product.length - 5) {
            t1_product_arrow_right.style.opacity = 0;
        }
    }
}