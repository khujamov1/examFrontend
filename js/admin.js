const elAdminForm = document.querySelector(".admin-main-form");
const elProductName = elAdminForm.querySelector(".product-name");
const elProductDesc = elAdminForm.querySelector(".product-desc");
const elProductImg = elAdminForm.querySelector(".product-img");
const elProductCost = elAdminForm.querySelector(".product-cost");
const getTokenLogin = localStorage.getItem("token");
const elProductList = document.querySelector(".product-list");
const elProductTemplate = document.querySelector(".product-template").content;
const elAdminModalForm = document.querySelector(".admin-modal-form");
const elModalName = elAdminModalForm.querySelector(".product-name");
const elModalDesc = elAdminModalForm.querySelector(".product-desc");
const elModalImg = elAdminModalForm.querySelector(".product-img");
const elModalCost = elAdminModalForm.querySelector(".product-cost");

const elProductFragment = new DocumentFragment();

function renderProduct(arr, nodeList) {
    nodeList.innerHTML = "";
    arr.forEach(item => {
        const elProductTempClone = elProductTemplate.cloneNode(true);
        elProductTempClone.querySelector(".product-image").src = `http://localhost:5000/${item.product_img}`;
        elProductTempClone.querySelector(".product-price").textContent = item.product_price;
        elProductTempClone.querySelector(".product-name").textContent = item.product_name;
        elProductTempClone.querySelector(".product-desc").textContent = item.product_desc;
        elProductTempClone.querySelector(".edit-btn").dataset.id =  item.id;
        elProductTempClone.querySelector(".delete-btn").dataset.id =  item.id;
        elProductFragment.appendChild(elProductTempClone);
    })
    nodeList.appendChild(elProductFragment);
}

async function adminPostProccess() {
    elProductList.innerHTML = ""
    try {
        const formData = new FormData();
        formData.append("product_name", elProductName.value.trim());
        formData.append("product_desc", elProductDesc.value.trim());
        formData.append("product_img", elProductImg.files[0]);
        formData.append("product_price", elProductCost.value.trim());
        
        const res = await fetch("http://localhost:5000/product", {
        method: "POST",
        headers: {
            Authorization: getTokenLogin,
        },
        body: formData,
    });
    
    const data = await res.json();
    console.log(data);
    
    
    adminGetProccess();
} catch (error) {
    console.log(error);
}
}


async function adminEditProccess(url, productSrc, id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: getTokenLogin
            },
            body: productSrc
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    localStorage.removeItem("editedId")
}

async function adminDeleteProccess(url, id) {
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


async function adminGetProccess() {
    const response = await fetch("http://localhost:5000/product", {
    method: "GET", 
    headers: {
        Authorization: getTokenLogin
    }
});
const data = await response.json();
renderProduct(data, elProductList);
}
adminGetProccess()




elAdminForm.addEventListener("submit", evt => {
    evt.preventDefault();
    
    adminPostProccess();
    elAdminForm.reset();
})

elAdminModalForm.addEventListener("submit", evt => {
    evt.preventDefault();

    const updatedForm = new FormData();
    updatedForm.set("product_name", elModalName.value.trim());
    updatedForm.set("product_desc", elModalDesc.value.trim());
    updatedForm.set("product_img", elModalImg.files[0]);
    updatedForm.set("product_price", elModalCost.value.trim());


    
    adminEditProccess("http://localhost:5000/product", updatedForm, localStorage.getItem("editedId"));

})

elProductList.addEventListener("click", evt => {
    localStorage.setItem("editedId", evt.target.dataset.id)
    
    const elDeleteId = evt.target.dataset.id;
    if(evt.target.matches(".delete-btn")) {
        adminDeleteProccess("http://localhost:5000/product", elDeleteId);
        window.location.reload();
    }
})