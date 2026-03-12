
// Hàm kiểm tra lỗi của inputName
function checkName() {
    const inputName = document.querySelector("form input[name='hovaten']")
    const value = inputName.value
    if (value.trim().length < 3 || !/^[a-zA-ZÀ-ỹ\s]+$/.test(value)){
        inputName.classList.add("alert-error");
        return false;
    } 
    return true;
}
// 
// Hàm kiểm tra lỗi của inputEmail
function checkEmail() {
    const inputEmail = document.querySelector("form input[name='email']")
    const value = inputEmail.value;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
        inputEmail.classList.add("alert-error")
        return false;
    }
    return true;
}
// 
// Hàm kiểm tra lỗi của inputPhone
function checkPhone() {
    const inputPhone = document.querySelector("form input[name='phone']")
    const value = inputPhone.value
    if (value.length < 10 || value[0] != 0){
        inputPhone.classList.add("alert-error")
        return false;
    }
    return true;
}
// 
// Hàm kiểm tra lỗi của inputPassword
function checkPassword() {
    const inputPassword = document.querySelector("form input[name='password']")
    const value = inputPassword.value;
    if (value.length < 8){
        inputPassword.classList.add("alert-error");
        return false;
    }

    let haveHoa = false, haveThuong = false, haveSo = false;
    for (let i = 0; i < value.length; i++) {
        if (!isNaN(value[i])) haveSo = true;
        else if (value[i] == value[i].toLowerCase()) haveThuong = true;
        else if (value[i] == value[i].toUpperCase()) haveHoa = true;
    }
    if(haveHoa==false || haveThuong==false || haveSo==false){
        inputPassword.classList.add("alert-error");
        return false;
    }
    return true;
}
// Hàm check khớp mật khẩu
function checkKhopMatKhau(){
    const inputXacNhanMatKhau = document.querySelector("form input[name='xacNhanMatKhau']")
    const inputPassword = document.querySelector("form input[name='password']")
    const value = inputXacNhanMatKhau.value;
    const passWord = inputPassword.value
    if(value!=passWord){
        const inputXacNhanMatKhau = document.querySelector("form input[name='xacNhanMatKhau']")
        inputXacNhanMatKhau.classList.add("alert-error");
        return false;
    }
    return true;
}
// 

// Hàm Kiểm Tra Khi Submit
function handleSubmit(e) {
    e.preventDefault();

    const inputGioiTinh = document.querySelector("form input[name='gioiTinh'][checked]")
    const inputCheckBox = document.querySelector("form input[type='checkbox'][checked]")

    if (!checkName()) {
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        return;
    }
    if (!checkEmail()){
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        console.log("lỗi email")
        return;
    }
    if(!checkPhone()){
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        console.log("lỗi phone")
        return;
    }
    if(!checkPassword()){
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        console.log("lỗi mật khẩu")
        return;
    }
    if(!checkKhopMatKhau()){
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        console.log("Lỗi không khớp mật khẩu")
        return
    }
    if(!inputGioiTinh){
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        console.log("Lỗi")
        return;
    }
    if(!inputCheckBox){
        alert("Thông Tin Bạn Nhập Vào Có Lỗi. Vui Lòng Kiểm Tra Lại")
        console.log("Lỗi CheckBox")
        return;
    }

    const inputName = document.querySelector("form input[name='hovaten']")
    const inputEmail = document.querySelector("form input[name='email']")
    const inputPhone = document.querySelector("form input[name='phone']")

    const form = document.querySelector("form")
    form.classList.add("d-none")

    const thongBao = document.querySelector("#thongBaoDKThanhCong")
    thongBao.classList.remove("d-none")
    thongBao.innerHTML = `
        <p>Tên Người Dùng: <span class = "font-bold">${inputName.value}</span></p>
        <p>Email: <span class = "font-bold">${inputEmail.value}</span></p>
        <p>Phone: <span class = "font-bold">${inputPhone.value}</span></p>
    `
} 

const form = document.querySelector("form")
if (form) {
    form.addEventListener("submit", handleSubmit)
}
// 

// Thêm att checked cho input radio
function handleClickRadio(e){

    e.target.setAttribute("checked",true);
    const value = e.target.value;
    if(value=="nam"){
        const anotherInputGioiTinh = document.querySelector("form input[value='nu']");
        anotherInputGioiTinh.removeAttribute("checked")
    }else{
        const anotherInputGioiTinh = document.querySelector("form input[value='nam']");
        anotherInputGioiTinh.removeAttribute("checked")
    }
}
const inputGioiTinh = document.querySelectorAll("form input[name='gioiTinh']")
inputGioiTinh.forEach((item) => {
    item.addEventListener("click",handleClickRadio)
})
// 
// Hàm thêm checked vào inputCheckBox
const inputCheckBox =document.querySelector("form input[type = 'checkbox']")
if(inputCheckBox){
    inputCheckBox.addEventListener("click",(e) => {
        const value = e.target.getAttribute("checked")
        if(value){
            e.target.removeAttribute("checked")
            return;
        }
        e.target.setAttribute("checked",true)
    })
}
// 

// Validate realtime And
function deleteAlertError(e){
    e.target.classList.remove("alert-error")
}

const inputName = document.querySelector("form input[name='hovaten']")
inputName.addEventListener("blur",checkName)
inputName.addEventListener("keyup",deleteAlertError)

const inputEmail = document.querySelector("form input[name='email']")
inputEmail.addEventListener("blur",checkEmail)
inputEmail.addEventListener("keyup",deleteAlertError)

const inputPhone = document.querySelector("form input[name='phone']")
inputPhone.addEventListener("blur",checkPhone)
inputPhone.addEventListener("keyup",deleteAlertError)

const inputPassword = document.querySelector("form input[name='password']")
inputPassword.addEventListener("blur",checkPassword)
inputPassword.addEventListener("keyup",deleteAlertError)

const inputXacNhanMatKhau = document.querySelector("form input[name='xacNhanMatKhau']")
inputXacNhanMatKhau.addEventListener("blur",checkKhopMatKhau)
inputXacNhanMatKhau.addEventListener("keyup",deleteAlertError)
// 


