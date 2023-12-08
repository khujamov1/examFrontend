const elOrderList = document.querySelector(".product-list");
const elorederTemplate = document.querySelector(".product-template");
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
        elProductTempClone.querySelector(".product-desc").textContent = item.product_desc;
        elProductTempClone.querySelector(".delete-btn").dataset.id =  item.id;
        elProductFragment.appendChild(elProductTempClone);

        console.log(item);
    })
    nodeList.appendChild(elProductFragment);
}

async function orderDeleteProccess(url, id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: getTokenLogin
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function renderOrderPage() {
    const response = await fetch("http://localhost:5000/order", {
        method: "GET",
        headers: {
            Authorization: getTokenLogin
        }
    });
    const data = await response.json();
    renderProduct(data, elOrderList)
}
renderOrderPage();

if(!getTokenLogin) {
    window.location.replace("./login.html")
}


elOrderList.addEventListener("click", evt => {
    if(evt.target.matches(".delete-btn")) {
        orderDeleteProccess("http://localhost:5000/order", evt.target.dataset.id)
    }
    window.location.reload();
})