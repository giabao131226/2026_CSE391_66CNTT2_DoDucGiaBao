
const dsSV = JSON.parse(localStorage.getItem("dsSV")) || []
localStorage.setItem("listSVCurrent",JSON.stringify(dsSV))
localStorage.setItem("sort","asc")

// Xoá Sinh Viên
function handleDelete(e) {
    const sttSV = e.target.getAttribute("id-sv")
    const dsSV = JSON.parse(localStorage.getItem("dsSV"))
    const dsNew = dsSV.filter((item) => {
        return parseInt(item.stt) != parseInt(sttSV)
    })
    renderDSSV(dsNew)
    localStorage.setItem("dsSV", JSON.stringify(dsNew))
}
// 

// Render danh sách sinh viên
function renderDSSV(dsSV) {
    let totalString = '';

    const BangHienThi = document.querySelector("#hienThiDSSV")
    const soLuongSV = dsSV.length;
    let diemTrungBinh = 0;

    dsSV.forEach((item) => {
        diemTrungBinh += parseInt(item.diem);
        totalString += `<tr>
                <td>${item.stt}</td>
                <td>${item.hovaten}</td>
                <td>${item.diem}</td>
                <td>${item.xepLoai}</td>
                <td>
                    <button class="bg-red text-white border-none cursor-pointer" id-sv = ${item.stt} onchange = "handleDelete">Xoá</button>
                </td>
            </tr>`
    })
    diemTrungBinh = (diemTrungBinh / soLuongSV).toFixed(2);
    if(totalString){
        BangHienThi.innerHTML = totalString
    }else BangHienThi.innerHTML = "Không tìm thấy kết quả"

    const listButton = document.querySelectorAll("button[id-sv]")
    if (listButton.length > 0) {
        listButton.forEach((item) => {
            item.addEventListener("click", handleDelete)
        })
    }

    // Hiển thị thông tin cả lớp
    const ttinCaLop = document.querySelector("#thongTinCaLop")
    ttinCaLop.innerHTML = `
    <p class="m-0 py-2">Tổng Số Sinh Viên: <span class="font-bold">${soLuongSV}</span></p>
        <p class="m-0 py-2">Điểm Trung Bình Của Cả Lớp: <span class="font-bold">${diemTrungBinh}</span></p>
    `
}

renderDSSV(dsSV);

// Thêm Thông Tin Sinh Viên
function themThongTinSV(e) {
    e.preventDefault();

    const dsSinhVien = JSON.parse(localStorage.getItem("dsSV")) || []

    const inputName = document.querySelector("form input[name = 'hovaten']").value
    const inputDiem = document.querySelector("form input[name = 'diem']").value

    if (!inputName.trim()) {
        alert("Họ Tên Không Được Để Trống")
        return;
    }
    if (inputDiem < 0 || inputDiem > 10) {
        alert("Điểm không hợp lệ. Điểm phải nằm trong khoảng từ 0 đến 10")
        return;
    }

    const ttin = {
        stt: `${dsSinhVien.length + 1 < 10 ? `0${dsSinhVien.length + 1}` : dsSinhVien.length + 1}`,
        hovaten: inputName,
        diem: inputDiem
    }
    if (ttin.diem >= 8.5) ttin.xepLoai = "Giỏi"
    else if (ttin.diem >= 7) ttin.xepLoai = "Khá"
    else if (ttin.diem >= 5) ttin.xepLoai = "Trung Bình"
    else ttin.xepLoai = "Yếu"

    dsSinhVien.push(ttin)
    renderDSSV(dsSinhVien)
    localStorage.setItem("dsSV", JSON.stringify(dsSinhVien))
    const form = document.querySelector("#formThemSV")
    form.reset();
}

const form = document.querySelector("#formThemSV")
if (form) {
    form.addEventListener("submit", themThongTinSV)
}
//

// Thanh Tìm Kiếm
function handleChangeSearch(e) {
    const value = e.target.value.toLowerCase();
    if(!value){
        localStorage.setItem("listSVCurrent",localStorage.getItem("dsSV"))
        renderDSSV(JSON.parse(localStorage.getItem("dsSV")))
    }
    const dsSV = JSON.parse(localStorage.getItem("listSVCurrent")) || JSON.parse(localStorage.getItem("dsSV"))

    const dsNew = dsSV.filter((item) => {
        return item.stt.includes(value) || item.hovaten.toLowerCase().includes(value) || item.xepLoai.toLowerCase().includes(value) || item.diem.includes(value)
    })
    renderDSSV(dsNew);
    localStorage.setItem("listSVCurrent",JSON.stringify(dsNew))
}

const timKiem = document.querySelector("#thanhTimKiem")
timKiem.addEventListener("keyup", handleChangeSearch)

// Bộ lọc theo xếp loại
function handleChangeBoLoc(e){
    const value = e.target.value;
    const dsSV = JSON.parse(localStorage.getItem("dsSV"))

    const dsNew = dsSV.filter((item) => {
        return item.xepLoai === value;
    })

    renderDSSV(dsNew)
}
const selectItem = document.querySelector("#bo-loc-xep-loai");
if(selectItem){
    selectItem.addEventListener("change",handleChangeBoLoc)
}

//

// Sắp Xếp Theo Điểm

function handleSortPoint(){
    const ttSapXep = localStorage.getItem("sort") == "asc" ? "desc" : "asc"
    const dsSV = JSON.parse(localStorage.getItem("listSVCurrent")) || JSON.parse(localStorage.getItem("dsSV"))
    if(ttSapXep == "desc"){
        localStorage.setItem("sort","desc")
        dsSV.sort((a,b) => a.diem - b.diem)
    }else{
        localStorage.setItem("sort","asc")
        dsSV.sort((a,b) => b.diem - a.diem)
    }
    renderDSSV(dsSV)
    localStorage.setItem("listSVCurrent",JSON.stringify(dsSV))
}

const itemSapXepDiem = document.querySelector("#sapXepDiem")
if(itemSapXepDiem){
    itemSapXepDiem.addEventListener("click",handleSortPoint)
}

// 

