
const listProduct = [
    { id: 1, name: "iPhone 15", price: 25000000 },
    { id: 2, name: "Samsung Galaxy S24", price: 22000000 },
    { id: 3, name: "Xiaomi 14", price: 15000000 },
    { id: 4, name: "Oppo Find X6", price: 18000000 },
    { id: 5, name: "Vivo X100", price: 17000000 },
    { id: 6, name: "MacBook Air M2", price: 32000000 },
    { id: 7, name: "Dell XPS 13", price: 35000000 },
    { id: 8, name: "Asus ROG Strix", price: 40000000 },
    { id: 9, name: "iPad Pro", price: 28000000 },
    { id: 10, name: "AirPods Pro", price: 6000000 }
];
// Hiển thị ds sản phẩm
const selectElement = document.querySelector("select")
selectElement.innerHTML = `<option selected readonly>-- Chọn sản phẩm --</option>`
listProduct.forEach((item) => {
    selectElement.innerHTML+=`
        <option value="${item.id}" id = "${item.id}">${item.name}</option>
    `
})
// 

// Hàm tính tổng giá trị đơn hàng
function CalculatePrice(){
    const inputName = document.querySelector("form select")
    const idProduct = inputName.value
    const inputQuantity = document.querySelector("form input[name='quantity']")

    if(inputName.value && inputQuantity.value){
        const product = listProduct.find((item) => item.id==idProduct)

        const totalPrice = document.querySelector("#totalprice")
        totalPrice.innerHTML=`${product.price*inputQuantity.value}`

        return product.price*inputQuantity.value;
    }
    return 0;

}
// 

// Hàm kiểm tra tên sản phẩm
function validateName() {
    const inputName = document.querySelector("form select")
    if (inputName.value == "-- Chọn sản phẩm --") {
        inputName.classList.add("alert-error")
        return false;
    }
    return true;
}
// 
// Hàm kiểm tra số lượng
function validateQuantity() {
    const inputQuantity = document.querySelector("form input[name='quantity']")
    const value = parseInt(inputQuantity.value)
    if (isNaN(value)) {
        inputQuantity.classList.add("alert-error")
        return false;
    }

    return true;
}
// 
// Hàm kiểm tra date
function validateDate() {
    const inputDate = document.querySelector("form input[name='ngayGiaoHang']")
    if (!inputDate.value) {
        inputDate.classList.add("alert-error")
        return false;
    }
    const dateNow = new Date();
    const delivery = new Date(inputDate.value);
    if (dateNow.getTime() >= delivery.getTime()) {
        inputDate.classList.add("alert-error")
        return false;
    }
    const diff = delivery - dateNow;
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 30) {
        inputDate.classList.add("alert-error")
        return false;
    }
    return true;

}
// 
// Hàm validate địa chỉ giao hàng
function validateAddress(){
    const inputAddress = document.querySelector("input[name='address']")
    if(inputAddress.value.length<10){
        inputAddress.classList.add("alert-error")
        return false;
    }
    return true;
}
// 
// Validate Ghi Chú
function validateGhiChu(){
    const inputGhiChu = document.querySelector("textarea")
    if(inputGhiChu.value.length>200){
        inputGhiChu.classList.add("alert-error")
        return false;
    }
    return true;
}
// 
// Validate PTTT
function validatePTTT(){
    const inputChecked = document.querySelector("input[type='radio'][checked]")
    if(!inputChecked){
        return false;
    }
    return true;
}
// 

function thongBaoThanhCong(){
    alert("Thành công")
}

// Xử lý submit form
function submitForm(e) {
    e.preventDefault();

    if (!validateName()) {
        alert("Bạn phải chọn tên sản phẩm đã")
        return;
    }
    if (!validateQuantity()) {
        alert("Số lượng nhập vào phải là 1 số")
        return;
    }
    if (!validateDate()) {
        alert("Không được là ngày trong quá khứ, không quá 30 ngày từ hôm nay")
        return;
    }
    if(!validateAddress()){
        alert("Địa chỉ giao hàng phải Không trống, ≥ 10 ký tự")
        return;
    }
    if(!validateGhiChu()){
        alert("Phần ghi chú không bắt buộc, nhưng nếu nhập thì không quá 200 ký tự")
        console.log("Lỗi ghi chú")
        return;
    }
    if(!validatePTTT()){
        alert("Radio button: COD / Chuyển khoản / Ví điện tử — bắt buộc chọn")
        return;
    }
    const select = document.querySelector("form select")
    const inputName = document.querySelector(`form select option[value = "${select.value.toString()}"]`)
    const inputQuantity = document.querySelector("form input[name='quantity']")
    const inputDate = document.querySelector("form input[name='ngayGiaoHang']")
    const inputAddress = document.querySelector("input[name='address']")
    const inputGhiChu = document.querySelector("textarea")
    const inputChecked = document.querySelector("input[type='radio'][checked]")

    const formXacNhan = document.querySelector("#form-xac-nhan")
    formXacNhan.innerHTML=`
        <p>Tên sản phẩm: ${inputName.textContent}</p>
        <p>Số lượng: ${inputQuantity.value}</p>
        <p>Ngày Giao Hàng: ${inputDate.value}</p>
        <p>Địa Chỉ Giao Hàng: ${inputAddress.value}</p>
        <p>Ghi Chú: ${inputGhiChu.value ? inputGhiChu.value : ""}</p>
        <p>Phương Thức Thanh Toán: ${inputChecked.value}</p>
        <p>Tổng Gía Trị: ${CalculatePrice()}</p>
        <button onclick = "thongBaoThanhCong()">Xác Nhận</button>
        <button>Huỷ</button>
    `
}   
// 

const form = document.querySelector("form")
if (form) {
    form.addEventListener("submit", submitForm)
}



// Thêm att checked cho input radio
const listInputRadio = document.querySelectorAll("input[type='radio']")
listInputRadio.forEach((item) => {
    item.addEventListener("click",(e) => {
        const inputChecked = document.querySelector("input[type='radio'][checked]")
        if(inputChecked){
            inputChecked.removeAttribute("checked")
        }

        e.target.setAttribute("checked",true)
    })
})
// 

// Validate realtime
function deleteAlertError(e){
    e.target.classList.remove("alert-error")
}

function demSoKyTu(e){
    const length = e.target.value.length;

    const hienThiSoKyTu = document.querySelector("#ghiChuLength")
    if(length>5){
        hienThiSoKyTu.style.color = 'red'
        alert("Ghi chú không được quá 200 kí tự")
    }
    hienThiSoKyTu.textContent = length
}

const inputName = document.querySelector("form select")
inputName.addEventListener("blur",validateName)
inputName.addEventListener("focus",deleteAlertError)
inputName.addEventListener("change",CalculatePrice)

const inputQuantity = document.querySelector("form input[name='quantity']")
inputQuantity.addEventListener("blur",validateQuantity)
inputQuantity.addEventListener("focus",deleteAlertError)
inputQuantity.addEventListener("change",CalculatePrice)

const inputDate = document.querySelector("form input[name='ngayGiaoHang']")
inputDate.addEventListener("blur",validateDate)
inputDate.addEventListener("focus",deleteAlertError)

const inputAddress = document.querySelector("input[name='address']")
inputAddress.addEventListener("blur",validateAddress)
inputAddress.addEventListener("keyup",deleteAlertError)

const inputGhiChu = document.querySelector("textarea")
inputGhiChu.addEventListener("blur",validateGhiChu)
inputGhiChu.addEventListener("keyup",deleteAlertError)
inputGhiChu.addEventListener("keyup",demSoKyTu)
// 