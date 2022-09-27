if (localStorage.getItem("payment_history") != null) {
    var arrPaymentHistory = JSON.parse(localStorage.getItem("payment_history"))
}
else {
    var arrPaymentHistory = []
}
console.log(arrPaymentHistory)
var all_bill_content = document.querySelector("#lb-ab")
var processing_bill_content = document.querySelector("#lb-pb")
var success_bill_content = document.querySelector("#lb-sb")
var reject_bill_content = document.querySelector("#lb-rb")
var admin_chart = document.querySelector(".admin-chart")
var admin_table_title = document.querySelector(".admin-table-title")
var conlusion = document.querySelector("#lb-c")
var admin_table_bills = document.querySelector(".admin-table-bills")
// var control
var content_page = "all"
//chart
var ci_processing = document.querySelector(".ci-processing")
var ci_success = document.querySelector(".ci-success")
var ci_reject = document.querySelector(".ci-reject")
var chart_mode = document.querySelector("#chart-mode")
var number_reject = 0, number_success = 0, number_processing = 0
var total_money_reject = 0, total_money_success = 0, total_money_processing = 0
var number_max = 0, money_max = 0
var max_height = 250

admin_table_bills.innerHTML = ""
admin_table_title.style.display = "none"
admin_chart.style.display = "block"


// column chart
chart_mode.addEventListener("change", function () {
    NumberBillUpdate()
    MoneyBillUpdate()
    ShowChart()
    console.log("vao")
})

//main process
ShowAllBillAdmin()
NumberBillUpdate()
admin_table_bills.addEventListener("click", function (e) {
    if (e.target.id.split("-")[0] == "status") {
        var id = e.target.id
        var idPos = parseInt(id.split("-")[1])
        var status = document.querySelector("#" + id)
        console.log(status)
        status.onchange = function () {
            arrPaymentHistory[idPos].status = status.value
            console.log(arrPaymentHistory[idPos].status)
            UpdatePayment()
            if (content_page == "all")
                ShowAllBillAdmin()
            if (content_page == "processing")
                ShowProcessingBillAdmin()
            if (content_page == "success")
                ShowSuccessBillAdmin()
            if (content_page == "reject")
                ShowRejectBillAdmin()
            NumberBillUpdate()
        }
    }
})
all_bill_content.addEventListener("click", function () {
    ShowAllBillAdmin()
})
processing_bill_content.addEventListener("click", function () {
    ShowProcessingBillAdmin()
})
success_bill_content.addEventListener("click", function () {
    ShowSuccessBillAdmin()
})
reject_bill_content.addEventListener("click", function () {
    ShowRejectBillAdmin()
})
conlusion.addEventListener("click", function () {
    admin_table_bills.innerHTML = ""
    admin_table_title.style.display = "none"
    admin_chart.style.display = "block"
    setTimeout(function () {
        NumberBillUpdate()
        MoneyBillUpdate()
        ShowChart()
    }, 200)

})
//functions
function ShowAllBillAdmin() {
    admin_table_bills.innerHTML = ""
    admin_table_title.style.display = "grid"
    admin_chart.style.display = "none"
    for (var i = 0; i < arrPaymentHistory.length; i++) {
        BillAdminRowsHtml(arrPaymentHistory[i].idPay,
            arrPaymentHistory[i].customer_name,
            arrPaymentHistory[i].customer_phone,
            arrPaymentHistory[i].customer_address,
            arrPaymentHistory[i].timePay,
            arrPaymentHistory[i].total_price,
            arrPaymentHistory[i].status,
            i
        )
    }
    content_page = "all"
}
function ShowProcessingBillAdmin() {
    admin_table_bills.innerHTML = ""
    admin_table_title.style.display = "grid"
    admin_chart.style.display = "none"
    for (var i = 0; i < arrPaymentHistory.length; i++) {
        if (arrPaymentHistory[i].status == "processing")
            BillAdminRowsHtml(arrPaymentHistory[i].idPay,
                arrPaymentHistory[i].customer_name,
                arrPaymentHistory[i].customer_phone,
                arrPaymentHistory[i].customer_address,
                arrPaymentHistory[i].timePay,
                arrPaymentHistory[i].total_price,
                arrPaymentHistory[i].status,
                i
            )
    }
    content_page = "processing"
}
function ShowSuccessBillAdmin() {
    admin_table_bills.innerHTML = ""
    admin_table_title.style.display = "grid"
    admin_chart.style.display = "none"
    for (var i = 0; i < arrPaymentHistory.length; i++) {
        if (arrPaymentHistory[i].status == "success")
            BillAdminRowsHtml(arrPaymentHistory[i].idPay,
                arrPaymentHistory[i].customer_name,
                arrPaymentHistory[i].customer_phone,
                arrPaymentHistory[i].customer_address,
                arrPaymentHistory[i].timePay,
                arrPaymentHistory[i].total_price,
                arrPaymentHistory[i].status,
                i
            )
        content_page = "success"

    }

}
function ShowRejectBillAdmin() {
    admin_table_bills.innerHTML = ""
    admin_table_title.style.display = "grid"
    admin_chart.style.display = "none"
    for (var i = 0; i < arrPaymentHistory.length; i++) {
        if (arrPaymentHistory[i].status == "reject")
            BillAdminRowsHtml(arrPaymentHistory[i].idPay,
                arrPaymentHistory[i].customer_name,
                arrPaymentHistory[i].customer_phone,
                arrPaymentHistory[i].customer_address,
                arrPaymentHistory[i].timePay,
                arrPaymentHistory[i].total_price,
                arrPaymentHistory[i].status,
                i
            )
        content_page = "reject"
    }

}
function BillAdminRowsHtml(id, name, phone, address, time, total, status, index, count) {
    var f0Div = document.createElement("div")
    var f1IdDiv = document.createElement("div")
    var f1NameDiv = document.createElement("div")
    var f1PhoneDiv = document.createElement("div")
    var f1AddressDiv = document.createElement("div")
    var f1TimeDiv = document.createElement("div")
    var f1DetailDiv = document.createElement("div")
    var f1TotalDiv = document.createElement("div")
    var f1StatusDiv = document.createElement("div")
    var f2StatusSpan = document.createElement("span")
    var f2Select = document.createElement('select')
    var f3StatusIconI = document.createElement("i")
    var f3ProcessOption = document.createElement("option")
    var f3SuccessOption = document.createElement("option")
    var f3RejectOption = document.createElement("option")
    //set attribute 
    f1StatusDiv.setAttribute("class", "admin-status")
    // f1StatusDiv.setAttribute("id", "status-" + index)
    f0Div.setAttribute("class", "admin-table-bill")
    f3ProcessOption.setAttribute("value", "processing")
    f3SuccessOption.setAttribute("value", "success")
    f3RejectOption.setAttribute("value", "reject")
    f3StatusIconI.setAttribute("class", "fa-solid fa-circle")
    f2Select.setAttribute("class", "no-border")
    // f2Select.setAttribute("id", "status-select-" + index)
    // combine
    f0Div.appendChild(f1IdDiv)
    f0Div.appendChild(f1NameDiv)
    f0Div.appendChild(f1PhoneDiv)
    f0Div.appendChild(f1AddressDiv)
    f0Div.appendChild(f1TimeDiv)
    f0Div.appendChild(f1DetailDiv)
    f0Div.appendChild(f1TotalDiv)
    f0Div.appendChild(f1StatusDiv)
    f2StatusSpan.appendChild(f3StatusIconI)
    f2Select.appendChild(f3ProcessOption)
    f2Select.appendChild(f3SuccessOption)
    f2Select.appendChild(f3RejectOption)
    f1StatusDiv.appendChild(f2StatusSpan)
    f1StatusDiv.appendChild(f2Select)

    //set id
    f2Select.setAttribute("id", "status-" + index)
    if (count % 2 == 0) {
        f0Div.style.backgroundColor = "rgb(250, 220, 220)"
    }
    admin_table_bills.appendChild(f0Div)
    f1IdDiv.innerHTML = id
    f1NameDiv.innerHTML = name
    f1PhoneDiv.innerHTML = phone
    f1AddressDiv.innerHTML = address
    f1TimeDiv.innerHTML = time
    f1DetailDiv.innerHTML = "Chi tiết"
    f1DetailDiv.setAttribute("class", "admin-detail")
    f1DetailDiv.setAttribute("id", "detail-" + index)
    f1TotalDiv.innerHTML = total
    f3ProcessOption.innerHTML = "Processing"
    f3SuccessOption.innerHTML = "Success"
    f3RejectOption.innerHTML = "Reject"

    if (status == "processing") {
        f3ProcessOption.selected = true
        f3StatusIconI.style.color = "orange"
        f0Div.style.backgroundColor = "rgb(255, 203, 134)"
    }
    if (status == "success") {
        f3SuccessOption.selected = true
        f3StatusIconI.style.color = "green"
        f0Div.style.backgroundColor = "rgb(170, 255, 170)"
    }
    if (status == "reject") {
        f3RejectOption.selected = true
        f3StatusIconI.style.color = "red"
        f0Div.style.backgroundColor = "rgb(253, 128, 128)"
    }

}
function UpdatePayment() {
    localStorage.setItem("payment_history", JSON.stringify(arrPaymentHistory))
}
function ShowChart() {
    var processing_numb = document.querySelector(".processing-numb")
    var success_numb = document.querySelector(".success-numb")
    var reject_numb = document.querySelector(".reject-numb")
    if (chart_mode.value == "number") {
        ci_processing.style.paddingTop = (number_processing / number_max) * max_height + "px"
        ci_success.style.paddingTop = (number_success / number_max) * max_height + "px"
        ci_reject.style.paddingTop = (number_reject / number_max) * max_height + "px"

        processing_numb.innerHTML = number_processing
        success_numb.innerHTML = number_success
        reject_numb.innerHTML = number_reject
    }
    else {
        ci_processing.style.paddingTop = (total_money_processing / money_max) * max_height + "px"
        ci_success.style.paddingTop = (total_money_success / money_max) * max_height + "px"
        ci_reject.style.paddingTop = (total_money_reject / money_max) * max_height + "px"

        processing_numb.innerHTML = ProcessIntPriceToText(total_money_processing)
        success_numb.innerHTML = ProcessIntPriceToText(total_money_success)
        reject_numb.innerHTML = ProcessIntPriceToText(total_money_reject)
    }

}
function NumberBillUpdate() {
    var all_num = document.querySelector(".all-num")
    var processing_num = document.querySelector(".processing-num")
    var success_num = document.querySelector(".success-num")
    var reject_num = document.querySelector(".reject-num")

    var all = 0
    var processing = 0
    var success = 0
    var reject = 0

    for (var i = 0; i < arrPaymentHistory.length; i++) {
        all += 1
        if (arrPaymentHistory[i].status == "processing")
            processing += 1
        if (arrPaymentHistory[i].status == "success")
            success += 1
        if (arrPaymentHistory[i].status == "reject")
            reject += 1
    }

    number_processing = processing
    number_success = success
    number_reject = reject
    number_max = Math.max(number_processing, number_success, number_reject)

    all_num.innerHTML = all

    processing_num.innerHTML = processing
    success_num.innerHTML = success
    reject_num.innerHTML = reject
}
function MoneyBillUpdate() {
    var total_processing = 0, total_success = 0, total_reject = 0
    for (var i = 0; i < arrPaymentHistory.length; i++) {
        if (arrPaymentHistory[i].status == "processing")
            total_processing += ProcessTextPriceToInt(arrPaymentHistory[i].total_price)
        if (arrPaymentHistory[i].status == "success")
            total_success += ProcessTextPriceToInt(arrPaymentHistory[i].total_price)
        if (arrPaymentHistory[i].status == "reject")
            total_reject += ProcessTextPriceToInt(arrPaymentHistory[i].total_price)
    }
    total_money_processing = total_processing
    total_money_success = total_success
    total_money_reject = total_reject
    money_max = Math.max(total_processing, total_success, total_reject)
}
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
