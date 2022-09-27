var title_2_product = document.querySelector(".title-2-product")


for (var i = 0; i < data_product.length; i++) {
    AddProduct(data_product[i].img,
        data_product[i].name,
        data_product[i].sale_price,
        data_product[i].actual_price,
        data_product[i].sale_off,
        i)
}



// show product details
function AddProduct(image, name, sale_price, actual_price, sale_off,index) {
    // create divs
    var f0Div = document.createElement("div")
    var f00ALink = document.createElement("a")
    var f1ImgDiv = document.createElement("div")
    var f2ImgImg = document.createElement("img")
    var f2ImgSaleOffLogoDiv = document.createElement("div")
    var f1InfoDiv = document.createElement("div")
    var f1PriceDiv = document.createElement("div")
    var f2SalePriceSpan = document.createElement("span")
    var f2ActualPriceSpan = document.createElement("span")
    var f2InstallmentDiv = document.createElement("div")
    //*set div parts
    //**set parent div
    f0Div.setAttribute("class", "t2-product-item")
    //**set t2-product-img
    f1ImgDiv.setAttribute("class", "t2-product-img")
    f2ImgImg.setAttribute("src", image)
    f2ImgImg.setAttribute("class", "img-product")
    f2ImgSaleOffLogoDiv.setAttribute("class", "t2-sale-off-logo")
    f2ImgSaleOffLogoDiv.innerHTML = sale_off
    f1ImgDiv.appendChild(f2ImgImg)
    if (sale_off != "") {
        f1ImgDiv.appendChild(f2ImgSaleOffLogoDiv)
    }
    f00ALink.appendChild(f1ImgDiv)
    //**set t2-product-info
    f1InfoDiv.setAttribute("class", "t2-product-info")
    f1InfoDiv.innerHTML = name
    f00ALink.appendChild(f1InfoDiv)
    //**set t2-product-sale_price
    f1PriceDiv.setAttribute("class", "t2-product-price")
    f2SalePriceSpan.setAttribute("class", "t2-product-price")
    f2SalePriceSpan.innerHTML = sale_price
    f2ActualPriceSpan.setAttribute("class", "t2-product-price-actual")
    f2ActualPriceSpan.innerHTML = actual_price
    f2InstallmentDiv.setAttribute("class", "t2-sale-off")
    f2InstallmentDiv.innerHTML = "Trả góp 0%"
    f1PriceDiv.appendChild(f2SalePriceSpan)
    f1PriceDiv.appendChild(f2ActualPriceSpan)
    f1PriceDiv.appendChild(f2InstallmentDiv)
    f00ALink.appendChild(f1PriceDiv)
    //** installment
    var link = "../htdocs/product.html?product="+index
    f00ALink.setAttribute("href",link)
    f0Div.appendChild(f00ALink)
    //show product item
    title_2_product.appendChild(f0Div)

}




