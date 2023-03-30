

import tbl from '../../modules/sort'; 

import { selectCurrent, refresh } from '../../app/authSlice';
import { selectValues, selectStatus ,getAsync } from '../../app/shoppingSlice';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, FormFeedback, FormGroup, Input, Row, Spinner, Table } from "reactstrap";
import PerPageSelect from "../PerPageSelect";
import Pagination from "../Pagination";

import { Link } from 'react-router-dom';
import ShoppingTableRow from './ShoppingTableRow';

const ShoppingTable = () => {
    const user = useSelector(selectCurrent);

    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [searchTxt, setSearchTxt] = useState('');

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
        await dispatch(getAsync());
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

    useEffect(() => {
        if(values) {
            setItems(values.filter(i => i.userId.toLowerCase().includes(searchTxt)));
            setCurrentPage(1);
        }
    }, [searchTxt]);

    return (
        <>
            { user && user.isAdmin ?

            <Table dark hover className="property-table__table table_sort">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>
                            Покупки
                        </Col>
                    </Row>
                    <Row className="pe-2">
                        <Col sm="6" xs="12">
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                        <Col sm="6" xs="12">
                            <FormGroup  className="position-relative">
                                <Input name="search" placeholder="Шукати" type="search" value={ searchTxt } onInput={ (e) => setSearchTxt(e.target.value.toLowerCase()) } invalid={ items.length === 0 }  />
                                <FormFeedback tooltip className="text-white">{ 'Не знайдено :(' }</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr className="text-center fs-6">
                        <th scope="col" className="sortable" onClick={ tbl.sort }>№</th>
                        <th scope="col" className="sortable" onClick={ tbl.sort }>Дата</th>
                        <th scope="col" className="sortable" onClick={ tbl.sort }>Користувач</th>
                        <th scope="col" className="sortable" onClick={ tbl.sort }>Підписка</th>
                        <th scope="col" className="sortable" onClick={ tbl.sort }>Ціна</th>
                    </tr>
                </thead>
                <tbody>
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <ShoppingTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } />)
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
            :
            <p className="text-white text-center">У вас немає прав для перегляду цієї сторінки</p>
            }
        </>
    );
}

export default ShoppingTable;