
// accout form process
var register = document.querySelector("#register")
var login = document.querySelector("#login")
var acc_form_reg = document.querySelector(".acc-form-reg")
var acc_form_log = document.querySelector(".acc-form-log")
var account_form = document.querySelector("#account")
var password_form = document.querySelector("#password")
var acc_body = document.querySelector(".acc-body")
var acc_form = document.querySelector(".acc-form")
var acc_form_loged = document.querySelector(".acc-form-loged")
var submit = document.querySelector("#submit")
var account_message_error = document.querySelector(".account-message-error")
var password_message_error = document.querySelector(".password-message-error")
var submit_container = document.querySelector(".end")
if (sessionStorage.getItem('account') != null) {
    if (JSON.parse(sessionStorage.getItem('account')) != null) {
        acc_form.style.display = 'none'
        // variables if exist
        var account_logined = JSON.parse(sessionStorage.getItem('account'))
        if (account_logined.role == 'admin') {
            var manager = `<span class="admin-manager" onclick= "AdminPage()">Vào trang Admin</span>`
        } else {
            var manager = ``
        }
        var log_info = `<div class="acc-form-loged">
        <h2 class="acc-title">Thông Tin Khách Hàng</h2>
        <div>Tên khách hàng: ${account_logined.name}</div>
        <div>Số điện thoại: ${account_logined.phone}</div>
        <div>Địa chỉ:${account_logined.address}</div>
        <div><span class="cart-logged-in"><a href='../htdocs/cart.html'>Giỏ hàng<a></span><span class="log-out" onclick ="LogOut()">Đăng Xuất</span>${manager}</div>
    </div>`

        var log_info_div = document.createElement('div')
        // event if exist
        log_info_div.innerHTML = log_info
        acc_body.appendChild(log_info_div)
    }
}
var role = ""
var checkAccount = false
var checkPassword = false


//event input
CheckAvailableSubmit()
account_form.addEventListener("input", function () {
    if (account_form.value.length != 0) {
        if (account_form.value.length > 3) {
            account_message_error.innerHTML = '<i class="fa-solid fa-circle-check"></i> Hợp lệ!'
            account_message_error.style.color = '#00FF00'
            account_form.style.outline = '2px solid #00FF00'
            checkAccount = true

        } else {
            account_message_error.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Tài khoản phải từ 4 ký tự trở lên! (Số ký tự hiện tại: ${account_form.value.length} )`
            account_message_error.style.color = '#cc3300'
            account_form.style.outline = '2px solid #cc3300'
            checkAccount = false
        }
    } else {
        account_message_error.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Không được để trống!'
        account_message_error.style.color = '#cc3300'
        account_form.style.outline = '2px solid #cc3300'
        checkAccount = false
    }
    CheckAvailableSubmit()
})
account_form.addEventListener('focusout', function () {
    if (checkAccount) {
        setTimeout(function () {
            account_form.style.outline = '2px solid #bfdeff'
            account_message_error.innerHTML = ''
        }, 200)
    }
})
password_form.addEventListener("input", function () {
    if (password_form.value.length != 0) {
        if (password_form.value.length > 2) {
            password_message_error.innerHTML = '<i class="fa-solid fa-circle-check"></i> Hợp lệ!'
            password_message_error.style.color = '#00FF00'
            password_form.style.outline = '2px solid #00FF00'
            checkPassword = true
        } else {
            password_message_error.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Mật khẩu phải từ 3 ký tự trở lên! (Số ký tự hiện tại: ' + password_form.value.length + ')'
            password_message_error.style.color = '#cc3300'
            password_form.style.outline = '2px solid #cc3300'
            checkPassword = false
        }
    } else {
        password_message_error.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Không được để trống!'
        password_message_error.style.color = '#cc3300'
        password_form.style.outline = '2px solid #cc3300'
        checkPassword = false
    }
    CheckAvailableSubmit()
})
password_form.addEventListener('focusout', function () {
    if (checkAccount) {
        setTimeout(function () {
            password_form.style.outline = '2px solid #bfdeff'
            password_message_error.innerHTML = ''
        }, 200)
    }
})
//event click
register.addEventListener("click", function () {
    acc_form_reg.style.display = "block"
    acc_form_log.style.display = "none"
})
login.addEventListener("click", function () {
    acc_form_reg.style.display = "none"
    acc_form_log.style.display = "block"
})
function Submit() {
    var validAccount = false
    data_account.forEach(account => {
        if (account.username == account_form.value && account.password == password_form.value) {
            var SESSION_DATA = account
            sessionStorage.setItem("account", JSON.stringify(SESSION_DATA))
            validAccount = true
        }
    })
    if (!validAccount) {
        alert("Sai tài khoản mật khẩu!")
    }
}

function CheckAvailableSubmit() {
    if (checkAccount && checkPassword) {
        submit.disabled = false
        submit.style.backgroundColor = "#fe0000"
    } else {
        submit.disabled = true
        submit.style.backgroundColor = "black"
    }
}
function LogOut() {
    if (confirm("Bạn có muốn đăng xuất")) {
        sessionStorage.removeItem("account")
        window.location.reload()
    }
}
function AdminPage() {
    window.location.href = "../htdocs/admin.html"
}
// generate token
// var rand = function () {
//     return Math.random().toString(36).substr(2); // remove `0.`
// };

// var token = function () {
//     return rand() + rand(); // to make it longer
// };
// console.log(token())
