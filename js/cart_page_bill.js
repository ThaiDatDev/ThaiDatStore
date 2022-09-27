var cart_pay_receipt = document.querySelector(".cart-pay-receipt")
var cart_bill = document.querySelector(".cart-bill")
var cart_extention = document.querySelector(".cart-extention")
var cart_pay = document.querySelector(".cart-pay")
var cart_bill_products = document.querySelector(".cart-bill-products")
var alert_message = document.querySelector(".alert-message")
var checkCartPay = true

cart_pay_receipt.addEventListener('click', function () {
    if (cart_data.length != 0) {
        if (cart_user_name.value != "" && cart_user_phone.value != "" && cart_user_address.value != "") {
            cart_extention.style.display = "flex"
            cart_bill_products.innerHTML = ""
            BillCart(cart_user_name.value, cart_user_phone.value, cart_user_address.value)
        }
        else {
            alert("Hãy điền đầy đủ thông tin của bạn!")
        }
    } else {
        alert("Giỏ hàng của bạn đang trống!")
    }


})

cart_pay.addEventListener('click', function () {
    if (cart_data.length != 0) {
        if (cart_user_name.value != "" && cart_user_phone.value != "" && cart_user_address.value != "") {
            cart_bill_products.innerHTML = ""
            BillCart(cart_user_name.value, cart_user_phone.value, cart_user_address.value)
            //download bill image
            if (confirm("Bạn muốn in hóa đơn không?")) {
                cart_extention.style.display = "flex"
                var nameImg = "thaidatstore_"
                var today = new Date()
                nameImg = nameImg + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
                domtoimage.toBlob(cart_bill)
                    .then(function (blob) {
                        window.saveAs(blob, nameImg);
                    });

            }
            checkCartPay = false
        }
        else {
            alert("Hãy điền đầy đủ thông tin của bạn!")
        }
        if (checkCartPay == false) {
            checkCartPay = true
            // take data payment to admin page
            SavePaymentHistory(cart_user_name.value,
                cart_user_phone.value,
                cart_user_address.value,
                cart_data,
                ProcessIntPriceToText(TotalMoney()))
            // reset cart
            cart_data = []
            localStorage.setItem("cart", JSON.stringify(cart_data))
            UpdateCartInfo()
            //Alert
            alert_message.style.display = "block"
            setTimeout(function () {
                alert_message.style.display = "none"
            }, 7000)
        }
    } else {
        alert("Giỏ hàng của bạn đang trống!!")
    }

})

cart_extention.addEventListener("click", function (e) {
    if (e.target == cart_extention) {
        cart_extention.style.display = "none"
    }
})
// build bill html
function BillCart(user_name, user_phone, user_address) {
    var bill_info_name = document.querySelector(".bill-info-name")
    var bill_info_phone = document.querySelector(".bill-info-phone")
    var bill_info_address = document.querySelector(".bill-info-address")
    var total_price = document.querySelector(".total-price")
    var bill_date = document.querySelector(".bill-date")
    for (var i = 0; i < cart_data.length; i++) {
        BillProduct(cart_data[i].name,
            cart_data[i].cart_count,
            cart_data[i].sale_price)
    }
    bill_info_name.innerHTML = user_name
    bill_info_phone.innerHTML = user_phone
    bill_info_address.innerHTML = user_address
    total_price.innerHTML = ProcessIntPriceToText(TotalMoney())
    bill_date.innerHTML = GetTimeText()
}
//build bill products in cart
function BillProduct(name, cart_count, price) {
    var f0BillProductDiv = document.createElement("div")
    var f1BillNameDiv = document.createElement("div")
    var f1BillCountDiv = document.createElement("div")
    var f1BillPriceDiv = document.createElement("div")

    f0BillProductDiv.setAttribute("class", "cart-bill-product")
    f1BillNameDiv.setAttribute("class", "cart-bill-product-name")
    f1BillCountDiv.setAttribute("class", "cart-bill-product-count")
    f1BillPriceDiv.setAttribute("class", "cart-bill-product-price")

    f0BillProductDiv.appendChild(f1BillNameDiv)
    f0BillProductDiv.appendChild(f1BillCountDiv)
    f0BillProductDiv.appendChild(f1BillPriceDiv)
    cart_bill_products.appendChild(f0BillProductDiv)

    f1BillNameDiv.innerHTML = name
    f1BillCountDiv.innerHTML = "x" + cart_count
    f1BillPriceDiv.innerHTML = ProcessIntPriceToText(ProcessTextPriceToInt(price) * cart_count)
}
function GetTimeText() {
    var timeText = ""
    var today = new Date()
    timeText = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return timeText
}


