
import tbl from '../../modules/sort'; 

import UserTableRow from "./UserTableRow";

import { selectValues, selectStatus, getAsync, updateAsync, banAsync } from '../../app/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { Col, FormFeedback, FormGroup, Input, Row, Spinner, Table } from "reactstrap";
import PerPageSelect from "../PerPageSelect";
import { useEffect, useState } from "react";
import InfoModal from "../InfoModal";
import Pagination from "../Pagination";

import { selectValues as selectBans, getAsync as getBans } from '../../app/banSlice';

import './UserTable.css';

const UserTable = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [searchTxt, setSearchTxt] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const bans = useSelector(selectBans);

    useEffect(() => {
        dispatch(getAsync());
        dispatch(getBans());
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    useEffect(() => {
        if(values && values.value) {
            setItems([...values.value]);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        setItemsPage(items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage));
    }, [currentPage, items, perPage]);


    useEffect(() => {
        if(values && values.value) {
            setItems(values.value.filter(i => i.userName && i.userName.toLowerCase().includes(searchTxt)));
            setCurrentPage(1);
        }
    }, [searchTxt]);

    const update = async(item) => {
        if(!item) {
            return;
        }

        const res = await dispatch(updateAsync(item));

        if(res && res.payload && res.payload.value) {
            dispatch(getAsync());
        }
        else {
            if(res && res.payload && res.payload.code === 'user-not-found') {
                setInfoHeader('Помилка');
                setInfoText('Користувача не знайдено');
                setInfoModal(true);
            }
            else {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
            }
        }
    }

    const banUser = async(id, ban) => {
        if(!id) {
            return;
        }

        const res = await dispatch(banAsync({ id: id, ban: ban }));
        if(res && res.payload && res.payload.value) {
            dispatch(getAsync());
        }
        else {
            if(res && res.payload && res.payload.code === 'user-not-found') {
                setInfoHeader('Помилка');
                setInfoText('Користувача не знайдено');
                setInfoModal(true);
            }
            else {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
            }
        }
    }

    return (
        <>
            <Table dark hover className="property-table__table table_sort">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>
                            Користувачі
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
                        <th scope="col" className="text-start ps-0 sortable" style={{ width: '100%' }} onClick={ tbl.sort }>Логін</th>
                        <th scope="col">Адмін</th>
                        <th scope="col" className="text-nowrap sortable" onClick={ tbl.sort }>Заблоковано до</th>
                        <th scope="col">Заблокувати</th>
                    </tr>
                </thead>
                <tbody>
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <UserTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } bans={ bans } onUpdate={ update } onBanned={ banUser }/>)
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
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </>
    );
}

export default UserTable;