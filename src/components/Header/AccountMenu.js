import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';

import { selectCurrent, selectUserInfo, logOut, refresh } from '../../app/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const AccountMenu = () => {
    const user = useSelector(selectCurrent);
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refresh());
    }, []);

    return (
        <UncontrolledDropdown inNavbar nav className="header__account-menu" style={{ marginRight: '20px' }}>
                <DropdownToggle caret nav>Мій акаунт</DropdownToggle>
                <DropdownMenu end dark>
                    { !user ? 
                        <>
                            <NavLink tag={RRNavLink} to="/signin"><DropdownItem>Увійти</DropdownItem></NavLink>
                            <NavLink tag={RRNavLink} to="/signup"><DropdownItem>Зареєструватися</DropdownItem></NavLink>
                        </> : 
                        <>
                            { user && <NavLink tag={RRNavLink} to="/profile" className="pt-1 pb-1"><DropdownItem>Мій профіль</DropdownItem></NavLink> }
                            { user && user.isAdmin && <NavLink tag={RRNavLink} to="/admin" className="pt-1"><DropdownItem>Панель адміна</DropdownItem></NavLink> }
                            <DropdownItem divider className="p-0" />
                            <NavLink tag={RRNavLink} to="/" onClick={ () => dispatch(logOut()) } className="pt-0"><DropdownItem>Вийти</DropdownItem></NavLink>
                        </>
                    }
                </DropdownMenu>
                
            </UncontrolledDropdown>
    );
}

export default AccountMenu;