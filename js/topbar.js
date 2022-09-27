//topbar event
var topbar = document.querySelector(".topbar");
var topbar_closeBtn = document.querySelector(".topbar-close")
var search_fc = document.querySelector(".search-fc ")
topbar_closeBtn.addEventListener("click", function () {
    topbar.style.display = "none"
    search_fc.style.top = "100px";
    search_fc.style.height = "84vh"
})

//sticky
window.onscroll = function () { myFunction() };

var navbar = document.querySelector(".navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}