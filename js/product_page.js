var currentLink = window.location.href
var currentPositionProduct = parseInt(currentLink.split('=').pop())
var img_product = document.querySelector("#img-product-detail")
var product_detail_name = document.querySelector(".product-detail-name")
var product_detail_sale_price = document.querySelector(".product-detail-sale-price")
var product_detail_sale_off = document.querySelector(".product-detail-sale-off")
var img_product_detail__mobile = document.querySelector("#img-product-detail__mobile")
var product_detail_actual_price = document.querySelector(".product-detail-actual-price")
var to_cart_icon = document.querySelector(".to-cart-icon")
var checkCart = false
var product_detail_to_cart = document.querySelector(".product-detail-to-cart")
var message_box = document.querySelector(".message-box")
var message_box_close = document.querySelector(".message-box-close")
var message_box_content = document.querySelector(".message-box-content")
if (localStorage.getItem("cart") == null) {
    var cart = []
} else {
    var cart = JSON.parse(localStorage.getItem("cart"))
}
var product_detail_flash_buy = document.querySelector(".product-detail-flash-buy")
// main process
ProductShow(currentPositionProduct)

product_detail_to_cart.addEventListener("click", function (e) {
    AddToCart()
    CartNumber()
})
product_detail_flash_buy.addEventListener("click", function (e) {
    AddToCart()
    CartNumber()
    window.open("cart.html")
})

// function
function ProductShow(i) {
    img_product.setAttribute("src", data_product[i].img_lsize)
    img_product_detail__mobile.setAttribute("src", data_product[i].img)
    product_detail_name.innerHTML = data_product[i].name
    product_detail_sale_price.innerHTML = data_product[i].sale_price
    if (data_product[i].sale_off != "") {
        product_detail_sale_off.innerHTML = data_product[i].sale_off
    }
    else {
        product_detail_sale_off.innerHTML = "Không áp dụng giảm giá"
    }
    if (data_product[i].actual_price != "") {
        product_detail_actual_price.innerHTML = data_product[i].actual_price
    }
    else {
        product_detail_actual_price.style.display = "none"
    }

}
function AddToCart() {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == data_product[currentPositionProduct].name) {
            checkCart = true
        }
    }
    if (!checkCart) {
        // cart animation
        to_cart_icon.style.display = "block"
        to_cart_icon.style.animation = "BoxToCart 1s linear forwards";
        setTimeout(function () {
            to_cart_icon.style.display = "none"
        }, 1000)
        // message animation
        message_box.style.display = "flex"
        message_box.style.animation = "messagebox 3s linear forwards";
        setTimeout(function () {
            message_box.style.display = "none"
        }, 3000)
        message_box_content.innerHTML = "Bạn đã thêm thành công sản phẩm vào giỏ hàng"
        // push data to LocalStorage
        cart.push(data_product[currentPositionProduct])
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    else {
        message_box.style.display = "flex"
        message_box.style.animation = "messagebox 3s linear forwards";
        setTimeout(function () {
            message_box.style.display = "none"
        }, 3000)
        message_box.style.borderLeft = "10px solid orange"
        message_box_content.innerHTML = "Sản phẩm đã có trong giỏ hàng"
    }
    CartNumber()
}
