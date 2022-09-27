if (localStorage.getItem("payment_history") == null) {
    PAYMENT_HISTORY__SERVER = []
    localStorage.setItem("payment_history",JSON.stringify(PAYMENT_HISTORY__SERVER))
}else{
    PAYMENT_HISTORY__SERVER = JSON.parse(localStorage.getItem("payment_history"))
}
