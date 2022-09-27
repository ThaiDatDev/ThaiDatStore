var carousel_arrow_left_control = document.querySelector('.carousel-arrow-left-control')
var carousel_arrow_right_control = document.querySelector('.carousel-arrow-right-control')
var carousel = document.querySelectorAll('.carousel')
var carousel_radio_control = document.querySelector('.carousel-radio-control')
// process and change img by arrow buton
carousel_arrow_left_control.addEventListener("click", function () {
    if (carousel[0].checked == false) {
        for (var i = 0; i < carousel.length; i++) {
            if (carousel[i].checked) {
                carousel[i - 1].checked = true
                OnChangeImg(i-1)
            }
        }
    }
    else {
        carousel[carousel.length - 1].checked = true
        OnChangeImg(carousel.length-1)
    }
})

carousel_arrow_right_control.addEventListener("click", function () {
    if (carousel[carousel.length-1].checked == false) {
        for (var i = carousel.length - 1; i >= 0; i--) {
            if (carousel[i].checked) {
                console.log(i)
                carousel[i + 1].checked = true
                OnChangeImg(i+1)
            }
        }
    }
    else {
        carousel[0].checked = true
        OnChangeImg(0)
    }
})
// process and change img by radio input control
carousel_radio_control.addEventListener ("click", function () {
    for(i = 0; i < carousel.length; i++) {
        if(carousel[i].checked){
            OnChangeImg(i)
        }
    }
})
// auto change on time
setInterval(function(){
    if (carousel[carousel.length-1].checked == false) {
        for (var i = carousel.length - 1; i >= 0; i--) {
            if (carousel[i].checked) {
                carousel[i + 1].checked = true
                OnChangeImg(i+1)
            }
        }
    }
    else {
        carousel[0].checked = true
        OnChangeImg(0)
    }
},7000)
// change img finction
var hinh1 = document.querySelector(".hinh1");
var hinh2 = document.querySelector(".hinh2");
var hinh3 = document.querySelector(".hinh3");
var hinh4 = document.querySelector(".hinh4");
var hinh5 = document.querySelector(".hinh5");

var arrImg = [hinh1, hinh2, hinh3, hinh4, hinh5]

function OnChangeImg(n) {
    for (var i = 0; i < arrImg.length; i++) {
        if (n == i) {
            arrImg[i].style.display = "block"
        }
        else {
            arrImg[i].style.display = "none"
        }
    }
}

