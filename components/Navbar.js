import { useRouter } from 'next/router'
import React from 'react'

const Navbar = ({ nama }) => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <nav class="navbar bg-light">
            <div class="container">
                <a class="navbar-brand">{nama}</a>
                <div class="d-flex" role="search">
                    <button class="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar