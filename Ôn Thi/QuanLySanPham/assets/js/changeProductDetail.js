

const oldDetail = JSON.parse(localStorage.getItem("detailProduct")) || {}
const detailProduct = new Object(oldDetail)

function handleChange(e){
    const nameP = e.target.getAttribute("name")
    const value = e.target.value
    detailProduct[nameP] = value
}


function handleSubmit(e){
    e.preventDefault();

    const inputName = e.target.querySelector("input[name='productName']")
    const inputPrice = e.target.querySelector("input[name='productPrice']")
    const inputStock = e.target.querySelector("input[name='stock']")
    const inputPassword = e.target.querySelector("input[name='password']")
    const inputConfirmPassword = e.target.querySelector("input[name='confirmpassword']")

    if(!inputName.value.trim()){
        console.log(inputName.value)
        inputName.classList.add("alert-error")
        return;
    }
    if(!inputPrice.value.trim()){
        const value = parseInt(inputPrice.value.trim())
        if(isNaN(value) || value<=0){
            inputPrice.classList.add("alert-error")
            return;
        }
    }
    if(!inputStock.value.trim()){
        const value = parseInt(inputStock.value.trim())
        if(isNaN(value) || value<0){
            inputStock.classList.add("alert-error")
            return;
        }
    }
    if(inputPassword.value.trim().length<6){
        inputPassword.classList.add("alert-error")
        console.log(inputPassword.value)
        return;
    }
    if(inputConfirmPassword.value.trim().length != inputPassword.value.trim().length || inputPassword.value.trim() != inputConfirmPassword.value.trim()){
        inputConfirmPassword.classList.add("alert-error")
        return;
    }

    const inputDescription = e.target.querySelector("textarea")
    const inputDanhMuc = e.target.querySelector("select")

    const data = {
        id: detailProduct.id,
        name: inputName.value,
        price: parseInt(inputPrice.value.trim()),
        stock: parseInt(inputStock.value.trim()),
        password: inputPassword.value.trim(),
        description: inputDescription.value,
        category: inputDanhMuc.value
    }

    const listProduct  = JSON.parse(localStorage.getItem("listProduct"))
    const index = listProduct.findIndex((item) => item.id == data.id)
    listProduct[index] = data;
    localStorage.setItem("listProduct",JSON.stringify(listProduct))
    localStorage.removeItem("detailProduct")
    window.location.href = 'http://127.0.0.1:5500/NenTangPhatTrienWeb/FileCode/%C3%94n%20Thi/QuanLySanPham/listProduct.html'
}

const form = document.querySelector("form")
if(form){
    form.addEventListener("submit",handleSubmit)
}

// Fill thông tin sản phẩm vào các input
const inputName = document.querySelector("input[name='productName']")
inputName.addEventListener("keyup",handleChange)
inputName.value = detailProduct.name

const inputPrice = document.querySelector("input[name='productPrice']")
inputPrice.addEventListener("keyup",handleChange)
inputPrice.value = detailProduct.price

const inputStock = document.querySelector("input[name='stock']")
inputStock.addEventListener("keyup",handleChange)
inputStock.value = detailProduct.stock 

const inputPassword = document.querySelector("input[name='password']")
inputPassword.addEventListener("keyup",handleChange)
inputPassword.value = detailProduct.password

const inputConfirmPassword = document.querySelector("input[name='confirmpassword']")
inputConfirmPassword.addEventListener("keyup",handleChange)
inputConfirmPassword.value = detailProduct.password

const inputDescription = document.querySelector("textarea")
inputDescription.addEventListener("keyup",handleChange)
inputDescription.value = detailProduct.description 

const inputDanhMuc = document.querySelector("select")
inputDanhMuc.addEventListener("change",handleChange)
inputDanhMuc.value = detailProduct.category
// 



