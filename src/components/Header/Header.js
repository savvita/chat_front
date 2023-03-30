import AccountMenu from './AccountMenu';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';

import { useEffect, useState } from 'react';
import { Link, NavLink as RRNavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrent as selectUser, selectUserInfo } from '../../app/authSlice';

import './Header.css';

const Header = () => {
    const user = useSelector(selectUser);

    const location = useLocation();

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header className="border-bottom border-light pt-2 pb-5">
            <Navbar dark expand={"lg"} className="p-3">
                    <NavbarBrand tag={RRNavLink} to="/" className="fs-1 fw-weight-bold">ASK ME</NavbarBrand>
                    <div className="d-flex  flex-row-reverse align-items-start">
                        <NavbarToggler onClick={ toggleNavbar } />
                        <Collapse navbar isOpen={ !collapsed }>
                            <Nav className="d-flex" navbar>
                                <NavLink tag={RRNavLink} to="/">Головна</NavLink>
                                <NavLink tag={RRNavLink} to="/request">Запит</NavLink>
                                <NavLink tag={RRNavLink} to="/subscriptions">Підписки</NavLink>
                                <NavLink tag={RRNavLink} to="/about">Про нас</NavLink>
                                <AccountMenu />
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                
                { location.pathname.startsWith('/admin') && <h5 className="text-white text-end pe-4">Панель адміністратора</h5> }

                { user && !user.expired && 
                <div className="d-flex justify-content-end pe-6">
                    <div>
                        { user.userName !== '' && `${ user.userName }` && <Link to="/profile" className="text-white pe-4 mb-0 text-end text-decoration-none">{  user.userName }</Link> }
                        { user.left && <p className="text-white pe-4 text-end">Залишилось запитів: { user.left }</p>}
                    </div>
                </div> }
              
        </header>
    );
}

export default Header;