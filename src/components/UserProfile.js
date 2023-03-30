

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Spinner, Table } from 'reactstrap';

import { selectUserInfo as selectUser, getByIdAsync, selectStatus } from '../app/authSlice';




const UserProfile = () => {
    const user = useSelector(selectUser);
    const status = useSelector(selectStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getByIdAsync());
    }, []);

    if(!user) {
        return null;
    }

    return (
        <div>
            { user && <Table dark className={ status === 'loading' ? 'd-none' : "property-table__table" }>
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>Мій профіль</Col>
                    </Row>
                </caption>
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td>{ user.userName }</td>
                    </tr>

                    { user.subscription && 
                        <>
                            <tr>
                                <td>Поточна підписка:</td>
                                <td><Link to="/subscriptions" className="text-white text-decoration-none">{ user.subscription.name }</Link></td>
                            </tr> 
                            <tr>
                                <td>Кількість запитів:</td>
                                <td>{ user.subscription.maxCount ? user.subscription.maxCount : 'Необмежено' }</td>
                            </tr> 
                        </>
                    }
                    <tr>
                        <td>Запити за день:</td>
                        <td>{ user.requests }</td>
                    </tr> 
                    { user.subscription && user.subscription.abilities && user.subscription.abilities.find(x => x.id === 4) &&
                        <tr className="pt-2">
                            <td colSpan="2">
                                <Link to="/myrequests"><Button>Історія запитів</Button></Link>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table> }
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
        </div>
    );
}

export default UserProfile;