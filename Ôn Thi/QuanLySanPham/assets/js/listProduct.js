

const listProduct = JSON.parse(localStorage.getItem("listProduct"))

// Hàm cập nhật thông tin sản phẩm
function changeDetailProduct(id) {
    const listProduct = JSON.parse(localStorage.getItem("listProduct"))

    const detailProduct = listProduct.find((item) =>  item.id == id)
    localStorage.setItem("detailProduct", JSON.stringify(detailProduct))
    window.location.href = 'http://127.0.0.1:5500/NenTangPhatTrienWeb/FileCode/%C3%94n%20Thi/QuanLySanPham/changeDetailProduct.html'
}
// 

// Hàm Hiển Thị Danh Sách Sản Phẩm
function render(listProduct) {
    let totalString = '';
    listProduct.forEach((item) => {
        console.log(item)
        totalString += `<div class="product d-flex items-center justify-between">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-column gap-y-1">
                            <p class="m-0 font-bold font-20">${item.name}</p>
                            <p class="m-0 text-gray-600">${item.category}</p>
                        </div>
                        <div class="d-flex items-center gap-x-1 py-2">
                            <p class="text-red m-0">
                                Price: <span class="priceProduct">$${item.price}</span>
                            </p>
                            <span>|</span>
                            <p class="m-0">
                                Stock: <span class="stock">${item.stock}</span>
                            </p>
                            <span>|</span>
                            <p class="text-blue-400 m-0">
                                Total Sales: <span class="totalSale">466</span>
                            </p>
                        </div>
                    </div>

                    <div class="d-flex items-center gap-x-2">
                        <button class="bg-orange px-2 py-2 border-none rounded cursor-pointer" onclick = "changeDetailProduct('${item.id}')">Sửa</button>
                        <button class="bg-red border-none text-white px-2 py-2 rounded cursor-pointer" id-element = "${item.id}" onclick = "removeProduct('${item.id}')">Xoá</button>
                    </div>
                </div>`
    })

    const element = document.querySelector(".listProduct")
    if (totalString.length == 0) {
        element.innerHTML = `<p class = "text-align-center font-bold">Không tìm thấy sản phẩm nào</p>`
        return;
    }
    element.innerHTML = totalString;
}
// 

// Hàm xoá sản phẩm
function removeProduct(id) {
    const check = confirm(`Bạn có chắc muốn xoá sản phẩm có id ${id}`)
    if (check) {
        const listProduct = JSON.parse(localStorage.getItem("listProduct"))
        const listProductNew = listProduct.filter((item) => {
            return item.id != id;
        })
        render(listProductNew)
        localStorage.setItem("listProduct", JSON.stringify(listProductNew))
        alert(`Đã xoá thành công sản phẩm có id là ${id}`)
        return;
    }
}
// 

render(listProduct)


