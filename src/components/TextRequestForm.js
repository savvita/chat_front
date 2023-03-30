import { useEffect, useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import InfoModal from "./InfoModal";

import { useDispatch, useSelector } from "react-redux";

import { textAsync, selectCurrent, selectStatus, reset } from '../app/requestSlice';
import { selectCurrent as selectUser, refresh } from '../app/authSlice';
import { useNavigate } from "react-router-dom";


const TextRequestForm = () => {
    const status = useSelector(selectStatus);
    const response = useSelector(selectCurrent);

    const user = useSelector(selectUser);

    const [request, setRequest] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    useEffect(() => {
        dispatch(reset());
    }, []);

    const handleInput = (e) => {
        setRequest(e.target.value);
        setIsValid(e.target.value.length > 0 && e.target.value.length <= 500);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getResponse = async() => {
        if(!user) {
            navigate('signin');
        }
        else {
            if(!isValid) {
                return;
            }
    
            const res = await dispatch(textAsync(request));

            if(!res || !res.payload) {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
                return;
            }

            if(res.payload.code && res.payload.code === 'max-count-reached') {
                setInfoHeader('Ви досягли ліміту запитів');
                setInfoText('Використано всі доступні запити за день. Приходьте завтра або змініть підписку');
                setInfoModal(true);
                return;
            }

            if(res.payload.value === undefined || res.payload.value === false) {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
                return;
            }

            await dispatch(refresh());
        }

    }

    return (
        <div className="p-3">
            <Row>
                <Col lg="6" md="12">
                    <div className="d-flex flex-column position-relative">
                        <FormGroup className="position-relative">
                            <Label className="text-white ps-1">Ваш запит <span className="text-muted">(*Не більше 500 символів)</span></Label>
                            <Input type="textarea" style={{ height: '15rem' }} maxLength="500" value={ request } onChange={ handleInput } invalid={ !isValid } />
                            <FormFeedback tooltip className="text-white">Обов’язкове поле</FormFeedback>
                        </FormGroup>
                        <Button className="mt-3" onClick={ getResponse }>Надіслати</Button>
                    </div>
                </Col>
                <Col lg="6" md="12">
                    <div className={ status === 'loading' ? 'd-none' : "" }>
                        <Label className="text-white ps-1">Відповідь</Label>
                        <Input className="mb-2" type="textarea" style={{ height: '15rem' }} readOnly value={ response && response.responseMessage ? response.responseMessage : "" } />
                    </div>
                    <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                </Col>
            </Row>
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />   
        </div>
    );
}

export default TextRequestForm;