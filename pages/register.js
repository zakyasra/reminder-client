import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { notification } from "antd";
import { useRouter } from 'next/router'

const Daftar = () => {
    const router = useRouter()
    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(e);

        const form = new FormData(e?.target)
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const { data } = await axios.post("http://127.0.0.1:3333/user/register", formData)
            .catch((err) => {
                notification.error({
                    message: err.response.data.message,
                });
            })
        if (data) {
            notification.success({
                message: "Berhasil membuat akun",
            });
            // localStorage.setItem("token", data.token);
            router.push("/login")
        }
    }

    return (
        <div className='container my-4'>
            <div className="d-flex justify-content-center">
                <div className="col-md-10">
                    <form action='' onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Nama</label>
                            <input type="Nnma" className="form-control" name='nama' placeholder="Masukkan Nama" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Email</label>
                            <input type="email" className="form-control" name='email' placeholder="Masukkan Email" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' placeholder="Masukkan Password" />
                        </div>
                        <button type='submit' className='w-100 btn btn-primary'>Masuk</button>
                    </form>
                    <h6 className='text-center mt-4'>Sudah memiliki akun? <Link href="/login" ><a className='text-primary'>Login Sekarang</a></Link></h6>
                </div>
            </div>
        </div >
    )
}

export default Daftar