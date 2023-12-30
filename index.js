
function LoadCategory() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (categories) {
            categories.unshift("all")
            categories.map(function (category) {
                var option = document.createElement("option")
                option.text = category.toUpperCase();
                option.value = category;
                document.getElementById("lstCategories").appendChild(option)
            })
        })
}
function LoadProduct(url) {
    document.querySelector("main").innerHTML = ""
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            products.map(function(product) {
                var div = document.createElement("div")
                div.className = "card p-2 m-2"
                div.style.width = "200px";
                div.innerHTML = `<img src=${product.image} height="140" class=card-img-top>
            <div class="card-header overflow-auto" style="height:80px">${product.title}</div>
            <div class="card-body">
                <dl>
                    <dt>Price</dt>
                    <dd>&#8377;${product.price}</dd>
                    <dt>Rating</dt>
                    <dd>${product.rating.rate} <span class="bi bi-star-fill text-warning"></span>
                    [${product.rating.count}]</dd>
                </dl>
            </div>
            <div class="card-footer">
                <button class="bi bi-cart4 btn btn-danger w-100" onclick="AddClick(${product.id})">Add to Cart</button>
                </div>`
                document.querySelector("main").appendChild(div)
            })

        })
}
function CategoryChanged(){
    var categoryName = document.getElementById("lstCategories").value;
    if(categoryName == "all"){
        LoadProduct("https://fakestoreapi.com/products")
    }
    else{
        LoadProduct(`https://fakestoreapi.com/products/category/${categoryName}`)
    }
}
function DisplayCategory(categoryName){
    if(categoryName == "all"){
        LoadProduct("https://fakestoreapi.com/products")
    }
    else{
        LoadProduct(`https://fakestoreapi.com/products/category/${categoryName}`)
    }
}
var cartItems=[];
function GetCartCount(){
    document.getElementById("lblCount").innerHTML =cartItems.length;
}
function AddClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(response)
    {
        return response.json();
    })
    .then(function(product){
        cartItems.push(product);
        alert(`${product.title}\nAdded to Cart`);
        GetCartCount();
    })
}
function ShowCartItem(){
    document.querySelector("tbody").innerHTML="";
    cartItems.map(function(item){
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPreview = document.createElement("td");

        tdTitle.innerHTML= item.title;
        tdPrice.innerHTML =item.price;
        tdPreview.innerHTML=`<img src=${item.image} height="50" width="50">`

        tr.appendChild(tdTitle)
        tr.appendChild(tdPrice)
        tr.appendChild(tdPreview)

        document.querySelector("tbody").appendChild(tr)
    })

}

function bodyload() {
    LoadCategory();
    LoadProduct("https://fakestoreapi.com/products")
    CategoryChanged();
}