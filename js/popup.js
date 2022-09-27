
// category-menu-item
var category_menu_item = document.getElementsByClassName("category-menu-item")
var menu_item_popup = document.querySelector(".menu-item-popup")
var screenWidth = window.matchMedia("(max-width: 1240px)")


for (var i = 0; i < category_menu_item.length; i++) {
    category_menu_item[i].addEventListener("mouseover", function () {
        if(!screenWidth.matches){
            menu_item_popup.style.display = "block"
        }

    })
    category_menu_item[i].addEventListener("mouseout", function () {
        menu_item_popup.style.display = "none"
    })
}