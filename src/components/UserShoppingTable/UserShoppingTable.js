

import tbl from '../../modules/sort'; 

import { selectCurrent, refresh } from '../../app/authSlice';
import { selectValues, selectStatus ,getAsync } from '../../app/shoppingSlice';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, FormFeedback, FormGroup, Input, Row, Spinner, Table } from "reactstrap";
import PerPageSelect from "../PerPageSelect";
import Pagination from "../Pagination";

import UserShoppingTableRow from './UserShoppingTableRow';
import { useNavigate, useParams } from 'react-router-dom';

const UserShoppingTable = () => {
    const user = useSelector(selectCurrent);

    const navigate = useNavigate();

    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);

    const params = useParams();

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        initialize();
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    const initialize = async() => {
        await dispatch(refresh());

        if(params.id) {
            await dispatch(getAsync(params.id));
        }
    }

    useEffect(() => {
        if(values) {
            setItems([...values]);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        setItemsPage(items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage));
    }, [currentPage, items, perPage]);

    if(!params.id) {
        return null;
    }

    return (
        <>
            { user && user.isAdmin ?
            <>
            <Button className="mt-3" onClick={() => navigate(-1)}>Назад</Button>
            <Table dark hover className="property-table__table table_sort">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>
                            Покупки користувача { params.id }
                        </Col>
                    </Row>
                    <Row className="pe-2">
                        <Col sm="6" xs="12">
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr className="text-center fs-6">
                        <th scope="col" className="sortable" onClick={ tbl.sort }>№</th>
                        <th scope="col" className="sortable text-start" onClick={ tbl.sort }>Дата</th>
                        <th scope="col" className="sortable" onClick={ tbl.sort }>Підписка</th>
                        <th scope="col" className="sortable" onClick={ tbl.sort }>Ціна</th>
                    </tr>
                </thead>
                <tbody>
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <UserShoppingTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } />)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                            <Pagination currentPage={ currentPage } hits={ items.length } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                        </td>
                    </tr>
                </tfoot>
            </Table> 
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="warning">Loading...</Spinner></div>
            </>
            :
            <p className="text-white text-center">У вас немає прав для перегляду цієї сторінки</p>
            }
        </>
    );
}

export default UserShoppingTable;