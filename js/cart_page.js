//process cart data
if (localStorage.getItem('cart') != null) {
    var cart_data = JSON.parse(localStorage.getItem('cart'))
} else {
    var cart_data = []
}

var cart_content = document.querySelector(".cart-content")
var body = document.querySelector("body")
var pay_count_product = document.querySelector(".pay-count-product")
var cart_pay_total = document.querySelector(".cart-pay-total")
var checkCartBreak = false
var cart_user_control = document.querySelector(".cart-user-control")
var cart_user__mobile = document.querySelector(".cart-user__mobile")
var cart_user_control_icon = document.querySelector(".cart-user-control-icon")
var cart_user_count = 1
var cart_user_name = document.querySelector('#cart-user-name')
var cart_user_name__mobile = document.querySelector('#cart-user-name__mobile')
var cart_user_phone = document.querySelector('#cart-user-phone')
var cart_user_phone__mobile = document.querySelector('#cart-user-phone__mobile')
var cart_user_address = document.querySelector('#cart-user-address')
var cart_user_address__mobile = document.querySelector('#cart-user-address__mobile')
var cart_user_login_text = document.querySelectorAll('.cart-user-login')
if(sessionStorage.getItem('account')!=null){
   var SESSION__ACCOUNT = JSON.parse(sessionStorage.getItem('account'))
   cart_user_name.value = SESSION__ACCOUNT.name
   cart_user_phone.value = SESSION__ACCOUNT.phone
   cart_user_address.value = SESSION__ACCOUNT.address
   cart_user_name__mobile.value = SESSION__ACCOUNT.name
   cart_user_phone__mobile.value = SESSION__ACCOUNT.phone
   cart_user_address__mobile.value = SESSION__ACCOUNT.address
   cart_user_name.disabled = true
   cart_user_phone.disabled = true
   cart_user_address.disabled = true
   cart_user_name__mobile.disabled = true
   cart_user_phone__mobile.disabled = true
   cart_user_address__mobile.disabled = true
   cart_user_login_text[0].innerHTML = SESSION__ACCOUNT.name+" đã đăng nhập"
   cart_user_login_text[1].innerHTML = SESSION__ACCOUNT.name+" đã đăng nhập"
}
//main process
UpdateCart()
UpdateCartInfo()
//* add delete event
var cart_content_product = document.querySelectorAll(".cart-content-product")

// main events click
body.addEventListener("click", function (e) {
    if (!e.target.id == "" && e.target.id.split("-").shift() == "delete") {
        if (confirm("Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?"))
            DeleteProductFromCart(e.target.id.split('-').pop())
    }
    if (!e.target.id == "" && (e.target.id.split('-').shift() == "minus" || e.target.id.split('-').shift() == "plus")) {
        NumberOfProductCart(e.target.id.split('-').pop(), e.target.id.split('-').shift())
    }
    UpdateCartInfo()
})
// Cart user control
cart_user_control.addEventListener("click", function () {
    if (cart_user_count % 2 != 0) {
        cart_user_control_icon.style.transform = "rotate(180deg)"
        cart_user__mobile.style.transform = "translateX(0) translateY(-50%)"
    } else {
        cart_user_control_icon.style.transform = "rotate(0)"
        cart_user__mobile.style.transform = "translateX(100%) translateY(-50%)"
    }
    cart_user_count += 1
})
//keep info user
cart_user_name.addEventListener("input", function () {
    cart_user_name__mobile.value = cart_user_name.value

})
cart_user_phone.addEventListener("input", function () {
    cart_user_phone__mobile.value = cart_user_phone.value
})
cart_user_address.addEventListener("input", function () {
    cart_user_address__mobile.value = cart_user_address.value
})
cart_user_name__mobile.addEventListener("input", function () {
    cart_user_name.value = cart_user_name__mobile.value
})
cart_user_phone__mobile.addEventListener("input", function () {
    cart_user_phone.value = cart_user_phone__mobile.value
})
cart_user_address__mobile.addEventListener("input", function () {
    cart_user_address.value = cart_user_address__mobile.value
})
// see bill before payment

// build cart when zero
function CartZero() {
    var f0CartZeroDiv = document.createElement('div')
    var f1IconI = document.createElement('i')
    var f1TextSpan = document.createElement('span')
    var f1TextDiv = document.createElement('div')
    var f1LinkSpan = document.createElement('span')
    var f2LinkA = document.createElement('a')

    f0CartZeroDiv.setAttribute('class', 'cart-zero')
    f1IconI.setAttribute('class', 'fa-solid fa-cart-plus')
    f1TextSpan.innerHTML = "CHƯA CÓ MẶT HÀNG NÀO TRONG GIỎ HÀNG CỦA BẠN"
    f1TextDiv.innerHTML = "Còn rất nhiều mặt hàng ưu đãi sốc. Đừng bỏ lỡ!!!"
    f2LinkA.setAttribute("href", "../index.html")
    f2LinkA.innerHTML = "Quay về trang chủ ngay nào"
    //combine
    f1LinkSpan.appendChild(f2LinkA)
    f0CartZeroDiv.appendChild(f1IconI)
    f0CartZeroDiv.appendChild(f1TextSpan)
    f0CartZeroDiv.appendChild(f1TextDiv)
    f0CartZeroDiv.appendChild(f1LinkSpan)
    cart_content.appendChild(f0CartZeroDiv)
}
// build cart html
function CartBuilder(img, name, sale_price, sale_off, actual_price, cart_count, index) {
    // create element
    var f0Div = document.createElement("div")
    var f1CartImgDiv = document.createElement("div")
    var f1CartInfoDiv = document.createElement("div")

    var f2ProductImageImg = document.createElement("img")
    var f2InfoNameDiv = document.createElement("div")
    var f2InfoRateDiv = document.createElement("div")
    var f2InfoSalePriceDiv = document.createElement("div")
    var f2InfoSaleOffDiv = document.createElement("div")
    var f2InfoCartControlDiv = document.createElement("div")

    var f3ControlDeleteSpan = document.createElement("span")
    var f3IconRateI = document.createElement("i")
    var f3SaleOffSpan = document.createElement("span")
    var f3ActualPriceSpan = document.createElement("span")
    var f3ControlMinusButton = document.createElement("button")
    var f3ControlInput = document.createElement("input")
    var f3ControlPlusButton = document.createElement("button")

    //add attributes
    f0Div.setAttribute("class", "cart-content-product")
    //* Cart Product Image
    f1CartImgDiv.setAttribute("class", "cart-product-img")
    f1CartImgDiv.appendChild(f2ProductImageImg)
    //* Cart Product Info
    f1CartInfoDiv.setAttribute("class", "cart-product-info")
    f2InfoNameDiv.setAttribute("class", "cart-product-name")
    f2InfoRateDiv.setAttribute("class", "cart-product-rate")
    f2InfoSalePriceDiv.setAttribute("class", "cart-product-sale-price")
    f2InfoSaleOffDiv.setAttribute("class", "cart-sale-off")
    f2InfoCartControlDiv.setAttribute("class", "cart-product-control")

    f1CartInfoDiv.appendChild(f2InfoNameDiv)
    f1CartInfoDiv.appendChild(f2InfoRateDiv)
    f1CartInfoDiv.appendChild(f2InfoSalePriceDiv)
    f1CartInfoDiv.appendChild(f2InfoSaleOffDiv)
    f1CartInfoDiv.appendChild(f2InfoCartControlDiv)

    //** Cart Product Rate
    f3IconRateI.setAttribute("class", "fa-solid fa-star")
    f2InfoRateDiv.appendChild(f3IconRateI)
    f2InfoRateDiv.appendChild(f3IconRateI.cloneNode(true))
    f2InfoRateDiv.appendChild(f3IconRateI.cloneNode(true))
    f2InfoRateDiv.appendChild(f3IconRateI.cloneNode(true))
    f2InfoRateDiv.appendChild(f3IconRateI.cloneNode(true))
    //** cart sale off
    f3SaleOffSpan.setAttribute("class", "cart-product-sale-off")
    f3ActualPriceSpan.setAttribute("class", "cart-product-actual-price")
    f2InfoSaleOffDiv.appendChild(f3SaleOffSpan)
    f2InfoSaleOffDiv.appendChild(f3ActualPriceSpan)
    //** cart product control
    f3ControlMinusButton.setAttribute("class", "cart-minus")
    f3ControlInput.setAttribute("type", "text")
    f3ControlPlusButton.setAttribute("class", "cart-plus")
    f2InfoCartControlDiv.appendChild(f3ControlMinusButton)
    f2InfoCartControlDiv.appendChild(f3ControlInput)
    f2InfoCartControlDiv.appendChild(f3ControlPlusButton)
    //* delete cart product
    f3ControlDeleteSpan.setAttribute("class", "delete-cart-product")

    // Set data
    f2ProductImageImg.setAttribute("src", img)
    f2InfoNameDiv.innerHTML = name
    f2InfoSalePriceDiv.innerHTML = sale_price
    if (sale_off == "") {
        f3SaleOffSpan.innerHTML = "Không áp dụng giảm giá"
    } else {
        f3SaleOffSpan.innerHTML = sale_off
    }
    f3ActualPriceSpan.innerHTML = actual_price
    f3ControlInput.value = cart_count
    f3ControlInput.disabled = true
    f3ControlMinusButton.innerHTML = "-"
    f3ControlMinusButton.setAttribute("id", 'minus-' + index)
    f3ControlPlusButton.innerHTML = "+"
    f3ControlPlusButton.setAttribute("id", 'plus-' + index)
    f3ControlDeleteSpan.innerHTML = "Xóa mặt hàng "
    f3ControlDeleteSpan.setAttribute("id", "delete-" + index)
    f2InfoCartControlDiv.appendChild(f3ControlDeleteSpan)
    // combine together
    f0Div.appendChild(f1CartImgDiv)
    f0Div.appendChild(f1CartInfoDiv)
    cart_content.appendChild(f0Div)
}
// Delete Product Cart
function DeleteProductFromCart(idString) {
    var pos = parseInt(idString)
    cart_data.splice(pos, 1)
    UpdateCart()
    localStorage.setItem("cart", JSON.stringify(cart_data))
}
// Update Cart
function UpdateCart() {
    cart_content.innerHTML = ""
    for (var i = 0; i < cart_data.length; i++) {
        CartBuilder(cart_data[i].img,
            cart_data[i].name,
            cart_data[i].sale_price,
            cart_data[i].sale_off,
            cart_data[i].actual_price,
            cart_data[i].cart_count,
            i
        )
    }
}
function UpdateCartInfo() {
    //* check cart product count
    pay_count_product.innerHTML = cart_data.length
    //* if cart dont have any products
    if (cart_data.length == 0) {
        cart_content.innerHTML = ""
        CartZero()
        checkCartBreak = true
    }
    //* total money
    cart_pay_total.innerHTML = ProcessIntPriceToText(TotalMoney())
}
function NumberOfProductCart(idString, calc) {
    var pos = parseInt(idString)
    if (calc == "minus") {
        if (cart_data[pos].cart_count > 1) {
            cart_data[pos].cart_count -= 1
        }
    }
    else
        cart_data[pos].cart_count += 1
    UpdateCart()
    localStorage.setItem("cart", JSON.stringify(cart_data))
}
// check total money
function TotalMoney() {
    var total = 0
    for (var i = 0; i < cart_data.length; i++) {
        total = total + (ProcessTextPriceToInt(cart_data[i].sale_price) * cart_data[i].cart_count)
    }
    return total
}

// Change price text to price can calculate
function ProcessTextPriceToInt(price_text) {
    var val = ""
    price_text = price_text.split(".")
    for (var i = 0; i < price_text.length; i++) {
        val = val + price_text[i]
    }
    return parseInt(val.split("đ")[0])
}
// Change price text to price can calculate
function ProcessIntPriceToText(price_int) {
    var valReverse = ""
    var val = ""
    price_int = price_int.toString()
    var count = 1
    for (var i = price_int.length - 1; i >= 0; i--) {
        valReverse = valReverse + price_int[i]
        if (count % 3 == 0 && i > 0) {
            valReverse = valReverse + "."
        }
        count += 1
    }
    for (var i = valReverse.length - 1; i >= 0; i--) {
        val = val + valReverse[i]
        if (i == 0) {
            val = val + "đ"
        }
    }
    return val
}
function GetTimeText() {
    var timeText = ""
    var today = new Date()
    timeText = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return timeText
}

// Save info user when onfocusout
function SavePaymentHistory(customer_name, customer_phone, customer_address, cart, total_price) {
    var today = new Date()
    var idPay = today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear() + "" + (JSON.parse(localStorage.getItem('payment_history')).length + 1)
    var status = "processing"
    var timePay = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    PAYMENT_HISTORY__SERVER.push({
        idPay,
        customer_name,
        customer_phone,
        customer_address,
        cart,
        total_price,
        timePay,
        status
    })
    localStorage.setItem("payment_history", JSON.stringify(PAYMENT_HISTORY__SERVER))
}