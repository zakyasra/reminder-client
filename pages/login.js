import React, { useEffect } from 'react'
import { notification } from "antd";
import Link from 'next/link'
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);

        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const { data, error } = await axios
            .post("http://127.0.0.1:3333/user/login", formData)
            .catch((err) => {
                notification.error({
                    message: err.response.data.message,
                });
            })
        if (data) {
            notification.success({
                message: "Berhasil Masuk",
            });
            localStorage.setItem("token", data.token);
            router.push("/")
        }
    }

    return (

        <div className='container my-4'>
            <div className="d-flex justify-content-center">
                <div className="col-md-10">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Email</label>
                            <input type="email" className="form-control" name='email' placeholder="Masukkan Email" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' placeholder="Masukkan Password" />
                        </div>
                        <button type="submit" className="w-100 btn btn-primary">Masuk</button>
                    </form>
                    <h6 className='text-center mt-4'>Belum memiliki akun? <Link href="/register"><a className='text-primary'>Buat Sekarang</a></Link></h6>
                </div>
            </div>
        </div>

    )
}

export default Login