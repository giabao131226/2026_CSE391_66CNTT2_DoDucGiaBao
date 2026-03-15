import "./contactform.css"


function ContactForm() {

    function handleSubmit(e){
        e.preventDefault();

        const inputName = e.target.querySelector("input[name='hovaten']")
        const inputEmail = e.target.querySelector("input[name='email']")
        const inputPhone = e.target.querySelector("input[name='phone']")
        
        if(!inputName.value.trim() || inputName.value.trim().length > 30){
            inputName.classList.add("alert-error")
            return;
        }
        if(inputPhone.value.length != 10 || inputPhone.value[0] != "0" ){
            inputPhone.classList.add("alert-error")
            return;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value)){
            inputEmail.classList.add("alert-error")
            return;
        }

        const data = {
            "hovaten": inputName.value,
            "email": inputEmail.value,
            "phone": inputPhone.value
        }

        fetch("http://localhost:3001/danhba",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert("Bạn đã thêm thành công")
            }
        })
        .catch(error => {
            alert("Lỗi")
        })

    }

    return (
        <>
            <div className="ContactForm container-fluid bg-light">
                <div className="container d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
                    <div className="d-flex flex-column col-12 px-0 py-0">
                        <h1 className="text-center font-weight-bold">
                            Quản Lý Danh Bạ
                        </h1>

                        <div>
                            <p className="bg-primary text-white px-3 py-2 rounded m-0">Thêm danh bạ mới</p>
                            <form className="col-12 d-flex flex-column bg-white" onSubmit={handleSubmit}>
                                <div className="col-12 px-0 py-0">
                                    <label className="d-block">Họ và Tên</label>
                                    <input type="text" name="hovaten" placeholder="Nhập họ và tên" className="px-3 py-2 rounded col-12"></input>
                                </div>
                                <div className="col-12 px-0 py-0">
                                    <label className="d-block">Số Điện Thoại</label>
                                    <input type="text" name="phone" placeholder="Nhập số điện thoại" className="px-3 py-2 rounded col-12"></input>
                                </div>
                                <div className="col-12 px-0 py-0">
                                    <label className="d-block">Email</label>
                                    <input type="email" name="email" placeholder="Nhập email" className="px-3 py-2 rounded col-12"></input>
                                </div>

                                <button type="submit" className="bg-primary text-white border-0 py-2 rounded mt-4">Thêm danh bạ</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactForm