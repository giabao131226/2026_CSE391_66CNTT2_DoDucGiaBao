import { useEffect, useState } from "react";
import "./listDanhBa.css"

function ListDanhBa() {
    const [listDanhBa, setListDanhBa] = useState([])


    function handleRemove(id){
        const check = window.confirm("Bạn có chắc chắn muốn xoá không")
        if(check){
            fetch(`http://localhost:3001/danhba/${id}`,{
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    window.location.reload();
                })
        }
    }


    useEffect(() => {
        fetch("http://localhost:3001/danhba")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setListDanhBa(data)
            })
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <p className="m-0 bg-primary text-white px-3">Danh Sách Danh Bạ</p>
                    <div className="ContactList d-flex flex-column">
                        {listDanhBa.length != 0 ? listDanhBa.map((item, index) => (

                            <div className="ContactItem d-flex align-items-center justify-content-between" key={index}>
                                <div className="d-flex flex-column">
                                    <div className="mb-2">
                                        <p className="m-0 font-weight-bold" style={{ fontSize: 20 }}>${item.hovaten}</p>
                                        <p className="m-0">SĐT: <span>${item.phone}</span></p>
                                    </div>
                                    <p className="m-0">Email: <span>${item.email}</span></p>
                                </div>

                                <div className="d-flex align-items-center">
                                    <button className="border-0 bg-primary text-white font-weight-bold px-2 py-2 rounded mr-2">Sửa Thông Tin</button>
                                    <button className="border-0 bg-danger text-white font-weight-bold px-2 py-2 rounded" onClick={() => {handleRemove(item.id)}}>Xoá</button>
                                </div>
                            </div>

                        )) : <h1>Không có sản phẩm nào</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListDanhBa;