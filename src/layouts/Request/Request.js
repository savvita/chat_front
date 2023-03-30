

import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";

import { selectCurrent as selectUser } from '../../app/authSlice';
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { Button, Col, Row } from "reactstrap";
import { useState } from "react";

import './Request.css';
import { FaBars } from "react-icons/fa";
import Footer from "../../components/Footer";

const Request = () => {
    const user = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container-md d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="d-flex flex-grow-1">
                <div className={ isOpen ? "border-end border-light p-3" : "p-3" }>
                    <Button onClick={ () => setIsOpen(!isOpen) } className="sidebar_btn"><FaBars /></Button>
                    <div className={ isOpen ? "sidebar sidebar__open" : "sidebar" }>
                        <UserSidebar />
                    </div>
                </div>
                <div className="flex-grow-1">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Request;