import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Footer from "../components/Footer";
import { Button } from "reactstrap";

const Admin = () => {
    const user = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container-md d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Header />
        { user && user.isAdmin && !user.expired ?
        <div className="d-flex flex-grow-1">
            <div className={ isOpen ? "border-end border-light p-3" : "p-3" }>
                <Button onClick={ () => setIsOpen(!isOpen) } className="sidebar_btn"><FaBars /></Button>
                <div className={ isOpen ? "sidebar sidebar__open" : "sidebar" }>
                    <AdminSidebar />
                </div>
            </div>
            <div className="flex-grow-1">
                <Outlet />
            </div>
        </div>
        :
        <p className="text-white text-center mt-3">У вас немає прав для перегляду даної сторінки</p>
        }
        <Footer />
    </div>
    );
}

export default Admin;