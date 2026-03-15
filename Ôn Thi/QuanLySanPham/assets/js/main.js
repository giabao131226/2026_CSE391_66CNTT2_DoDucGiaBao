

function handleSubmit(e){
    e.preventDefault();
    
    const inputName = e.target.querySelector("input[name='productName']")
    const inputPrice = e.target.querySelector("input[name='productPrice']")
    const inputStock = e.target.querySelector("input[name='stock']")
    const inputPassword = e.target.querySelector("input[name='password']")
    const inputConfirmPassword = e.target.querySelector("input[name='confirmpassword']")

    if(!inputName.value.trim()){
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

    let idProduct = '';
    const chars = '0123456789'
    for(let i=0;i<10;i++){
        idProduct+=chars[Math.floor(Math.random()*chars.length)]
    }
    idProduct+= (new Date()).toLocaleString();

    const data = {
        id: idProduct,
        name: inputName.value,
        price: parseInt(inputPrice.value.trim()),
        stock: parseInt(inputStock.value.trim()),
        password: inputPassword.value.trim(),
        description: inputDescription.value,
        category: inputDanhMuc.value
    }
    const listProduct = JSON.parse(localStorage.getItem("listProduct")) || []
    listProduct.push(data)
    localStorage.setItem("listProduct",JSON.stringify(listProduct))
    alert("Chúc mừng, bạn đã thêm sản phẩm thành công")
    window.location.href = 'http://127.0.0.1:5500/NenTangPhatTrienWeb/FileCode/%C3%94n%20Thi/QuanLySanPham/listProduct.html'
}

const form = document.querySelector("form")
form.addEventListener("submit",handleSubmit)