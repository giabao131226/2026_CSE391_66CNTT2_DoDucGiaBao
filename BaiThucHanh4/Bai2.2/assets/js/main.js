
// Hàm kiểm tra tên sản phẩm
function validateName(){
    const inputName = document.querySelector("form select")
    if(inputName.value == "-- Chọn sản phẩm --"){
        inputName.classList.add("alert-error")
        return false;
    }
    return true;
}
// 
// Hàm kiểm tra số lượng
function validateQuantity(){
    const inputQuantity = document.querySelector("form input[name='quantity']")
    const value = parseInt(inputQuantity.value)
        if(isNaN(value)){
            inputQuantity.classList.add("alert-error")
            return false;
        }
    
    return true;
}
// 
// Hàm kiểm tra date
function validateDate(){
    const inputDate = document.querySelector("form input[name='ngayGiaoHang'][type='date']")
    const inputDate2 = document.querySelector("form input[name='ngayGiaoHang']")
    if(!inputDate){
        inputDate2.classList.add("alert-error")
        return false;
    }
    
}
// 
function submitForm(e){
    e.preventDefault();
    
    if(!validateName()){
        alert("Bạn phải chọn tên sản phẩm đã")
        return;
    }
    if(!validateQuantity()){
        alert("Số lượng nhập vào phải là 1 số")
        return;
    }
    if(!validateDate()){
        alert("Lỗi")
        return;
    }

}

const form = document.querySelector("form")
if(form){
    form.addEventListener("submit",submitForm)
}