




import tbl from '../../modules/sort'; 


import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, FormFeedback, FormGroup, Input, Row, Spinner, Table } from 'reactstrap';

import { getAsync, deleteAsync, selectValues, selectStatus } from '../../app/storageSlice';
import InfoModal from '../InfoModal';
import Pagination from '../Pagination';
import ConfirmDeletingModal from './ConfirmDeletingModal';
import FileTableRow from './FileTableRow';
import PerPageSelect from '../PerPageSelect';

const Storage = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [modal, setModal] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [searchTxt, setSearchTxt] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [remove, setRemove] = useState(null);

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        dispatch(getAsync());
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
            setItems(values.value.filter(i => i.toLowerCase().includes(searchTxt)));
            setCurrentPage(1);
        }
    }, [searchTxt]);

    const showCofirmModal = (item) => {
        if(!item) {
            if(!values || !values.value) {
                return;
            }

            setInfoHeader(`Видалення файлів`);
            setSelected([...values.value]);
        }
        else {
            setSelected([item]);
            setInfoHeader(`Видалення файлу ${ item }`);
        }

        setModal(true);
    }

    const deleteItem = async() => {
        setModal(false);
        if(!selected) {
            return;
        }

        const res = await dispatch(deleteAsync(selected));
        if(!res) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            dispatch(getAsync());
        }
    }

    return (
        <>
            <Table dark hover className="property-table__table table_sort">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>
                            Файли у сховищі, які не використовуються
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
                    <Row className="pe-2">
                        <Col>
                            <Button onClick={ () => showCofirmModal() }>Видалити всі</Button>
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th className='text-center sortable' onClick={ tbl.sort }>№</th>
                        <th className="sortable" onClick={ tbl.sort }>Файл</th>
                        {/* <th>Завантажити</th> */}
                        <th>Видалити</th>
                    </tr>
                </thead>
                <tbody>
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <FileTableRow key={ item } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } onDelete={ () => showCofirmModal(item) } />)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                            <Pagination currentPage={ currentPage } hits={ items.length } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <ConfirmDeletingModal isOpen={ modal } onCancel={ () => setModal(false) } onAccept={ deleteItem } header={ infoHeader } />
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </>
    );
}

export default Storage;