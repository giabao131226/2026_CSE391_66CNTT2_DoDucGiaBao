
let step = 1;

function validateDate(inputDate) {
    const dateNow = new Date();
    const birth = new Date(inputDate.value);
    if (dateNow.getTime() <= birth.getTime()) {
        inputDate.classList.add("alert-error")
        return false;
    }
    return true;
}

// Next Button
function nextButton(step) {
    const buttonStep = document.querySelector(`button[step = "${step}"]`)
    const buttonCurrent = document.querySelector("button.active")
    buttonCurrent.classList.remove("active")
    buttonStep.classList.add("active")
}
// 
// Previous Button
function previousButton(step){
    const buttonStep = document.querySelector(`button[step = "${step-1}"]`)
    const buttonCurrent = document.querySelector("button.active")
    buttonCurrent.classList.remove("active")
    buttonStep.classList.add("active")
}
// 

// Next Form
function nextForm(step) {
    document.querySelector(`#form${step - 1}`).classList.add("d-none")
    document.querySelector(`#form${step}`).classList.remove("d-none")

    if (step == 3) {
        const validate3 = document.querySelector(".validate3")
        if (validate3) {
            const inputName = document.querySelector("input[name='hovaten']")
            const inputDate = document.querySelector("input[name='ngaySinh']")
            const inputGioiTinh = document.querySelector("select")
            const inputEmail = document.querySelector("input[name='email']")
            const inputPassword = document.querySelector("input[name='password']")

            validate3.innerHTML = `
                <div class="col-6 px-0 py-0">
                                <p>Họ Và Tên: ${inputName.value}</p>
                                <p>Ngày Sinh: ${inputDate.value}</p>
                                <p>Giới Tính: ${inputGioiTinh.value}</p>
                            </div>
                            <div class="col-6 px-0 py-0">
                                <p>Email: ${inputEmail.value}</p>
                                <p>Password: ${inputPassword.value}</p>
                            </div>
            `
            const nextStepButton = document.querySelector("#nextStep")
            nextStepButton.textContent = 'Xác Nhận'
        }
    }
}
// 
// Previous Form
function previousForm(step) {
    document.querySelector(`#form${step}`).classList.add("d-none")
    document.querySelector(`#form${step-1}`).classList.remove("d-none")
}
// 

// Validate 1
function validateForm1(form) {
    const inputName = form.querySelector("input[name='hovaten']")
    const inputDate = form.querySelector("input[name='ngaySinh']")
    const inputGioiTinh = form.querySelector("select")

    if (!inputName.value) {
        inputName.classList.add("alert-error")
        return;
    }
    if (!inputDate.value || validateDate(inputDate) == false) {
        inputDate.classList.add("alert-error")
        return;
    }
    step = 2;
    nextButton(step)
    nextForm(step)
    return;
}
// 
// Validate 2
function validateForm2(form) {
    const inputEmail = form.querySelector("input[name='email']")
    const inputPassword = form.querySelector("input[name='password']")
    const inputConfirmPassword = form.querySelector("input[name='confirmpassword']")

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value)) {
        inputEmail.classList.add("alert-error")
        return false;
    }
    if (inputPassword.value.length < 8) {
        inputPassword.classList.add("alert-error");
        return false;
    }
    if (inputConfirmPassword.value != inputPassword.value) {
        inputConfirmPassword.classList.add("alert-error")
        return false;
    }
    step = 3;
    nextButton(step);
    nextForm(step)
    return;
}
// 


function handleNextPage() {
    const form = document.querySelector("form")

    if (step == 1) {
        validateForm1(form)
        return;
    }
    if (step == 2) {
        validateForm2(form)
        return;
    }
    if(step==3){
        alert("Chúc mừng đã đăng ký thành công")
        window.location.reload()
    }

}
function handlePreviousPage(){
    if(step==1){
        return;
    }
    previousButton(step)
    previousForm(step)
    step-=1;

}

const nextStepButton = document.querySelector("#nextStep")
if (nextStepButton) {
    nextStepButton.addEventListener("click", handleNextPage)
}

const previousStepButton = document.querySelector("#previousStep")
if(previousStepButton){
    previousStepButton.addEventListener("click",handlePreviousPage)
}