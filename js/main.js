const elProductList = document.querySelector(".product-list");
const elProductTemplate = document.querySelector(".product-template").content;
const  getTokenLogin = localStorage.getItem("token");

const elProductFragment = new DocumentFragment();

function renderProduct(arr, nodeList) {
    nodeList.innerHTML = "";
    arr.forEach(item => {
        const elProductTempClone = elProductTemplate.cloneNode(true);
        elProductTempClone.querySelector(".product-image").src = `http://localhost:5000/${item.product_img}`;
        elProductTempClone.querySelector(".product-price").textContent = item.product_price;
        elProductTempClone.querySelector(".product-name").textContent = item.product_name;
        elProductTempClone.querySelector(".buy-btn").dataset.id =  item.id;
        elProductTempClone.querySelector(".product-desc").textContent = item.product_desc;
        elProductFragment.appendChild(elProductTempClone);
    })
    nodeList.appendChild(elProductFragment);
}

if(!getTokenLogin) {
    window.location.replace("./login.html")
}


async function postOrderPage(chosenId) {
    const response = await fetch("http://localhost:5000/order", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Authorization: getTokenLogin
        }, 
        body: JSON.stringify({
            product_id: Number(chosenId)
        })
    });
    const data = await response.json();
    console.log(data);   
}


elProductList.addEventListener("click", evt => {
    if(evt.target.matches(".buy-btn")) {
        postOrderPage(evt.target.dataset.id)
    }
})


async function userGetProccess() {
try {
    const response = await fetch("http://localhost:5000/product", {
        method: "GET", 
        headers: {
            Authorization: getTokenLogin
        }
    });
    const data = await response.json();
    renderProduct(data, elProductList);
} catch (error) {
    console.log(error);
}
}
userGetProccess();


